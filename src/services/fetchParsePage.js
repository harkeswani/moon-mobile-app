import React, { memo, useEffect, useState } from 'react';
import cheerio from 'cheerio';
import axios from 'axios';
import DOMParser from 'react-native-html-parser';

let cancelToken;

let over18Approved = false;

export const cancelFetch = async () => {
    cancelToken.cancel();
}

const blockAds = true; // Set to true to block ads

const sendOver18 = async () => {
  const url18 = 'https://old.reddit.com/over18';
  const payload = new URLSearchParams();
  payload.append('over18', 'yes');
  try {
    const response = await axios.post(url18, payload);
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};

export const fetchPostsOnPage = async (url) => {
  console.log(url);
  if (!over18Approved){
      //await sendOver18();
      over18Approved = true;
  }
  if (cancelToken) {
    //await cancelToken.cancel('Request canceled');
  }
  cancelToken = axios.CancelToken.source();
    
  try {
    const startTime = performance.now();
    const response = await axios.get(url, { cancelToken: cancelToken.token });
    const fetchTime = performance.now() - startTime;
    const html = response.data;

    const parseStartTime = performance.now();
    const parsedData = parsePostsFromHTML(html);
    const parseTime = performance.now() - parseStartTime;

    console.log(`Fetch time: ${fetchTime} ms`);
    console.log(`Parse time: ${parseTime} ms`);

    return parsedData;
  } catch (error) {
    console.log(error);
    throw new Error('Subreddit does not exist');
  }

};

const delay = (milliseconds) => {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });
};

export const fetchPostCommentsOnPage = async (url) => {
  console.log(url);
  if (cancelToken) {
    //await cancelToken.cancel('Request canceled');
  }
  cancelToken = axios.CancelToken.source();

  try {
    const startTime = performance.now();
    const response = await axios.get(url, { cancelToken: cancelToken.token });
    const fetchTime = performance.now() - startTime;
    const html = response.data;
    console.log(html.length);

    const parseStartTime = performance.now();
    const parsedData = parsePostCommentsFromHTML(html);
    const parseTime = performance.now() - parseStartTime;

    console.log(`Fetch time: ${fetchTime} ms`);
    console.log(`Parse time: ${parseTime} ms`);

    return parsedData;
  } catch (error) {
    //console.log(error);
    //throw new Error('Subreddit does not exist');
  }
};

 const parsePostCommentsFromHTML = (html) => {
  const $ = cheerio.load(html);
  const postData = [];
  const comments = [];
  const parseComment = ($comment, parentDepth) => {
    const author = $comment.find('.author:first').text();
    const score = parseInt($comment.find('.score.unvoted').attr('title'));
    const timePosted = $comment.find('.live-timestamp:first').text();
    const text = $comment.find('.md:first').text();
    const numChildren = $comment.find('.numchildren:first').text();
    const permalink = $comment.find('.first > a').attr('href');
    const childComments = [];
    const depth = parentDepth + 1;
    let loadMore = false;
    if ($comment.find('.child').length > 0) {
      // Select the immediate child comments and iterate over them
      $comment.find('.child:first').find('.sitetable:first').children('.comment').each((index, element) => {
        const $childComment = $(element);
        const childCommentData = parseComment($childComment, depth);
        childComments.push(childCommentData);
      });
      if ($comment.find('.child:first').find('.sitetable:first').find('.morechildren').length>0){
          loadMore = true;
      }
    }
    const collapsed = false;
    
    return {
      author,
      score,
      timePosted,
      text,
      numChildren,
      childComments,
      depth,
      collapsed,
      permalink,
      loadMore,
    };
  };

  const postInfo = $('.expando').find('.usertext-body');
  if (postInfo.length > 0) {
      postData.push(postInfo.text()); 
  }

  $('.sitetable.nestedlisting').children('.comment').each((index, element) => {
    const $comment = $(element);
    const commentData = parseComment($comment, 0);
    comments.push(commentData);
  });

  return { postData, comments };
};
    
const parsePostsFromHTML = (htmlContent) => {
  console.log(performance.now());
  const $ = cheerio.load(htmlContent);
  console.log(performance.now());
  const parsedPosts = [];
  const nextPageUrl = $('.next-button a').attr('href');
  // Iterate over each post element
  $('.thing').each((index, element) => {
    const $post = $(element);
    // Extract the desired information
    const title = $post.find('.title > a.title').text();
    const description = 'undefined';
    const tags = $post.find('.linkflairlabel').text();
    const subreddit = $post.find('.subreddit').text();
    const score = parseInt($post.find('.score.likes').text());
    const commentText = $post.find('.bylink.comments').text();
    const num_comments = isNaN(parseInt($post.find('.bylink.comments').text()))?0:parseInt($post.find('.bylink.comments').text());
    const time = $post.find('.live-timestamp').text();
    const created_utc = $post.attr('data-timestamp')/1000;
    const permalink = $post.find('.bylink.comments').attr('href');
    if (time=='' && blockAds){
        return;
    }
    const media = [];
    let url = undefined;
    const data = $post.attr('data-url');
    if (data && data.startsWith('http')) {
      if (/\.(jpg|jpeg|png|gif)$/i.test(data)){
        media.push(data);
      } else if (data.startsWith('https://v.redd.it/')) {
        media.push(data+"/HLSPlaylist.m3u8");
      } else {
        url = data;
      }
    }
    
    const collapsedContent = false;

    // Construct the post object
    const post = {
      title,
      description,
      subreddit,
      tags,
      score,
      num_comments,
      media,
      created_utc,
      url,
      permalink,
      collapsedContent,
    };

    // Push the post object to the posts array
    parsedPosts.push(post);
  });
  return { parsedPosts, nextPageUrl };
};
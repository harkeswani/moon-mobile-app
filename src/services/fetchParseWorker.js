import React, { memo, useEffect, useState } from 'react';
import cheerio from 'cheerio';
import axios from 'axios';
import Worker from 'react-native-web-worker';

self.onmessage = ({ data }) => {
  const posts = parsePostsFromHTML(data);
  self.postMessage(posts);
};

function parsePostsFromHTML(htmlContent) {
  const $ = cheerio.load(htmlContent);
  const posts = [];
  const nextButtonUrl = $('.next-button a').attr('href');
  // ... Rest of your parsing logic
  return posts;
}

function fetchRedditPosts = async () => {
    setLoading(true);
    let url = 'https://old.reddit.com/';
    if (subredditName) {
      url += 'r/'+subredditName+'/';
    }
    url += `${sortMethod}/`;
    axios.get(url)
      .then(response => {
        console.log(url);
        const html = response.data;
        const parsedPosts = parsePostsFromHTML(html);
        setPosts(parsedPosts);
        setLoading(false);
      })
    .catch(error => {
        setLoading(false);
        console.log(error);
        Alert.alert('Subreddit does not exist');
    });
};

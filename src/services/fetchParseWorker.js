import cheerio from 'cheerio';
import { Image, ActivityIndicator, Alert, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import * as WebBrowser from 'expo-web-browser';

const calculateFactorial = (number) => {
  let factorial = 1;
  for (let i = 2; i <= number; i++) {
    factorial *= i;
  }
  return factorial;
};

self.onmessage = (event) => {
  const number = event.data;
  const result = calculateFactorial(number);
  self.postMessage(result);
};
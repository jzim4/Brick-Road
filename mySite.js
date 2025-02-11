import React from 'react';
import HomePage from './homePage.js'
import MyWork from './myWork.js';
import Contact from './contact.js';

export default function MySite() {

  window.onbeforeunload = function () {
    window.scrollTo(0, 0);
  }
    return <>
      <HomePage/>
      <MyWork/>
      <Contact/>
      </>
}
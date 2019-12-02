import 'regenerator-runtime';
//import 'core-js'

import barba from '@barba/core';
import barbaViews from './barba-views';
import barbaTransitions from './barba-transitions';
import {ScrollToPlugin} from 'gsap/all';
import TweenLite from 'gsap';
import TimelineLite from 'gsap';

const scrollToPlugin = ScrollToPlugin; // need to include to bundle on build
import LazyImages from './helpers/Lazy-images';

// blocks
import Header from './components/Header';
import LanguageMenu from './components/Language-menu';
import Cursor from './components/Cursor';
import Preloader from './components/Preloader';


const global = {
  preloader: null,
  lazyImages: null,
  header: null,
  languageMenu: null,
  homePage: null,
  bedsPage: null,
  contactsPage: null,
  findUsPage: null,
  configuratorPage: null,
  bedIndex: 0,
};

//window.configuratorSavedState = "{\"steps\":{\"step_0\":\"5d80b4adbd23c\",\"step_1\":\"5d80b4add4a42\",\"step_2\":\"5d80b4ade5520\",\"step_3\":\"5d80b4ae2abe5\",\"step_4\":\"5d80b4ae7980e\"},\"side\":\"side\"}\n"

window.addEventListener('DOMContentLoaded', () => {
  const cursor = new Cursor({
    el: document.getElementById('cursor'),
    watchTarget: true,
    disableOnTouch: true,
  });
  cursor.init();
});

window.addEventListener('load', () => {
  document.getElementById('header').removeAttribute('style');
  global.preloader = new Preloader();
  global.lazyImages = new LazyImages();
  global.header = new Header();
  global.languageMenu = new LanguageMenu();
  global.preloader.hide().then(() => {
    global.header.initSizeControl();
    global.header.initMobileMenuControl();
    global.preloader = null;
  });

  barba.init({
    debug: process.env.NODE_ENV === 'development', // no debug for production
    prevent: ({el}) => el.classList && el.classList.contains('barba-prevent'),
    views: barbaViews(global),
    transitions: barbaTransitions(global),
  });
});
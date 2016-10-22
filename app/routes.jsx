const Learn = require('./components/pages/Learn');
const Home = require('./components/pages/Home');

const routes = Object.freeze({
  home: Object.freeze({
    title: 'Home',
    path: 'home',
    href: '#/',
    pattern: /^\/?$/,
    component: Home,
    onEnter: Home.onPageEnter,
    onLeave: Home.onPageLeave,
  }),
  learn: Object.freeze({
    title: 'Learn',
    path: 'learn',
    href: '#/learn',
    pattern: /^\/learn\/?.*/,
    component: Learn,
    onEnter: Learn.onPageEnter,
    onLeave: Learn.onPageLeave,
  }),
});

module.exports = routes;

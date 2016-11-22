const Home = require('./components/pages/Home');

const Lesson = require('./containers/LessonPage');
const Login = require('./containers/LoginPage');

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
  lesson: Object.freeze({
    title: 'Lesson',
    path: 'lesson/:id',
    href: '#/lesson',
    pattern: /^\/lesson\/?.*/,
    component: Lesson,
    onEnter: Lesson.onPageEnter,
    onLeave: Lesson.onPageLeave,
  }),
  login: Object.freeze({
    title: 'Login',
    path: 'login',
    href: '#/login',
    pattern: /^\/login\/?/,
    component: Login,
    onEnter: Login.onPageEnter,
    onLeave: Login.onPageLeave,
  }),
});

module.exports = routes;

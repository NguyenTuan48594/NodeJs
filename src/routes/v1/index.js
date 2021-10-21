const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const sinhvienRoute = require('./sinhvien.route');
const peopleRoute = require('./people.route');
const professionalRoute = require('./professional.route');
const worksRoute = require('./works.route');
const companiesRoute = require('./companies.route');
const docsRoute = require('./docs.route');
const config = require('../../config/config');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: '/sinhvien',
    route: sinhvienRoute,
  },
  {
    path: '/people',
    route: peopleRoute,
  },
  {
    path: '/professional',
    route: professionalRoute,
  },
  {
    path: '/works',
    route: worksRoute,
  },
  {
    path: '/companies',
    route: companiesRoute,
  },
];

const devRoutes = [
  // routes available only in development mode
  {
    path: '/docs',
    route: docsRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;

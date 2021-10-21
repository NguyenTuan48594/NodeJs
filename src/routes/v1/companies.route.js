const express = require('express');
const companiesController = require('../../controllers/companies.controller');

const router = express.Router();

router
  .route('/')
  .post(companiesController.createCompanies)
  .get(companiesController.getCompaniess);

router
  .route('/:companiesId')
  .get(companiesController.getCompanies)
  .patch(companiesController.updateCompanies)
  .delete(companiesController.deleteCompanies);

module.exports = router;

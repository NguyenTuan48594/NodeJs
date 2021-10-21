const express = require('express');
const worksController = require('../../controllers/works.controller');

const router = express.Router();

router
  .route('/')
  .post(worksController.createWorks)
  .get(worksController.getWorkss);

router
  .route('/:worksId')
  .get(worksController.getWorks)
  .patch(worksController.updateWorks)
  .delete(worksController.deleteWorks);

module.exports = router;

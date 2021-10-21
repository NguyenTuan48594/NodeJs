const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { worksService } = require('../services');

const createWorks = catchAsync(async (req, res) => {
  const works = await worksService.createWorks(req.body);
  res.status(httpStatus.CREATED).send(works);
});

const getWorkss = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await worksService.queryWorkss(filter, options);
  res.send(result);
});

const getWorks = catchAsync(async (req, res) => {
  const works = await worksService.getWorksById(req.params.worksId);
  if (!works) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Works not found');
  }
  res.send(works);
});

const updateWorks = catchAsync(async (req, res) => {
  const works = await worksService.updateWorksById(req.params.worksId, req.body);
  res.send(works);
});

const deleteWorks = catchAsync(async (req, res) => {
  await worksService.deleteWorksById(req.params.worksId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createWorks,
  getWorkss,
  getWorks,
  updateWorks,
  deleteWorks,
};

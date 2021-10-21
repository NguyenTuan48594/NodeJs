const httpStatus = require('http-status');
const { Works } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a works
 * @param {Object} worksBody
 * @returns {Promise<Works>}
 */
const createWorks = async (worksBody) => {
  return Works.create(worksBody);
};

/**
 * Query for workss
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryWorkss = async (filter, options) => {
  const workss = await Works.paginate(filter, options);
  return workss;
};

/**
 * Get works by id
 * @param {ObjectId} id
 * @returns {Promise<Works>}
 */
const getWorksById = async (id) => {
  return Works.findById(id);
};

/**
 * Get works by email
 * @param {string} email
 * @returns {Promise<Works>}
 */
const getWorksByEmail = async (email) => {
  return Works.findOne({ email });
};

/**
 * Update works by id
 * @param {ObjectId} worksId
 * @param {Object} updateBody
 * @returns {Promise<Works>}
 */
const updateWorksById = async (worksId, updateBody) => {
  const works = await getWorksById(worksId);
  if (!works) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Works not found');
  }
  if (updateBody.email && (await Works.isEmailTaken(updateBody.email, worksId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  Object.assign(works, updateBody);
  await works.save();
  return works;
};

/**
 * Delete works by id
 * @param {ObjectId} worksId
 * @returns {Promise<Works>}
 */
const deleteWorksById = async (worksId) => {
  const works = await getWorksById(worksId);
  if (!works) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Works not found');
  }
  await works.remove();
  return works;
};

module.exports = {
  createWorks,
  queryWorkss,
  getWorksById,
  getWorksByEmail,
  updateWorksById,
  deleteWorksById,
};

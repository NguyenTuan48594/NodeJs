const mongoose = require('mongoose');
// const validator = require('validator');
// const bcrypt = require('bcryptjs');
const { toJSON, paginate } = require('./plugins');
// const { roles } = require('../config/roles');

const peopleSchema = mongoose.Schema(
  {
    dateOfJoning: {
      type: Date,
      required: true,
      trim: true,
    },
    salary: {
      type: Number,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
peopleSchema.plugin(toJSON);
peopleSchema.plugin(paginate);

/**
 * @typedef People
 */
const People = mongoose.model('People', peopleSchema);

module.exports = People;

'use strict';

const _ = require('lodash');

const QUESTION_TYPES = {
  RATING: 'Rating',
  NUMERIC: 'Numeric',
  VALUES: 'Pick From Values'
};

module.exports = { 
  QUESTION_TYPES,
  VALUES: _.values(QUESTION_TYPES),
};
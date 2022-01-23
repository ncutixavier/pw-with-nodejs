const mongoose = require('mongoose');

const statsSchema = new mongoose.Schema({
  visitors: {
    blog: {
      type: Number,
      default: 0,
    },
    web: {
      type: Number,
      default: 0,
    },
    articles: {
      type: Array,
    },
  },
  created_date: {
    type: Date,
    default: Date.now(),
  },
});

const Stats = mongoose.model('Stats', statsSchema);

module.exports = Stats;

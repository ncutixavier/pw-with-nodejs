const Stats = require('../models/statsModel');
const stats_id = '61c98aa5ecee321c34cf3fd0';

exports.updateWebStats = async (req, res) => {
  const stats = await Stats.findById(stats_id);
  await Stats.findByIdAndUpdate(stats_id, {
    visitors: {
      web: stats.visitors.web + 1,
      blog: stats.visitors.blog,
      articles: stats.visitors.articles,
    },
  });
};

exports.updateBlogStats = async (req, res) => {
  const stats = await Stats.findById(stats_id);
  await Stats.findByIdAndUpdate(stats_id, {
    visitors: {
      web: stats.visitors.web,
      blog: stats.visitors.blog + 1,
      articles: stats.visitors.articles,
    },
  });
};

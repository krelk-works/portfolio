const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: String,
  description: String,
  images: [String],
  technologies: [String],
});

const portfolioContentSchema = new mongoose.Schema({
  image: String,
  name: String,
  role: String,
  professionSummary: String,
  aboutParagraph1: String,
  aboutParagraph2: String,
  technologies: [String],
  projects: [projectSchema],
});

module.exports = mongoose.model('PortfolioContent', portfolioContentSchema);

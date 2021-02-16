const mongoose = require('mongoose');

const moviesSchema = new mongoose.Schema(
  {
    imdbId: {
      type: String,
      required: [true, 'imdb id is required'],
    },
    title: {
      type: String,
      required: [true, 'Movie must have a name '],
    },
    genra: {
      type: [String],
      required: [true, 'Movie must have a genra'],
    },
    poster: {
      type: String,
      default: 'no-photo.jpg',
    },
    directors: {
      type: [String],
      required: [true, 'Movie must have a director'],
    },
    writers: {
      type: [String],
      required: [true, 'Movie must have a writer'],
    },
    stars: [String],
    rating: {
      type: String,
      required: [true, 'Movie must have a rating'],
    },
    ratingCount: {
      type: String,
      required: [true, 'Movie must have a rating count'],
    },
    timeWatch: String,
    releaseDate: String,
    shortStory: String,
    trailer: String,
    imageGallary: String,
  },
  {
    timestamps: true,
  }
);

const Movie = mongoose.model('Movie', moviesSchema);

module.exports = Movie;

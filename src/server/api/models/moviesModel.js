const mongoose = require('mongoose');

const moviesSchema = new mongoose.Schema(
  {
    name: {
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
    rating: {
      type: String,
      required: [true, 'Movie must have a rating'],
    },
    ratingCount: {
      type: String,
      required: [true, 'Movie must have a rating count'],
    },
    timeToWathc: String,
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

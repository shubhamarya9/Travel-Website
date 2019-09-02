const Tours = require('../models/tourModel');
const ApiFeatures = require('../utils/apiFeatures');
exports.aliasTopTours = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-ratingAverage,price';
  req.query.fields = 'name,price,ratingAverage,summary,difficulty';
  next();
};
exports.getAllTours = async (req, res) => {
  try {
    const features = new ApiFeatures(Tour.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const tours = await features.query;

    res.status(200).json({
      Status: 'Success',
      results: tours.length,
      data: {
        tours
      }
    });
  } catch (err) {
    res.status(400).json({ Status: 'Failed', message: err });
  }
};
exports.getTour = async (req, res) => {
  try {
    const tour = await Tours.findById(req.params.id);
    res.status(200).json({
      Status: 'Success',
      data: {
        tour
      }
    });
  } catch (err) {
    res.status(400).json({ Status: 'Failed', message: err });
  }
};

exports.createTour = async (req, res) => {
  try {
    const newTour = await Tours.create(req.body);
    res.status(201).json({
      Status: 'Success',
      tour: newTour
    });
  } catch (err) {
    res.status(400).json({ Status: 'Failed', message: err });
  }
};
exports.updateTour = async (req, res) => {
  try {
    const tour = await Tours.findByIdAndUpdate(req.params.id, req.body);
    res.status(201).json({
      Status: 'Success',
      tour
    });
  } catch (err) {
    res.status(400).json({ Status: 'Failed', message: err });
  }
};
exports.deleteTour = async (req, res) => {
  try {
    const tour = await Tours.findByIdAndDelete(req.params.id);
    res.status(201).json({
      Status: 'Success',
      message: `${tour} is now deleted`
    });
  } catch (err) {
    res.status(400).json({ Status: 'Failed', message: err });
  }
};
exports.getTourStats = async (req, res) => {
  try {
    const stats = await Tours.aggregate([
      {
        $match: { ratingAverage: { $gte: 4.5 } }
      },
      {
        $group: {
          _id: { $toUpper: '$difficulty' },
          numTours: { $sum: 1 },
          numRatings: { $sum: '$ratingQuantity' },
          avgRating: { $avg: '$ratingAverage' },
          avgPrice: { $avg: '$price' },
          minPrice: { $min: '$price' },
          maxPrice: { $max: '$price' }
        }
      }
    ]);
    res.status(200).json({
      Status: 'Success',
      data: {
        stats
      }
    });
  } catch (err) {
    res.status(400).json({ Status: 'Failed', message: err });
  }
};

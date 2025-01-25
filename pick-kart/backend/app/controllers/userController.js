const AppResponse = require('../models/AppResponse');
const User = require('../models/User');

exports.getAllUsers = async (req, res, next) => {
  try {
    res.status(200).json(new AppResponse(await User.find({}).select('-password')));
  } catch (error) {
    next(error);
  }
};

exports.updateProfile = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { firstName, lastName, image } = req.body;
    console.log(userId, firstName, lastName);
    const response = await User.updateOne(
      { _id: userId },
      {
        $set: {
          'profile.firstName': firstName,
          'profile.lastName': lastName,
          'profile.image': image,
        },
      }
    );
    res.status(200).json(new AppResponse(response));
  } catch (error) {
    next(error);
  }
};

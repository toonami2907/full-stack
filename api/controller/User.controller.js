import User from '../models/User.model.js';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken'
import errorHander from '../utils/error.js';
import errorHandler from '../utils/error.js';

// signup logic 
export const signup = async (req, res, next) => {
    const { username, email, password } = req.body;
    const hashedPassword = bcryptjs.hashSync(password, 5);
    const newUser = new User({ username, email, password: hashedPassword });
    try {
        await newUser.save();
        console.log(newUser)
        res.status(200).json({ mesaage: 'User created sucessfully' });
    } catch (error) {
        // res.status(500).json({ mesaage: 'something went wrong ' });
        next(error);
    }
}


// sigin logic
export const signin = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const validUser = await User.findOne({ email });
        if (!validUser) return next(errorHander(404, 'User Not Found'));
        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if (!validPassword) return next(errorHander(401, 'Wrong Credentials'));
        const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
        const { password: hashedPassword, ...rest } = validUser._doc;
        const twoDaysInMillis = 2 * 24 * 60 * 60 * 1000;
        const expiryDate = new Date(Date.now() + twoDaysInMillis)
        res.cookie('access_token', token, { httpOnly: true, expires: expiryDate }).status(200).json(rest);
    } catch (error) {
        next(error)
    }
};
// google authentication route and logic
export const google = async (req, res, next) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (user) {
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        const { password: hashedPassword, ...rest } = user._doc;
        const expiryDate = new Date(Date.now() + 3600000); // 1 hour
        res
          .cookie('access_token', token, {
            httpOnly: true,
            expires: expiryDate,
          })
          .status(200)
          .json(rest);
      } else {
        const generatedPassword =
          Math.random().toString(36).slice(-8) +
          Math.random().toString(36).slice(-8);
        const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
        const newUser = new User({
          username:
            req.body.name.split(' ').join('').toLowerCase() +
            Math.random().toString(36).slice(-8),
          email: req.body.email,
          password: hashedPassword,
          profilePicture: req.body.profilePhoto,
        });
        await newUser.save();
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
        const { password: hashedPassword2, ...rest } = newUser._doc;
        const expiryDate = new Date(Date.now() + 3600000); // 1 hour
        res
          .cookie('access_token', token, {
            httpOnly: true,
            expires: expiryDate,
          })
          .status(200)
          .json(rest);
      }
    } catch (error) {
      next(error);
    }
  };
  
// update user 
export const updateUser = async (req, res, next) => {
    if(req.user.id !== req.params.id){
        return next(errorHandler(401, 'you can only update your account'));
    }
    try {
        if(req.body.password){
            req.body.password = bcryptjs.hashSync(req.body.password, 5);
        }
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            {
                $set: {
                    username: req.body.username,
                    email: req.body.email,
                    password: req.body.password,
                    profilePhoto: req.body.profilePhoto
                }
            },
            {new: true}
        );
        const {password, ...rest} = updatedUser._doc;
        res.status(200).json(rest);
    } catch (error) {
        next(error)
    }
}

// delete User

export const deleteUser = async (req, res, next) =>{
  if(req.user.id !== req.params.id){
    return next(errorHandler(401, 'You can delete only your account'))
  }
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json('User Deleted Successfully..');
  } catch (error) {
    next(error)
  }
}

// sign out
export const signout = async (req, res) =>{
  res.clearCookie('access_token').status(200).json('Signed Out Successfully')
}
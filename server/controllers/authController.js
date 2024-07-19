import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  const { firstname, email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);

  try {
    let existingUser = await User.findOne({
      email: req.body.email,
    });

    if (existingUser) {
      next(errorHandler(409, "User already exists"));
    } else {
      const user = new User({
        email: email,
        firstname: firstname,
        password: hashedPassword,
      });

      await user.save();
      return res.status(201).json({
        message: "User Successfully Created",
      });
    }
  } catch (error) {
    next(errorHandler(500, "Server Error"));
  }
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      const isPasswordValid = bcrypt.compareSync(password, user.password);

      if (isPasswordValid) {
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET_KEY);
        const { password, ...securedUser } = user._doc;
        res
          .cookie("auth_token", token, {
            maxAge: 60 * 60 * 1000,
            httpOnly: true,
          })
          .status(200)
          .json(securedUser);
      } else {
        next(errorHandler(401, "Invalid credentials"));
      }
    } else {
      next(errorHandler(404, "User does not exist"));
    }
  } catch (error) {
    next(errorHandler(500, "Server Error"));
  }
};

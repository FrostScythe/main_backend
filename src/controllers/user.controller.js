import { asyncHandler } from "../utils/asyncHandler.js";
import { APIError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import {uploadToCloudinary} from "../utils/cloudinary.js";

const registerUser = asyncHandler(async (req, res) => {
  //upload them to cloudinary , avatar
  //create user object - create entry in db
  //remove password and refresh token field from response
  //check for user creation
  //return response

  const { fullname, email, username, password } = req.body;
  if ([fullname, email, username].some((field) => field?.trim() === "")) {
    throw new APIError(400, "All fields are required");
  }

  const existedUser = User.findOne({
    $or: [{ username }, { email }],
  });

  if (existedUser) {
    throw new APIError(409, "Username or email already exists");
  }

  const avtarLocalPath = req.files?.avtar[0]?.path;
  const coverInageLocalPath = req.files?.coverImage[0]?.path;

  if(!avtarLocalPath){
    throw new APIError(400, "Please upload an avatar");
  }

});

export { registerUser };

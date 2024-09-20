import { asyncHandler } from "../utils/asyncHandler.js";
import { APIError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadToCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
  const { fullname, email, username, password } = req.body;
  if ([fullname, email, username].some((field) => field?.trim() === "")) {
    throw new APIError(400, "All fields are required");
  }

  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existedUser) {
    throw new APIError(409, "Username or email already exists");
  }

  const avatarLocalPath = req.files?.avtar[0]?.path;
  //const coverImageLocalPath = req.files?.coverImage[0]?.path;

  let coverImageLocalPath;
  if(req.files&& Array.isArray(req.files.coverImage) && req.files.coverImage.length> 0){
    coverImageLocalPath = req.files.coverImage[0].path;
  }

  if (!avatarLocalPath) {
    throw new APIError(400, "Please upload an avatar");
  }

  const avatar = await uploadToCloudinary(avatarLocalPath);
  const coverImage = await uploadToCloudinary(coverImageLocalPath);

  if (!avatar) {
    throw new APIError(400, "Please upload an avatar");
  }

  const user = await User.create({
    fullname,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email,
    username: username.toLowerCase,
    password,
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    throw new APIError(500, "Failed to create user");
  }

  return response
    .status(201)
    .json(new ApiResponse(200, createdUser, "User Registered successfully"));
});

export { registerUser };
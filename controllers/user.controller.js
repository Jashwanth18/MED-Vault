import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { customApiError } from "../utils/customApiError.js";
import { customApiResponse } from "../utils/customApiResponse.js";

const cookieOptions = {
  httpOnly: true,
  secure: true,
};

const generateAccessandRefreshToken = async (currentUser) => {
  try {
    const accessToken = currentUser.generateAccessToken();
    const refreshToken = currentUser.generateRefreshToken();

    await User.findOneAndUpdate(
      { _id: currentUser._id },
      {
        refreshToken,
      }
    );
    return { accessToken, refreshToken };
  } catch (error) {
    throw new customApiError(500, "Error while generating tokens");
  }
};

// CONTROLLERS

const registerController = asyncHandler(async (req, res) => {
  const { fullName, userName, password, email } = req.body;
  console.log(req.body);

  const existingUser = await User.findOne({
    $or: [{ email }, { userName }],
  });

  if (existingUser) {
    throw new customApiError(
      400,
      "User with the following username or email already exists"
    );
  }

  const currentUser = await User.create({
    userName: userName.toLowerCase(),
    fullName,
    password,
    email,
  });

  // if user creation failed
  if (!currentUser) {
    throw new customApiError(
      500,
      "Something went wrong while registering the user. Please try again"
    );
  }

  res.status(201).json(
    new customApiResponse(
      201,
      {
        userName: currentUser.userName,
        fullName: currentUser.fullName,
        email: currentUser.email,
      },
      "User registered successfully!"
    )
  );
});

const loginController = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new customApiError(400, "Email and password are required");
  }

  const currentUser = await User.findOne({ email });

  if (!currentUser) {
    throw new customApiError(401, "User with this email doesn't exist");
  }

  if (currentUser.refreshToken) {
    throw new customApiError(400, "You are already loggedin!");
  }

  const isPasswordCorrect = await currentUser.verifyPassword(password);
  if (!isPasswordCorrect) {
    throw new customApiError(401, "Password incorrect!");
  } else {
    const { accessToken, refreshToken } =
      await generateAccessandRefreshToken(currentUser);
    console.log(accessToken);
    console.log(currentUser, "currentUser");

    res
      .status(200)
      .cookie("accessToken", accessToken, cookieOptions)
      .cookie("refreshToken", refreshToken, cookieOptions)
      .json(
        new customApiResponse(
          200,
          {
            userName: currentUser.userName,
            email: currentUser.email,
            accessToken,
            refreshToken,
          },
          "Login successfull!"
        )
      );
  }
});

const logoutController = asyncHandler(async (req, res) => {
  const { accessToken, refreshToken } = req.cookies;
  if (!accessToken || !refreshToken) {
    throw new customApiError(400, "Accesstoken and RefreshToken are required!");
  }
  const user = await User.findOneAndUpdate(
    { refreshToken },
    {
      refreshToken: null,
    },
    { new: true }
  );

  res
    .status(200)
    .clearCookie("accessToken", cookieOptions)
    .clearCookie("refreshToken", cookieOptions)
    .json(new customApiResponse(200, {}, "Logout successful!"));
});

export { loginController, registerController, logoutController };

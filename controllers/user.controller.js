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

const updatePasswordController = asyncHandler(async (req, res) => {
  const { newPassword, oldPassword } = req.body;
  if (!newPassword || !oldPassword) {
    throw new customApiError(
      400,
      "Please enter your oldPassword and newPassword"
    );
  }
  const userId = req.user.userId;
  const currentUser = await User.findOne({ _id: userId });

  const isPasswordCorrect = await currentUser.verifyPassword(oldPassword);
  if (!isPasswordCorrect) {
    throw new customApiError(400, "Please enter correct password");
  } else {
    currentUser.password = newPassword;
    await currentUser.save({ validateBeforeSave: false });
    res
      .status(200)
      .json(new customApiResponse(200, {}, "Password updated successfully"));
  }
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  const { refreshToken } = req.cookies;

  if (!refreshToken) {
    throw new customApiError(400, "Invalid refresh token. Please login again");
  }

  const decodedToken = jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET
  );

  const userId = decodedToken?._id;
  if (!userId) {
    throw new customApiError(400, "Invalid token. Please login again");
  }

  const currentUser = await User.findOne({ _id: userId });
  if (!currentUser) {
    throw new customApiError(400, "User not found. Please login again");
  }

  if (currentUser.refreshToken !== refreshToken) {
    throw new customApiError(400, "Invalid refresh token. Please login again.");
  }

  const { newRefreshToken, newAccessToken } =
    await currentUser.generateAccessandRefreshToken();

  res.clearCookie("accessToken", cookieOptions);
  res.clearCookie("refreshToken", cookieOptions);
  res
    .status(200)
    .cookie("accessToken", newAccessToken, cookieOptions)
    .cookie("refreshToken", newRefreshToken, cookieOptions)
    .json(
      new customApiResponse(
        200,
        {
          userId,
          accessToken: newAccessToken,
          refreshToken: newRefreshToken,
        },
        "Access token refreshed successfully!"
      )
    );
});

export {
  loginController,
  registerController,
  logoutController,
  updatePasswordController,
  refreshAccessToken,
};

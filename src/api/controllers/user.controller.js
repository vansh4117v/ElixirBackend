import { eq } from "drizzle-orm";
import options from "../../utils/option.js";
import AccessRefreshTokenGenerator from "../../services/Access&RefreshToken.js";
import { userDetails } from "../../db/schema/schema.js";
import { signUpSchema, signinSchema } from "../validators/vaildation.js";
import bcrypt from "bcrypt";
import db from "../../db/db.js";
import asyncHandler from "../../utils/asyncHandler.js";
import jwt from "jsonwebtoken"
import uuid4 from "uuid4";

//SignUp function
const SignUpController = asyncHandler(async (req, res) => {
  //get user details
  //vaildiation
  //create user object - create entry in db
  // check for user creation
  // return res

  const body = req.body;
  const sucess  = signUpSchema.safeParse(body);
  console.log(sucess)
  if (!{ sucess }) {
    return res.json({ msg: "Wrong input during signup" });
  }

  try {
    // Check if user already exists
    const [existingUser] = await db.select().from(userDetails).where(eq(userDetails.collegeMail, body.collegeMail));

    if (existingUser) {
      return res.status(401).json({ msg: "User with email or username already exists" });
    }

    // hashing pasword
    const hashPassword = await bcrypt.hash(body.password, parseInt(process.env.SALT_ROUND));
    //  console.log(hashPassword)

    //generating uuid for user

    const id = uuid4();

    //creating user
    const result = await db
      .insert(userDetails)
      .values({
        firstName: body.firstName,
        lastName:body.lastName,
        password: hashPassword,
        Branch: body.Branch,
        collegeMail: body.collegeMail,
        year: body.year,
        techStack: body.techStack,
        userId: id,
      })
      .returning({ userId: userDetails.userId });

    const userId = result[0]?.userId;
    console.log(userId);
    //check user created or not
    if (!userId) {
      return res.status(401).json({ msg: "User not created" });
    } else {
      const { accessToken, refreshToken } = await AccessRefreshTokenGenerator(userId);

      return res
        .cookie("refreshToken", refreshToken, options)
        .cookie("accsessToken", accessToken, options)
        .json({ msg: "User created Successfully", refreshToken, accessToken });
    }
  } catch (error) {
    console.log("Error from controller", error);
  }
  console.log("hello from signup");
});

//SignIn function

const SignInController = async (req, res) => {
  // req body -> data
  // username or email
  //find the user
  //password check
  //access and referesh token
  //send cookie

  const body = req.body;

  const { sucess } = signinSchema.safeParse(body);

  //user check
  try {
    const result = await db.select().from(userDetails).where(eq(userDetails.collegeMail, body.collegeMail));

    if (!result) {
      return res.status(400).json({ msg: "User Not found" });
    }

    const password = result[0].password;
    console.log(result[0].userId);
    //password check
    const passwordVerification = bcrypt.compare(body.password, password);

    if (!passwordVerification) {
      return res.status(400).json({ msg: "User not autherized" });
    }

    const { accessToken, refreshToken } = await AccessRefreshTokenGenerator(result[0].userId);
    // console.log("ACcesToken: ",accessToken,"REFRESHTOKEN : ",refreshToken)
    return res
      .status(200)
      .cookie("refreshToken", refreshToken, options)
      .cookie("accessToken", accessToken, options)
      .json({ msg: "User signin Successfully", refreshToken, accessToken });
  } catch (error) {
    console.error(error);
  }
};

const LogOutUser = async (req, res) => {
  //user
  //remove tokens from db & cookie
  try {
    //removing token
    await db.update(userDetails).set({ refreshToken: null }).where(eq(userDetails.userId, req.user.userId));

    res
      .status(200)
      .clearCookie("refreshToken", options)
      .clearCookie("accessToken", options)
      .json({ msg: "UserLogOut" });
  } catch (error) {
    res.status(400).json({ msg: "Error during Logout" });
    console.log(error);
  }
};

const refreshToken = async (req, res) => {
  const newRefreshToken = req.cookies.refreshToken || req.body.refreshToken;

  if (!newRefreshToken) {
    throw new Error({ msg: "Unauthorized request" });
  }
  try {
    const decodedToken = jwt.verify(newRefreshToken, process.env.JWT_SECRET);

    const user = await db.select().from(userDetails).where(eq(userDetails.userId, decodedToken.userId));

    if (!user) {
      throw new Error({ msg: "Unauthorized request user not found during generating refreshing token" });
    }

    if (user[0].refreshToken !== newRefreshToken) {
      throw new Error({ msg: "Refresh Token is expired or used" });
    }
    // console.log(user[0].userId)
    const { accessToken, refreshToken } = await AccessRefreshTokenGenerator(user[0].userId);

    console.log(accessToken, refreshToken)
      res.status(200)
      .cookie("refreshToken", refreshToken, options)
      .cookie("accessToken", accessToken, options)
      .json({ msg: "User signin Successfully", refreshToken: refreshToken, accesToken: accessToken });
  } catch (error) {
    res.status(401).json({ msg: "Error during RefreshToken" });
    console.error(error);
  }
};

export { SignInController, SignUpController, LogOutUser, refreshToken };

import { eq } from "drizzle-orm";
import { userDetails } from "../db/schema/schema.js";

import jwt from "jsonwebtoken";

import db from "../db/db.js";

const AccessRefreshTokenGenerator = async (userId) => {
  try {
    // console.log(process.env.JWT_SECRET)
    const accessToken = jwt.sign(
      {
        userId,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "10d",
      },
    );

    const refreshToken = jwt.sign(
      {
        userId,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "60d",
      },
    );
    // console.log(accessToken)
    await db.update(userDetails).set({ refreshToken: refreshToken }).where(eq(userDetails.userId, userId));
    //    console.log("ACcesToken: ",accessToken,"REFRESHTOKEN : ",refreshToken)
    return { accessToken, refreshToken };
  } catch (error) {
    console.error("Error from Token generator", error);
  }
};

export default AccessRefreshTokenGenerator;

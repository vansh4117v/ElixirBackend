import { eq, not } from "drizzle-orm";
import db from "../../db/db.js";
import { userDetails } from "../../db/schema/schema.js";

//Getting list of user by admin
const getAllUser = async (req, res) => {
  const user = req.user;
  const result = await db
    .select()
    .from(userDetails)
    .where(not(eq(userDetails.userId, user[0].userId)));
  // console.log(result)
  if (!result) {
    return res.status(401).json({ msg: "Something went wrong data not found" });
  }
  res.status(200).json({ msg: "All user details", users: result });
};

//Profile/data of admin
const Profile = async (req, res) => {
  const user = req.user;
  if (user) {
    return res.status(200).json({ msg: "User Profile", userDetails: user });
  }
  return res.status(501).json({ msg: "User not found" });
};

export { getAllUser, Profile };

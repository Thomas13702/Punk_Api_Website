import nookies from "nookies";
import { verifyIdToken } from "../../firebaseAdmin";
import firebaseClient from "../../firebaseClient";

import connectDB from "../../middleware/mongodb";

import Favourite from "../../models/favourite";

const handler = async (req, res) => {
  if (req.method === "POST") {
    try {
      // console.log(req.headers.cookie.split("=")[1]);
      const cookies = req.headers.cookie.split("=")[1];
      console.log(cookies);
      if (cookies === "" && cookies === undefined) {
        console.log("403");
        res.status(403).json({
          message: "Please Sign in or Register to add to favourites!",
        });
        return;
      }
      const token = await verifyIdToken(cookies);

      const { uid } = token;

      const newFavourite = new Favourite({
        favourite: req.body.favourite,
        user: uid,
      });

      const favourite = await newFavourite.save();

      res.json(favourite);
    } catch (err) {
      console.log(err);
      res.status(500).send("Server Error");
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ message: `Method ${req.method} is not allowed` });
  }
};

export default connectDB(handler);

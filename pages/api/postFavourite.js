import { verifyIdToken } from "../../firebaseAdmin";

import connectDB from "../../middleware/mongodb";

import Favourite from "../../models/favourite";

const handler = async (req, res) => {
  if (req.method === "PUT") {
    try {
      // console.log(req.headers.cookie.split("token=")[1]);
      const cookies = req.headers.cookie.split("token=")[1];
      //console.log(cookies);
      if (cookies === "" && cookies === undefined) {
        res.status(403).json({
          message: "Please Sign in or Register to add to favourites!",
        });
        return;
      }
      const token = await verifyIdToken(cookies);

      const { uid } = token;

      // console.log(typeof uid);
      // console.log(uid);
      // console.log(typeof req.body.favourite);
      // console.log(req.body.favourite);

      const newFavourite = new Favourite({
        favourite: req.body.favourite,
        user: uid,
      });

      const favouriteRes = await newFavourite.save();

      res.json(favouriteRes);
      console.log(favouriteRes);
    } catch (err) {
      console.log(err);
      res.status(500).send("Server Error");
    }
  } else {
    res.setHeader("Allow", ["PUT"]);
    res.status(405).json({ message: `Method ${req.method} is not allowed` });
  }
};

export default connectDB(handler);

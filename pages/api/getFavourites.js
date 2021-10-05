import { verifyIdToken } from "../../firebaseAdmin";

import connectDB from "../../middleware/mongodb";

import Favourite from "../../models/favourite";

const handler = async (req, res) => {
  if (req.method === "GET") {
    try {
      console.log(req.headers);
      const cookies = req.headers.cookie.split("token=")[1];
      //console.log(cookies);
      if (cookies === "" && cookies === undefined) {
        res.status(403).json({
          message: "Please Sign in or Register to get favourites",
        });
        return;
      }
      const token = await verifyIdToken(cookies);

      const { uid } = token;
      // console.log(typeof uid);

      const userFavourites = await Favourite.find({ user: uid }).exec();

      // console.log(userFavourites);

      res.json(userFavourites);
    } catch (err) {
      console.log(err);
      res.status(500).send("Server Error");
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).json({ message: `Method ${req.method} is not allowed` });
  }
};

export default connectDB(handler);

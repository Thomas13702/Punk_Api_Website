import { verifyIdToken } from "../../../firebaseAdmin";

import connectDB from "../../../middleware/mongodb";

import Favourite from "../../../models/favourite";

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

      const { id } = req.query;
      // console.log(id);

      const post = await Favourite.find({
        user: uid.toString(),
        favourite: id.toString(),
      });

      if (!post) {
        return res.status(404).json({ msg: "Favourite not found" });
      }
      console.log(post);
      console.log(typeof uid);
      console.log(typeof post[0].user);

      if (uid.toString() !== post[0].user) {
        return res.status(401).json({ msg: "User not authorised" });
      }

      await Favourite.deleteOne({
        user: uid.toString(),
        favourite: id.toString(),
      });
      res.json({ msg: "Post Removed" });
      // console.log(favouriteRes);
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

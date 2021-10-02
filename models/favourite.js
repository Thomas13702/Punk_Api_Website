import mongoose from "mongoose";
var Schema = mongoose.Schema;

var FavouriteSchema = new Schema({
  favourite: {
    type: String,
    // required: true,
  },
  user: {
    type: String,
    // required: true,
  },
});

mongoose.models = {};

var Favourite = mongoose.model("favourite", FavouriteSchema);

export default Favourite;

// module.exports =
// mongoose.models.favourite || mongoose.model("favourite", FavouriteSchema);

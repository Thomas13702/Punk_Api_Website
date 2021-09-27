import mongoose from "mongoose";
var Schema = mongoose.Schema;

var favourite = new Schema({
  favourite: {
    id: Number,
    // required: true,
  },
  user: {
    id: String,
    // required: true,
  },
});

mongoose.models = {};

var Favourite = mongoose.model("Favourite", favourite);

export default Favourite;

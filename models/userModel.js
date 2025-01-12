import mongoose from "mongoose";

const { Schema } = mongoose;

const UserSchema = new Schema({
  name: String,
  email: String,
  password: String,
  lastName: {
    type: String,
    default: "LastName",
  },
  location: {
    type: String,
    default: "My City",
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  avatar: String,
  avatarPublicId: String,
});

//We dont want to show the password when we return the current user info. So, we create a method to do so. We convert the current user to a javascript object and then we delete the password property from it. Then, we return the modified object.
UserSchema.methods.toJSON = function () {
  let obj = this.toObject();
  delete obj.password;
  return obj;
};

export default mongoose.model("User", UserSchema);

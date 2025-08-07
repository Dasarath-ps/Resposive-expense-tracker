import mongoose from "mongoose";
import bcrypt from "bcryptjs";
const UserSchema = new mongoose.Schema({
  FullName: { type: String, reqired: true },
  Email: { type: String, required: true, unique: true },
  Password: { type: String, reqired: true },
});

UserSchema.pre("save", async function (next) {
  if (!this.isModified("Password")) {
    return next();
  }
  try {
    this.Password = await bcrypt.hash(this.Password, 10);
    return next();
  } catch (error) {
    return next(error);
  }
});
UserSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.Password);
};

const User = mongoose.model("users", UserSchema);
export default User;

import bcrypt from "bcryptjs";
import mongoose from "mongoose";
const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    age: Number,
    address: String,
    phoneNumber: Number,
    deletedAt: {
      type: Date,
      default: null,
    },
    image: {
      type: String,
      required: false,
    },
    roleCode: {
      type: Number,
      default: 100,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
  next();
});

const User = mongoose.model("User", userSchema);

export default User;

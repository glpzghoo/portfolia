import mongoose from "mongoose";

export const connectToDb = async () => {
  try {
    const connected = await mongoose.connect(`${process.env.DB_PASSWORD}`);
    console.log(connected);
  } catch (err) {
    console.error(err, "error");
  }
};
connectToDb();

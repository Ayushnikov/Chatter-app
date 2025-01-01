
import mongoose from "mongoose";

// User schema definition
const userSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    unique: true,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  image: String,
  bio: String,
  threads: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Thread",
    },
  ],
  onboarded: {
    type: Boolean,
    default: false,
  },
  communities: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Community",
    },
  ],
});

// MongoDB connection function
const connectToDatabase = async () => {
  const mongoUri = process.env.MONGODB_URL; // Ensure the correct variable name

  // Ensure MONGODB_URL is defined in environment variables
  if (!mongoUri) {
    throw new Error("MONGODB_URL is not defined in the environment variables.");
  }

  // Establish connection if not already connected
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(mongoUri);
    console.log("Connected to MongoDB");
  }
};

// Attempt to connect to the database before exporting the model
await connectToDatabase();

// Ensure the User model is correctly initialized
const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;

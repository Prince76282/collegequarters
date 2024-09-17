const express = require("express");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");
const homeListings = require("./routes/homeListings");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const favoritesRoutes = require("./routes/favoritesRoutes");
const User = require("./models/User");

dotenv.config();

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: [
      "https://collegequarters.in",
      "https://www.collegequarters.in",
      "https://server.collegequarters.in",
      "http://localhost:3000",
    ],
    // methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use("/api/users", userRoutes);
app.use("/api/favorites", favoritesRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/homeListings", homeListings);

app.get("/test", (req, res) => {
  res.send("Test endpoint works!");
});

app.use((err, req, res, next) => {
  console.error("Server error:", err); // Log detailed error
  res.status(500).send("Internal Server Error");
});

// Get user details by email
app.get("/api/users/:email", async (req, res) => {
  const { email } = req.params; // Extract the email from the request parameters
  try {
    // Find the user in the database by email
    const user = await User.findOne({ email });

    if (user) {
      // If user is found, send a success response with user data
      res
        .status(200)
        .json({ message: "User data retrieved successfully", user });
    } else {
      // If user is not found, send a 404 response
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    // Handle any potential errors and send a 500 response
    console.error("Error retrieving user profile:", error);
    res.status(500).json({ message: "Error retrieving user profile" });
  }
});

app.put("/api/users/:email", async (req, res) => {
  const { email } = req.params;
  const { name, phone } = req.body;
  try {
    const updatedUser = await User.findOneAndUpdate(
      { email },
      { name, phone },
      { new: true }
    );
    if (updatedUser) {
      res.status(200).json({ message: "Profile updated", user: updatedUser });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ message: "Error updating profile" });
  }
});

app.delete("/api/favorites/remove", async (req, res) => {
  const { email, homeId } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      user.savedHomes = user.savedHomes.filter(
        (home) => home.toString() !== homeId
      );
      await user.save();
      res.status(200).json({ message: "Favorite removed", user });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Error removing favorite:", error);
    res.status(500).json({ message: "Error removing favorite" });
  }
});

app.use((err, req, res, next) => {
  console.error("Server Error:", err.message);
  res.status(500).json({ message: "Internal Server Error" });
});

const PORT = process.env.PORT || 5000;
connectDB()
  .then(() => {
    console.log(`MongoDB Connected`);
  })
  .catch((err) => {
    console.error("Database connection error:", err.message);
  });

app.listen(PORT, async () => {
  console.log(`The server is running at localhost : ${PORT}`);
});

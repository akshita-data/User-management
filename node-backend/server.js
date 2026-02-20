const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors"); 
require("dotenv").config();

const userRoutes = require("./routes/userRoutes");

const app = express();

app.use(cors());

// Middleware
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("MongoDB Connection Error:", err));

// Basic Routes
app.get("/", (req, res) => {
  res.send("Hello from Express Server");
});

app.get("/about", (req, res) => {
  res.send("This is About Page");
});

// Use Routes
app.use("/api", userRoutes);

// Server Start
const port = process.env.PORT ;

app.listen(port, () => {
  console.log(`Express server running on port ${port}`);
});





















// require("dotenv").config();
// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcrypt");
// const express = require("express");
// const mongoose = require("mongoose");
// const User = require("./models/user"); 
// const authMiddleware = require("./middleware/authMiddleware");
// const router = express.Router();
// require('dns').setServers(['8.8.8.8', '8.8.4.4']);

// const app = express();

// // Middleware
// app.use(express.json());

// // =======================
// // ✅ MongoDB Connection
// // =======================
// mongoose.connect(process.env.MONGO_URL)
//   .then(() => {
//     console.log("✅ MongoDB Connected");
//   })
//   .catch((err) => {
//     console.log("❌ MongoDB Connection Error:", err.message);
//   });

// // =======================
// // Routes
// // =======================

// app.get("/", (req, res) => {
//   res.send("Server is running 🚀");
// });

// app.get("/signin", (req, res) => {
//   res.send("signin to your account");
// });

// app.get("/login", (req, res) => {
//   res.send("Good Day");
// });

// app.get("/signup", (req, res) => {
//   res.send("Please signup first");
// });

// app.get("/logout", (req, res) => {
//   res.send("Logged out");
// });

// // =======================
// // ✅ Register User
// // =======================
// app.post("/api/register", async (req, res) => {
//   try {
//     const { name, email, password } = req.body;

//     // Basic validation
//     if (!name || !email || !password) {
//       return res.status(400).json({
//         message: "All fields are required",
//       });
//     }
// const hashedPassword = await bcrypt.hash(password,10);
//     const user = await User.create({
//       name,
//       email,
//       password: hashedPassword,
//     });

//     res.status(201).json({
//       message: "User registered successfully",
//       user,
//     });

//   } catch (error) {
//     res.status(500).json({
//       message: "Registration failed",
//       error: error.message,
//     });
//   }
// });

// // =======================
// // 🔥 Test Route
// // =======================
// app.get("/create-user", async (req, res) => {
//   try {
//     const user = await User.create({
//       name: "donald",
//       email: "testuser10@gmail.com",
//       password: "1234567810",
//     });

//     res.json({
//       message: "User saved successfully",
//       user,
//     });

//   } catch (error) {
//     res.status(500).json({
//       message: "Error saving user",
//       error: error.message,
//     });
//   }
// });



// //login route
// //login route

// app.post("/api/login", async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // 1️⃣ Basic validation
//     if (!email || !password) {
//       return res.status(400).json({
//         message: "Email and password required",
//       });
//     }

//     // 2️⃣ Check user exists
//     const user = await User.findOne({ email });

//     if (!user) {
//       return res.status(404).json({
//         message: "User not found",
//       });
//     }

//     // 3️⃣ Compare password (bcrypt)
//     const isMatch = await bcrypt.compare(password, user.password);

//     if (!isMatch) {
//       return res.status(401).json({
//         message: "Invalid password",
//       });
//     }

//     // 4️⃣ Generate JWT token
//     const token = jwt.sign(
//       { id: user._id },       // Payload
//       "mysecretkey",          // Secret key
//       { expiresIn: "1h" }     // Expiry time
//     );

//     // 5️⃣ Send response (without password)
//     res.status(200).json({
//       message: "Login successful",
//       token,
//     });

//   } catch (error) {
//     res.status(500).json({
//       message: "Login failed",
//       error: error.message,
//     });
//   }
// });


// console.log("LOGIN ROUTE FILE RUNNING");

// // profile
// // Protected Route (Profile)

// app.get("/api/profile", authMiddleware, async (req, res) => {
//   try {
//     const user = await User.findById(req.user.id).select("-password");

//     if (!user) {
//       return res.status(404).json({
//         message: "User not found",
//       });
//     }

//     res.status(200).json(user);

//   } catch (error) {
//     res.status(500).json({
//       message: "Server error",
//       error: error.message,
//     });
//   }
// });

//  // Another Protected Route (Dashboard)

// app.get("/api/Student-dashboard", authMiddleware, (req, res) => {
//   res.json({
//     message: "Welcome to the Student dashboard",
//     userId: req.user.id,
//   });
// });
// // =======================
// // Server Start
// // =======================
// app.use("/api", userRoutes);

// const PORT = process.env.PORT || 3000;

// app.listen(PORT, () => {
//   console.log(`🚀 Server is running on port ${PORT}`);
// });

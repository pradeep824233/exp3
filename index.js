const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");
const cors = require("cors");

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World");
});


app.post("/api/signup", async (req, res) => {
  const { name, username, email, password } = req.body;

  const filePath = path.join(__dirname, "db", "users.json");

  try {
    let userData = [];
    if (fs.existsSync(filePath)) {
      const fileContent = fs.readFileSync(filePath, "utf-8");
      userData = JSON.parse(fileContent);
    }

    const newUser = { name, username, email, password };
    userData.push(newUser);

    fs.writeFileSync(filePath, JSON.stringify(userData, null, 2), "utf-8");

    res.status(201).json({ message: "User signed up successfully!" });
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/api/users", (req, res) => {
  const filePath = path.join(__dirname, "db", "users.json");

  try {
    if (fs.existsSync(filePath)) {
      const fileContent = fs.readFileSync(filePath, "utf-8");
      const userData = JSON.parse(fileContent);
      res.json(userData);
    } else {
      res.json([]);
    }
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log("Server is runnig at port: ", PORT);
});

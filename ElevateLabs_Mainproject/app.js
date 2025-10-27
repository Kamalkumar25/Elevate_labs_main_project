const express = require("express");
const path = require("path");
const app = express();

// Serve the static frontend files from /public folder
app.use(express.static(path.join(__dirname, "public")));

// Simple calculator route: /calc?num1=10&num2=5&op=add
app.get("/calc", (req, res) => {
  const num1 = parseFloat(req.query.num1);
  const num2 = parseFloat(req.query.num2);
  const op = req.query.op;

  if (isNaN(num1) || isNaN(num2) || !op) {
    return res
      .status(400)
      .send("Please provide num1, num2, and op (add, sub, mul, div)");
  }

  let result;
  switch (op) {
    case "add":
      result = num1 + num2;
      break;
    case "sub":
      result = num1 - num2;
      break;
    case "mul":
      result = num1 * num2;
      break;
    case "div":
      result = num2 !== 0 ? num1 / num2 : "Error: Division by zero";
      break;
    default:
      return res.status(400).send("Invalid operation. Use add, sub, mul, or div");
  }

  res.send(`Result of ${op}(${num1}, ${num2}) = ${result}`);
});

// For all other routes, serve index.html (so browser loads your frontend)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Start the server
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`✅ Calculator app running on port ${port}`));
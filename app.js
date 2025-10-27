const express = require("express");
const app = express();

// Simple calculator route: /calc?num1=10&num2=5&op=add
app.get("/calc", (req, res) => {
  const num1 = parseFloat(req.query.num1);
  const num2 = parseFloat(req.query.num2);
  const op = req.query.op;

  if (isNaN(num1) || isNaN(num2) || !op) {
    return res.status(400).send("Please provide num1, num2, and op (add, sub, mul, div)");
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

app.get("/", (req, res) => {
  res.send(`
    <h2>Simple Calculator API 🧮</h2>
    <p>Use endpoint like: /calc?num1=10&num2=5&op=add</p>
    <p>Available operations: add, sub, mul, div</p>
  `);
});

app.listen(8080, () => console.log("✅ Calculator app running on port 8080"));

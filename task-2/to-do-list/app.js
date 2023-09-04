const express = require("express");
const bodyParser = require("body-parser");
const { getDate } = require("./date");
const PORT = isNaN(parseInt(process.env.PORT))
  ? 5000
  : parseInt(process.env.PORT);

const app = express();

const items = ["Buy Food", "Cook Food", "Eat Food"];

app.set("view engine", "ejs");

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(express.static("public"));

app.get("/", (req, res) => {
  const day = getDate();
  res.render("list", { kindOfDay: day, newListItems: items });
});

app.post("/", (req, res) => {
  const item = req.body.newItem;
  items.push(item);
  res.redirect("/");
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});

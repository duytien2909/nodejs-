require("dotenv").config();

const express = require("express");
const expresslayouts = require("express-ejs-layouts");
const methodOverride = require("method-override");
const router = require("./src/router/index");

const app = express();
const port = 5000|| process.env.PORT;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));

app.use(express.static("public"));
app.use("/upload", express.static("./upload"));

app.use(expresslayouts);
app.set("layout", "./layouts/main");
app.set("view engine", "ejs");

router(app);

app.get("./src/view", function (req, res) {
  res.status(404).render("404");
});

app.listen(port, () => {
  console.log(`App listening on port ${port} `);
});

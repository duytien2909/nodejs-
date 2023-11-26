const movieRouter = require("./movieRouter");
const router = (app) => {
  app.use("/", movieRouter);
};

module.exports = router;

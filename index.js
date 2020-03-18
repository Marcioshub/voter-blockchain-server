const express = require("express");
const CORS = require("cors");
const routes = require("./routes/Routes.js");
const app = express();
app.use(express.json());
app.use(CORS());

app.use("/", routes);

//Capture All 404 errors
app.use(function(req, res, next) {
  res.status(404).json({
    message: "Unable to find the requested resource!"
  });
});

app.listen(5000, () => console.log(`Listening on port: 5000`));

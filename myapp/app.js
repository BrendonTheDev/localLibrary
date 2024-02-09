const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");

//MONGOOSE FROM BLOG
// const dbURI =
//   "mongodb+srv://brendon:Wetdog22@nodelearn.themebq.mongodb.net/node-learn?retryWrites=true&w=majority";
// mongoose
//   .connect(dbURI)
//   .then((result) => app.listen(3000))
//   .catch((err) => console.log(err));

// mongoose setup
mongoose.set("strictQuery", false);

// const mongoDB = process.env.MONGODB_URI || db_url;
const { MongoClient, ServerApiVersion } = require("mongodb");
const uri =
  "mongodb+srv://brendon:Wetdog22@locallibrarycluster.kgsgd20.mongodb.net/Local_Library?retryWrites=true&w=majority";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

// MONGOOSE FROM MDN DOCS
// wait for database URL to connect to.
// main().catch((err) => console.log(err));
// async function main() {
//   await mongoose.connect(db_url);
// }

// access routers
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");

// instantiate express app
const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;

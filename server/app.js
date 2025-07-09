const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const globalErrorHandler = require("./controllers/errorController");
const userRouter = require("./routes/userRoutes");
const membershipRouter = require("./routes/membershipRoutes");
const bodyFeatureRouter = require("./routes/bodyFeatureRoutes");
const nutritionRouter = require("./routes/nutritionRoutes");
const workoutRouter = require("./routes/workoutRoutes");
const notificationRouter = require("./routes/notificationRoutes");
const snapshotRouter = require("./routes/userCountSnapshotRoutes");
const adminUserRouter = require("./routes/adminUserRoutes");

const app = express();

const allowedOrigins = ['http://localhost:3000'];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(null, false);
    }
  },
  credentials: true,
  methods: "GET,POST,PUT,DELETE,OPTIONS"
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

app.use(morgan("dev"));

app.use(express.json());

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  console.log("Request received");
  next();
});

app.use("/api/fitness/v1/users", userRouter);
app.use("/api/fitness/v1/panelUser", adminUserRouter);
app.use("/api/fitness/v1/membership", membershipRouter);
app.use("/api/fitness/v1/bodyFeature", bodyFeatureRouter);
app.use("/api/fitness/v1/nutrition", nutritionRouter);
app.use("/api/fitness/v1/workout", workoutRouter);
app.use("/api/fitness/v1/notification", notificationRouter);
app.use("/api/fitness/v1/snapshot", snapshotRouter);

app.all("*", (req, res, next) => {
  const err = new Error(`Bu URL bulunamadı: ${req.originalUrl}`);
  err.status = 404;
  next(err); 
});

app.use(globalErrorHandler);

module.exports = app;
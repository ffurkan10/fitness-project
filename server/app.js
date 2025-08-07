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
const lessonSessionRouter = require("./routes/lessonSessionRoutes");

const app = express();

app.use(cors({
  origin: 'https://your-frontend-domain.vercel.app',
  methods: ['GET','POST','PUT','DELETE','OPTIONS'],
  credentials: true            // eğer cookie / yetkilendirme header’ı kullanıyorsanız
}));

app.options('*', cors({
  origin: 'https://your-frontend-domain.vercel.app',
  credentials: true
}));

app.use(morgan("dev"));

app.use(express.json());

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  console.log("Request received");
  next();
});

app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Fitness API is running smoothly!"
  });
})

app.use("/api/fitness/v1/users", userRouter);
app.use("/api/fitness/v1/panelUser", adminUserRouter);
app.use("/api/fitness/v1/membership", membershipRouter);
app.use("/api/fitness/v1/bodyFeature", bodyFeatureRouter);
app.use("/api/fitness/v1/nutrition", nutritionRouter);
app.use("/api/fitness/v1/workout", workoutRouter);
app.use("/api/fitness/v1/notification", notificationRouter);
app.use("/api/fitness/v1/snapshot", snapshotRouter);
app.use("/api/fitness/v1/lesson", lessonSessionRouter);

app.all("*", (req, res, next) => {
  const err = new Error(`Bu URL bulunamadı: ${req.originalUrl}`);
  err.status = 404;
  next(err); 
});

app.use(globalErrorHandler);

module.exports = app;
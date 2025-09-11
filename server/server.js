const mongoose = require("mongoose");
const dotenv = require("dotenv");
const http = require("http"); 
const app = require("./app");
const { initSocket } = require("./socket"); 

dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE.replace("<PASSWORD>", process.env.DATABASE_PASSWORD);

mongoose.connect(DB).then(() => {
  require('./controllers/userCountSnapshotController');

  console.log("DB bağlantısı başarılı");
});

const port = process.env.PORT || 5000;

//! HTTP sunucusu oluştur
const server = http.createServer(app);

//! Socket başlat
initSocket(server);

server.listen(port, () => {
  console.log(`Sunucu ${port} portunda çalışıyor`);
});

process.on("unhandledRejection", (err) => {
  console.log("Unhandled Rejection! Shutting down...");
  console.log(err.name, err.message);
  server.close(() => process.exit(1));
});

process.on("uncaughtException", (err) => {
  console.log("Uncaught Exception! Shutting down...");
  console.log(err.name, err.message);
  server.close(() => process.exit(1));
});

require('./cron/expireMemberships');


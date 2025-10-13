// socket.js
const socketIo = require('socket.io');
const jwt = require('jsonwebtoken');
let io;

function initSocket(server) {
  io = socketIo(server, {
    cors: {
      origin: "*", // production'da site adresini belirt
      methods: ["GET", "POST"],
    },
  });

  // JWT ile kimlik doğrulama
  io.use((socket, next) => {
    const token = socket.handshake.auth?.token;
    if (!token) return next(new Error("Token gerekli"));

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      socket.userId = decoded.id;
      next();
    } catch (err) {
      next(new Error("Geçersiz token"));
    }
  });

  // io.use((socket, next) => {
  //   socket.userId = "686a5782a54ae4cd24513c96"; // sabit bir ID
  //   next();
  // });

  io.on("connection", (socket) => {
    console.log(`🔌 Yeni bağlantı: ${socket.id}, Kullanıcı: ${socket.userId}`);

    socket.join(socket.userId); // Kullanıcıyı kendi odasına kat

    socket.on("disconnect", () => {
      console.log(`❌ Bağlantı koptu: ${socket.id}`);
    });
  });
}

function getIO() {
  if (!io) {
    throw new Error("Socket.io başlatılmadı!");
  }
  return io;
}

module.exports = {
  initSocket,
  getIO,
};


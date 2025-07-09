const socketIo = require('socket.io');
let io; // dışa aktarılacak io nesnesi

function initSocket(server) {
  io = socketIo(server, {
    cors: {
      origin: "*", // veya güvenli olarak: "https://senin-site.com"
      methods: ["GET", "POST"]
    }
  });

  io.on('connection', (socket) => {
    console.log(`🔌 Yeni bağlantı: ${socket.id}`);

    socket.on("register", (userId) => {
      console.log(`📦 Kullanıcı ${userId} odaya katıldı`);
      socket.join(userId); // Her kullanıcı kendi ID'siyle odaya katılır
    });

    socket.on('disconnect', () => {
      console.log(`❌ Bağlantı koptu: ${socket.id}`);
    });
  });
}

// io nesnesine erişim için getter
function getIO() {
  if (!io) {
    throw new Error("Socket.io henüz başlatılmadı!");
  }
  return io;
}

module.exports = {
  initSocket,
  getIO
};

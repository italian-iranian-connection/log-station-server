const app = require("./app");

// ℹ️ Sets the PORT for our app to have access to it. If no env has been set, we hard code it to 5005
const PORT = process.env.PORT || 5005;

const FRONTEND_URL = process.env.ORIGIN || "http://localhost:3000";

const cors = require("cors");
/////////////////////////////////////
const server = require('http').createServer(app);

const io = require('socket.io')(server,{
  cors: {
    credentials: true,
    origin: [FRONTEND_URL] ,
    methods: ["GET", "POST"],
  },
});


io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`User with ID: ${socket.id} joined room: ${data}`);
  });
  
  socket.on("send_message", (data) => {
    console.log(data)
    socket.to(data.room).emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});


////////////////////////////////////


server.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});

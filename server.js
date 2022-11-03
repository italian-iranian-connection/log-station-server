const app = require("./app");

// ℹ️ Sets the PORT for our app to have access to it. If no env has been set, we hard code it to 5005
const PORT = process.env.PORT || 5005;

const FRONTEND_URL = process.env.ORIGIN || "http://localhost:3000";

<<<<<<< HEAD

=======
const cors = require("cors");
>>>>>>> 9a9543983402c24c2684c653fde5c63913e9c23c
/////////////////////////////////////
const server = require('http').createServer(app);

const io = require('socket.io')(server,{
  cors: {
    credentials: true,
<<<<<<< HEAD
    origin: process.env.ORIGIN || "http://localhost:3000",
=======
    origin: [FRONTEND_URL] ,
>>>>>>> 9a9543983402c24c2684c653fde5c63913e9c23c
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

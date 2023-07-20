const app = require("express")();

const server = require("http").createServer(app);

const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:8081",
  },
});

io.on("connection", (socket) => {
  // console.log(socket.id);
  // console.log(socket.connected)
  // console.log("Socket is active");

  // socket.once("chat", (payload) => {
  //   io.emit("chat", payload);
  // });
  console.log("user bam");
  console.log(socket.id);

  socket.on("chat", (payload) => {
    io.emit("chat", payload);
    console.log(payload)
    // To all connected clients except the sender
    socket.broadcast.emit("chat", payload);
  });


 

  socket.on("disconnect", () => {
   
    console.log("user disconnected");
    console.log(socket.id);
  });
});

// app.listen(5000, () => console.log("server is active..."));

server.listen(8000, () => {
  console.log("Server is listening at port 5000...");
});


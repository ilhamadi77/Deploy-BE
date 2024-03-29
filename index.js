// import dotenv and call config function to load environment
require("dotenv").config();
const express = require("express");

const cors = require("cors");

// import this socket.io
const http = require("http");
const { Server } = require("socket.io");

// Get routes to the variabel
const router = require("./src/routes");

const app = express();

//server untuk socket
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",//mengacu pada port fe
  },
});

// import socket function and call with parameter io
require("./src/socket")(io);//menerima server yg terhubung dengan fe

const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

// Add endpoint grouping and router
app.use("/api/v1/", router);
app.use("/uploads", express.static("uploads"));

app.get('/', function (req, res) {
  res.send({
    message: "Hello Deploy"
  });
})

// change app to server
server.listen(port, () => console.log(`Listening on port ${port}!`));

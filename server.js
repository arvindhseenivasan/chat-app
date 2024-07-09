require("dotenv").config();

const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const PORT = process.env.SERVER_PORT || 3000;

app.use(express.json());

/**
 * In memeory variables initialization
 */

let groups = {
  group1: [],
  group2: [],
};
let messages = {};
let users = {}; // Store user-specific socket connections

/**
 * Gets messages from a group.
 * @param {string} group - The name of the group.
 * @returns {array} An array of messages from the group.
 */

app.get("/messages/:group", (req, res) => {
  const { group } = req.params;
  res.status(200).send(messages[group] || []);
});

/**
 * Socket setup
 */

io.on("connection", (socket) => {
  console.log("New client connected to the socket server");

  /**
   * Registers a user to a group.
   * @param {string} data.userId - The ID of the user.
   * @param {string} data.group - The name of the group.
   */

  /**
   * User created if not in the users data store
   * Stores the socket of the client to revice the priivate messages for the user
   * Joining the user to the group (room) in socket to revice the group messages
   * Send notification to the group for the new user joining activity
   */

  socket.on("register", ({ userId, group }) => {
    if (!users[userId]) {
      users[userId] = { group, sockets: [] };
    }

    users[userId].sockets.push(socket);

    socket.join(group);

    //
    io.to(group).emit("notification", {
      message: `${userId} joined the group`,
    });
  });

  /**
   * Sends a message to a group or a specific user.
   * @param {object} data - The message data.
   * @param {string} data.group - The name of the group.
   * @param {string} data.userId - The ID of the user sending the message.
   * @param {string} data.message - The message content.
   * @param {string} [data.recipientId] - The ID of the recipient (optional).
   */

  /**
   * Store the message into messages object
   * Send private message if recipient Id is known or send a group message
   */

  socket.on("sendMessage", ({ group, userId, message, recipientId }) => {
    if (!messages[group]) {
      messages[group] = [];
    }
    const newMessage = { userId, message, timestamp: new Date() };
    messages[group].push(newMessage);

    if (recipientId && users[recipientId]) {
      users[recipientId].sockets.forEach((s) =>
        s.emit("privateMessage", newMessage)
      );
    } else {
      io.to(group).emit("newMessage", newMessage);
    }
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
    for (let userId in users) {
      users[userId].sockets = users[userId].sockets.filter((s) => s !== socket);
      if (users[userId].sockets.length === 0) {
        delete users[userId];
      }
    }
  });
});

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

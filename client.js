/**
 * Client is the replica of UI
 * Register the user to the specified static group on the start
 * Logs notifications and messages of the group user joined
 * For demo purporse the user can join only one group at a time
 * Sends message to the group and a pre defined user at intervals
 */

require("dotenv").config();

const io = require("socket.io-client");

const SERVER_URL = process.env.CLIENT_SERVER_URL || "http://localhost:3000"; // URL of the main server
const socket = io(SERVER_URL);

const userId = process.env.USER_ID || "user2";
const group = process.env.GROUP || "group1";
const recipientId = process.env.RECIPIENT_ID || "user1"; // Example recipient for private message

/** Connect to the main server and register the user
 * */

socket.on("connect", () => {
  console.log("Connected to server");
  socket.emit("register", { userId, group });
});

/**
 * Listen for notifications
 */

socket.on("notification", (data) => {
  console.log(`${new Date().toISOString()}, Notification: `, data.message);
});

/**
 * Listen for new messages in the group
 */

socket.on("newMessage", (data) => {
  console.log(`${new Date().toISOString()}, New Group Message: `, data.message);
});

// Listen for private messages
socket.on("privateMessage", (data) => {
  console.log(`${new Date().toISOString()}, New private Message: `, data);
});

// Function to send a message to the group or a specific user
function sendMessage(message, recipientId = null) {
  socket.emit("sendMessage", { group, userId, message, recipientId });
}

// Send a group message every 5 seconds
setInterval(() => {
  const message = `Hello from ${userId} at ${new Date().toLocaleTimeString()}`;
  sendMessage(message);
}, 5000);

// Send a private message to recipientId every 10 seconds
setInterval(() => {
  const message = `Private message from ${userId} at ${new Date().toLocaleTimeString()}`;
  sendMessage(message, recipientId);
}, 10000);

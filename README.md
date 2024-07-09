# Real-Time Messaging System with Node.js and Socket.IO

## Introduction

This project is a real-time messaging system using Node.js and Socket.IO. The server handles API endpoints for joining groups, sending/receiving messages, and managing notifications. The client simulates a user interface without a UI, using a Node.js script to interact with the server.

## Features

- Join groups
- Send and receive group messages
- Send and receive private messages
- Notifications for group activities
- Temporary data storage in server memory

## Prerequisites

- Node.js
- npm (Node Package Manager)

## Setup

### 1. Clone the repository

```bash
git clone https://github.com/arvindhseenivasan/chat-app.git

```

### 2. Install dependencies

```bash
npm install
```

### 3. Create the `.env` file

Create a `.env` file in the root of your project directory with the following content:

```
SERVER_PORT=3001
CLIENT_SERVER_URL=http://localhost:3001
USER_ID=user2
GROUP=group1
RECIPIENT_ID=user1
```

## Running the Server

Start the server:

```bash
node server.js
```

## Running the Client

Start the client:

```bash
node client.js
```

## API Endpoints

### Join a Group

**POST /join**

Request body:

```json
{
  "userId": "user1",
  "group": "group1"
}
```

Response:

```json
{
  "message": "user1 joined group1"
}
```

### Get Messages from a Group

**GET /messages/:group**

Response:

```json
[
  {
    "userId": "user1",
    "message": "Hello from user1",
    "timestamp": "2023-01-01T00:00:00.000Z"
  }
]
```

## Generating Documentation with JSDoc

### 1. Install JSDoc

```bash
npm install jsdoc --save-dev
```

### 2. Add JSDoc comments to your code

For example, `server.js` already has JSDoc comments added in the code above.

### 3. Create `jsdoc.json`

Create a `jsdoc.json` file in the root of your project directory:

```json
{
  "source": {
    "include": ["server.js", "client.js"],
    "exclude": ["node_modules"]
  },
  "opts": {
    "destination": "./docs"
  }
}
```

### 4. Generate Documentation

Run the following command to generate the documentation:

```bash
npx jsdoc -c jsdoc.json
```

This will generate the documentation in the `./docs` directory.

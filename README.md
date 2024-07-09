# Real-Time Messaging System with Node.js and Socket.IO
A messaging application for group and private messaging

## Introduction

This project demonstrates a real-time messaging system using Node.js and Socket.IO. The server handles API endpoints for joining groups, sending/receiving messages, and managing notifications. The client simulates a user interface without a UI, using a Node.js script to interact with the server.

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
git clone 
```

### 2. Install dependencies

```bash
npm install
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

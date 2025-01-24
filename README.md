# RMS-api

backend component for RMS

# MySQL API with Node.js and Nodemon

This project is a simple Node.js API that connects to a MySQL database. The API is set up to automatically restart using Nodemon whenever code changes are detected.

## Prerequisites

Make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)
- [MySQL](https://www.mysql.com/)

## Getting Started

Prerequisite: Running MySQL RMS Database

- Schema is available under misc

Follow these steps to get the API up and running:

### Clone the Repository

```bash
git clone https://github.com/glconde/RMS-api.git
cd RMS-api
```

### Create the .env File on root (/)

```plaintext
DB_HOST=localhost
DB_USER=group3
DB_PASSWORD=your_password
DB_NAME=RMS
PORT=8888
```

##### \* PORT will be 3000, if no value is provided

### Install Modules and Run (dev)

```bash
npm install
npm run dev
```

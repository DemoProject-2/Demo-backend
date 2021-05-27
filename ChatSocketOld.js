const express = require("express");
const http = require('http')
const app = express();
const cors = require("cors");
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
function setupChat(){
  const server = app.listen("port", () => {
    console.log("Chat server Running on Port: ", port, " ...");
  });

  
}
module.exports = setupChat
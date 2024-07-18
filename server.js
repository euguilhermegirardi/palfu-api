const express = require('express');
const cors = require('cors');
const jsonServer = require("json-server");

const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(cors({
  origin: 'https://palfu.netlify.app/',
}));
server.use('/api', router);
server.options('/api/list', cors());

server.listen(process.env.PORT || 5000, () => {
  console.log("JSON Server is running");
});
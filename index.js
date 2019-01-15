const express = require("express");
const helmet = require("helmet");
const knex = require("knex");

const knexConfig = require("./knexfile.js");

const server = express();

// connect to database
const db = knex(knexConfig.development);

server.use(express.json());
server.use(helmet());

// endpoints here
server.get("/", (req, res) => {
  res.send("api working");
});

server.get("/api/zoos", (req, res) => {
  db("zoos")
    .then(zoos => {
      res.status(200).json(zoos);
    })
    .catch(err => res.status(500).json(err));
});

server.get("/api/zoos/:id", (req, res) => {
  db(zoos)
    .where({ id: req.params.id })
    .then(zoos => {
      if (zoos) {
        res.status(200).json(zoos);
      } else {
        res.status(404).json({ message: "Zoo not found" });
      }
    });
});

server.post("/api/zoos", (req, res) => {
  db("zoos")
    .insert(req.body)
    .then(zoos => {
      if (zoos) {
        res.status(200).json(zoos);
      } else {
        res.status(200).json({ message: "Please enter a zoo" });
      }
    })
    .catch(err => res.status(500).json(err));
});

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});

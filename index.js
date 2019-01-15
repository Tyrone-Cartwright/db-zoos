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

// Zoos endpoints
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
  if (req.body.name) {
    db("zoos")
      .insert(req.body)
      .then(id => {
        res.status(201).json(id);
      })
      .catch(err => {
        res.status(404).json({ error: "Name already exist", error: err });
      });
  } else {
    res.status(500).json({ message: "Please enter a zoo name" });
  }
});

server.put("/api/zoos/:id", (req, res) => {
  if (req.body.name) {
    db("zoos")
      .where({ id: req.params.id })
      .update(req.body)
      .then(count => {
        if (count >= 1) {
          res.status(200).json(count);
        } else {
          res.status(404).json({ message: "Zoo not found" });
        }
      })
      .catch();
  } else {
    res.status(500).json({ error: "Please provide name to update" });
  }
});

server.delete("/api/zoos/:id", (req, res) => {
  db("zoos")
    .where({ id: req.params.id })
    .del()
    .then(count => {
      if (count >= 1) {
        res.status(200).json({ count: `Zoo has been deleted` });
      } else {
        res
          .status(404)
          .json({ error: "Zoo with the specified ID could not be found" });
      }
    })
    .catch(err => {
      res.status(500).json({ error: "Something went wrong, Try Again" });
    });
});

// Bear endpoints

server.get("/api/bears", (req, res) => {
  db("bears")
    .then(bears => {
      res.status(200).json(bears);
    })
    .catch(err => res.status(500).json(err));
});

server.get("/api/bears/:id", (req, res) => {
  db(bears)
    .where({ id: req.params.id })
    .then(bears => {
      if (bears) {
        res.status(200).json(bears);
      } else {
        res.status(404).json({ message: "Bear not found" });
      }
    });
});

server.post("/api/bears", (req, res) => {
  if (req.body.name) {
    db("bears")
      .insert(req.body)
      .then(id => {
        res.status(201).json(id);
      })
      .catch(err => {
        res.status(404).json({ error: "Bear name already exist", error: err });
      });
  } else {
    res.status(500).json({ message: "Please enter a bear's name" });
  }
});

server.put("/api/bears/:id", (req, res) => {
  if (req.body.name) {
    db("bears")
      .where({ id: req.params.id })
      .update(req.body)
      .then(count => {
        if (count >= 1) {
          res.status(200).json(count);
        } else {
          res.status(404).json({ message: "Bear not found" });
        }
      })
      .catch();
  } else {
    res.status(500).json({ error: "Please provide a bear name to update" });
  }
});

server.delete("/api/bears/:id", (req, res) => {
  db("bears")
    .where({ id: req.params.id })
    .del()
    .then(count => {
      if (count >= 1) {
        res.status(200).json({ count: `Bear has been deleted` });
      } else {
        res
          .status(404)
          .json({ error: "Bear with the specified ID could not be found" });
      }
    })
    .catch(err => {
      res.status(500).json({ error: "Something went wrong, Try Again" });
    });
});

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});

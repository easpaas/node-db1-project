const express = require("express");

// database access using knex
const db = require("../data/dbConfig.js");

const router = express.Router();

router.get("/", (req, res) => {
  db.select("*")
    .from("accounts")
    .then(accounts => {
      res.status(200).json({ data: accounts });
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ errorMessage: error.message });
    });
});

// router.get("/:id", (req, res) => {
//   db("accounts")
//     .where({ id: req.params.id })
//     .first()
//     .then(count => {
//       console.log(count);
//     })
//     .catch(error => {
//       console.log(error);
//       res.status(500).json({ errorMessage: error.message });
//     });
// });

router.post("/", (req, res) => {
  const post = req.body;

  isValidPost(post) ?
    db("accounts")
      .insert(post, "id")
      .then(ids => {
        console.log(ids)
        res.status(201).json({ data: ids })
      })
      .catch(error => {
        console.log(error)
        res.status(500).json({ errorMessage: error.message });
      })
  :
    res.status(400).json({ errorMessage: 'Please provide both name and budget to create an account.'})
    })

function isValidPost(post) {
  return Boolean(post.name && post.budget);
}

module.exports = router;

const express = 'express';
const router = require('express').Router();
// const router = express.Router();
const Actions = require('./actionModel.js'); // <<<<< updated path
// const Posts = require('../posts/postDb');

router.get('/', async (req, res) => {
    try {
        console.log("get request")
        const actions = await Actions.get(req.query.id);
        res.status(200).json(actions);
      } catch (error) {
        // log error to database
        console.log(error);
        res.status(500).json({
          message: 'Error retrieving the actions',
        });
      }
});

module.exports = router;
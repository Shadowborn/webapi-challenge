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

router.post('/', async (req, res) => {
    try {
        const actions = await Actions.insert(req.body);
        res.status(201).json(actions);
      } catch (error) {
        // log error to database
        console.log(error);
        res.status(500).json({
          message: 'Error adding the post',
        });
      }
});

router.put('/:id', async (req, res) => {
    try {
        const post = await Posts.update(req.params.id, req.body);
        if (post) {
              res.status(200).json(post);
        } else {
              res.status(404).json({ message: 'That post could not be found' });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Error updating the post' });
  }
});


router.delete('/:id', async (req, res) => {
    try {
        const id = await Actions.remove(req.params.id);
        res.status(200).json({
            url: `/actions/${req.params.id}`,
            operation: `DELETE for action with id ${req.params.id}`
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Error, cannot delete'
        })
    }
});

module.exports = router;
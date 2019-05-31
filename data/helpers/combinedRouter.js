const express = 'express';
const router = require('express').Router();
// const router = express.Router();
const Projects = require('./projectModel'); // <<<<< updated path





router.get('/:projectId', async (req, res) => {
    try {
        console.log("get request")
        const projectActions = await Projects.getProjectActions(req.params.projectId);
        res.status(200).json(projectActions);
      } catch (error) {
        // log error to database
        console.log(error);
        res.status(500).json({
          message: 'Error retrieving the projects',
        });
      }
});


module.exports = router;
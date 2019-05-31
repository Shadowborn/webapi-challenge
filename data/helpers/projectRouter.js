const express = 'express';
const router = require('express').Router();
// const router = express.Router();
const Projects = require('./projectModel'); // <<<<< updated path
// const Posts = require('../posts/postDb');



function validateBody(req, res, next) {
    if(req.body) {
        next()
    } else {
        res.status(400).json({message: 'Please provide data'});
    }
}

router.post('/', async (req, res) => {
    try {
        const projects = await Projects.insert(req.body);
        res.status(201).json(projects);
      } catch (error) {
        // log error to database
        console.log(error);
        res.status(500).json({
          message: 'Error adding the post',
        });
      }
});

// router.get('/', async (req, res) => {
//     try {
//         console.log("get request")
//         const projects = await Projects.get(req.query.id);
//         res.status(200).json(projects);
//       } catch (error) {
//         // log error to database
//         console.log(error);
//         res.status(500).json({
//           message: 'Error retrieving the projects',
//         });
//       }
// });

router.get('/', async (req, res) => {
    try {
        console.log("get request")
        const projects = await Projects.getProjectActions(req.query.projectId);
        res.status(200).json(projects);
      } catch (error) {
        // log error to database
        console.log(error);
        res.status(500).json({
          message: 'Error retrieving the projects',
        });
      }
});

// router.get('/:id/posts', validateUserId, validatePost, async (req, res) => {
//     try{
//         console.log('Get id posts')
//         const userPosts = await Users.getUserPosts(req.params.id)
//         if (userPosts) {
//             res.status(200).json(userPosts)
//         } else {
//             res.status(500).json({
//                 message: 'Error retrieving user post id'
//             })
//         }
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({
//             message: 'Error retrieving user post id'
//         })
//     }
// });

router.delete('/:id', async (req, res) => {
    try {
        const id = await Projects.remove(req.params.id);
        res.status(200).json({
            url: `/projects/${req.params.id}`,
            operation: `DELETE for project with id ${req.params.id}`
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Error, cannot delete'
        })
    }
});

router.put('/:id', async (req, res) => {
    try {
        const project = await Projects.update(req.params.id, req.body);
        if (project) {
              res.status(200).json(project);
        } else {
              res.status(404).json({ message: 'That project could not be found' });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Error updating the project' });
  }
});

//custom middleware

async function validateUserId(req, res, next) {
    const user = await Users.getById(req.params.id)
    if (user) {
        req.user = user
        next()
    } else {
        res.status(400).json({ messsage: "invalid user id"})
    }
};

function validateUser(req, res, next) {
    if(!req.body) {
        res.status(400).json({
            message: "missing user data"
        })
    } else if (!req.body.name) {
        res.status(400).json({
            message: "missing required name field"
        })
    } else {
        next()
    }
};

function validatePost(req, res, next) {
    if(!req.body) {
          res.status(400).json({ message: 'missing post data' })
    } else if (!req.body.text) {
          res.status(400).json({ message: 'missing required text field'})
    } else {
          next()
    }
};


module.exports = router;

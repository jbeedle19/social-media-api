const router = require('express').Router();
const { getAllThoughts,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought
} = require('../../controllers/thought-controller');



// /api/thoughts
router
    .route('/')
    .get(getAllThoughts);

// /api/thoughts/:userId
router
    .route('/:userId')
    .post(createThought);

// /api/thoughts/:thoughtId
router
    .route('/:thoughtId')
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThought);

// /api/thoughts/:thoughtId/reactions
//router
    //.route('/:thoughtId/reactions')
    // POST a reaction to a thought
    // DELETE a reaction from a thought

module.exports = router;
const router = require('express').Router();
// import router functions here
const { createThought } = require('../../controllers/thought-controller');

// routes here
// /api/thoughts
    // GET all thoughts
    // GET a single thought by ID
    // POST to create a new thought
    // PUT to update a single thought by ID
    // DELETE to remove a single thought by ID
router
    .route('/:userId')
    .post(createThought);


// /api/thoughts/:thoughtId/reactions
    // POST a reaction to a thought
    // DELETE a reaction from a thought

module.exports = router;
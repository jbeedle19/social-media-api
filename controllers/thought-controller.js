const { Thought, User } = require('../models');

const thoughtController = {
    // Get all thoughts
    getAllUsers(req, res) {
        User.find({})
            .select('-__v')
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },
    // Get a single thought by ID
    // Create a new thought - push thought's id to associated user's thoughts array
    createThought({ params, body }, res) {
        Thought.create(body)
            .then(({ _id }) => {
                return User.findOneAndUpdate(
                    { _id: params.userId },
                    { $push: { thoughts: _id } },
                    { new: true, runValidators: true }
                );
            })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this ID!' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.json(err));
    },
    // Update a thought by its ID
    // Delete a thought by its ID
    
    // Create a reaction stored in a single thought's array
    // Delete a reaction by the reactionId 
};

module.exports = thoughtController;
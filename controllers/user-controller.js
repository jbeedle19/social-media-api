const { User, Thought } = require('../models');

const userController = {
    // Get all Users
    getAllUsers(req, res) {
        User.find({})
            .select('-__v')
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },
    // Get one User by ID
    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
        .populate({
            path: 'thoughts',
            select: '-__v'
        })
        .populate({
            path: 'friends',
            select: ['-__v', '-email']
        })
        .select('-__v')
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this ID!' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },
    // Create a new User
    createUser({ body }, res) {
        User.create(body)
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.status(400).json(err));
    },
    // Update a User by ID
    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this ID!' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.status(400).json(err));
    },
    // Delete a User by ID
    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this ID!' });
                    return;
                }
                // User's thoughts will also be deleted when a user is deleted
                Thought.deleteMany({ _id: {$in: dbUserData.thoughts} })
                    .then(dbThoughtData => {
                        res.json(dbUserData);
                    })
            })
            .catch(err => res.status(400).json(err));
    },
    // Add a new friend to User's friend list with POST
    addFriend({ params, body }, res) {
        User.findOneAndUpdate(
            { _id: params.friendId },
            { $push: { friends: body } },
            { new: true, runValidators: true }
        )
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No User found with this ID!' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.json(err));
    },
    // Delete a friend from User's friend list
    deleteFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.friendId },
            { $pull: { friends: params.friendId } },
            { new: true }
        )
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No User found with this ID!' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.json(err));
    }
};

module.exports = userController;
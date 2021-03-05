const { Schema, model } = require('mongoose');
const moment = require('moment');

// Schema for the User model
const UserSchema = new Schema(
    {
        username: {
            type: String,
            required: 'Please include a username!',
            unique: true,
            trim: true
        },
        email: {
            type: String,
            required: 'Please include an email address!',
            match: [/.+\@.+\..+/, 'Please enter a valid email address!'],
            unique: true,
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought'
            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

// Get total count of friends
UserSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});

// Create the User model using the UserSchema
const User = model('User', UserSchema);

module.exports = User;
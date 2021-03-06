const { Schema, model, Types } = require('mongoose');
const moment = require('moment');

// Schema for the Thought model
const ThoughtSchema = new Schema(
    {
        username: {
            type: String,
            required: "A thought must have a User!"
        },
        thoughtText: {
            type: String,
            required: "Please enter a thought between 1 and 280 characters!",
            minLength: 1,
            maxLength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => moment(createdAtVal).format("dddd, MMMM Do YYYY, h:mm A")
        },
        reactions: [ReactionSchema]
    },
    {
        toJSON: {
            virtual: true,
            getters: true
        },
        id: false
    }
);

// Schema for reactions that will be a part of the thought model
const ReactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: "Please enter a reaction between 1 and 280 characters!",
            minLength: 1,
            maxLength: 280
        },
        username: {
            type: String,
            required: "A reaction must have a User!"
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => moment(createdAtVal).format("dddd, MMMM Do YYYY, h:mm A")
        }
    },
    {
        toJSON: {
            getters: true
        }
    }
);

// Virtual to get number of reactions on a thought
ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

// Create the Thought model using the ThoughtSchema
const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;
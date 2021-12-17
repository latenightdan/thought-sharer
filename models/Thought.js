// const { triggerAsyncId } = require('async_hooks');
const { Schema, model, Types } = require('mongoose');


const reactionSchema = new Schema({
reactionId: {
    type: Schema.Types.ObjectId,
    default: () => new Types.ObjectId()
},
reactionBody: {
    type: String,
    required: true,
    maxLength: 280
},
username: {
    type: String,
    required: true
},
createdAt: {
    type: Date,
    default: Date.now
     //add getter method
}
})

const thoughtSchema = new Schema({


    thoughtText: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 280
    },
    createdAt: {
        type: Date,
        default: Date.now
        //add getter method

    },
    username: {
        type: String,
        required: true
    },
    reactions: [reactionSchema]
}
)

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;
const {Schema, model, Types} = require('mongoose');

const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/.+@.+\..+/]
            //this might not work
        },
        thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        }
    ]
    }
)



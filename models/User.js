const { Schema, model } = require('mongoose');

// const friendSchema = new Schema(
//     {
//         friendId: {
//             type: Schema.Types.ObjectId,
//             default: () => new Types.ObjectId()
//         },
//         user: {
//             type: Schema.Types.ObjectId,
//             ref: "User"
//         }

//     }
// )


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
        ],
        friends: [
           {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
        ]



    }
)
userSchema.virtual('friendCount').get(function() {
    return this.friends.length;
})


const User = model('User', userSchema);

module.exports = User;
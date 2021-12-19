const {User} = require('../models')

const userController = {
    getAllUsers(req, res) {
        User.find({})
        .then(userData => res.json(userData))
        .catch(err => res.status(400).json(err))
    },
    getUserById({params}, res) {
        User.findOne({_id: params.id})
       .then(userData => {
           if(!userData){
               res.status(400).json({message: "he's dead"})
               return;
               //wrong id here crashes server. find out why?
           }
           res.json(userData)
       })
    },
    createUser({body}, res) {
        User.create(body)
        .then(newUser => res.json(newUser))
        .catch(err => res.status(400).json(err))
    },
    updateUser({params, body}, res) {
        User.findOneAndUpdate(
            {_id: params.id}, 
            body, 
            {new: true, runValidators: true})
        .then(updatedUser => {
            if(!updatedUser) {
                res.status(400).json({message: "looks like you're tryna contact the dead"})
                return;
            }
            res.json(updatedUser);
        })
        .catch(err => res.status(400).json(err));
    },
    addFreind({params, body}, res) {
        User.findOneAndUpdate({_id: params.id}, 
            {$push: { friends: params.friendIdd}}, 
            {new: true})
        .populate({path: 'friends', 
        select: ('-__v')})
        .select('-__v')
        .then(newFriend => {
            if (!newFriend) {
                res.status(404).json({message: 'not here, partner'});
                return;
            }
        res.json(newFriend);
        })
        .catch(err => res.json(err));
    },
    unfriend({params, body}, res){
        User.findOneAndUpdate({_id: params.id},
            {$pull: {friends: params.friendIdd}},
            {new:true})
            .then(newFriend => {
                if (!newFriend) {
                    res.status(404).json({message: 'not here, partner'});
                    return;
                }
            res.json(newFriend);
            })
            .catch(err => res.json(err));
    },
    deleteUser({params, body}, res){
        User.findOneAndDelete(
            {_id: params.id}
            )
        .then(murderedUser => {
            if(!murderedUser) {
                res.status(404).json({message: "He's already dead..."})
                return;
            }
            res.json(murderedUser)
        })
        .catch(err => res.json(400).json(err))
    }
};


module.exports = userController;
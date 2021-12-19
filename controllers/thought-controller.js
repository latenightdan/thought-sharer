const { Thought, User } = require('../models')

const thoughtMaker = {
    getThoughts(req, res) {
        Thought.find({})
            .then(thoughtData => res.json(thoughtData))
            .catch(err => res.status(400).json(err))
    },
    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.id })
            .then(thoughtData => {
                if (!thoughtData) {
                    res.status(400).json({ message: "no thoughts here" })
                }
                res.json(thoughtData)
            })
    },

    think({ params, body }, res) {
       
        Thought.create(body)
            .then(({ _id }) => {
                return User.findOneAndUpdate(
                    { _id: params.userId },
                    { $push: { thoughts: _id } },
                    //addToSet will do the same as push but prevent duplicates
                    { new: true, runValidators: true }
                );
            })
            .then(newThought => {
                if (!newThought) {
                    res.status(400).json({ message: "NO BRAIN HERE!" })
                    return;
                }
                res.json(newThought);
            })
            .catch(err => res.json(err));
    },

}

module.exports = thoughtMaker;
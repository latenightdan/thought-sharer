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
                    return;
                }
                res.json(thoughtData)
            })

    },

    think({ params, body }, res) {

        Thought.create(body)
            .then(({ _id }) => {
                return User.findOneAndUpdate(
                    //see if you can change this to reference username in json
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
    deleteThought({ params, body }, res) {
        Thought.findOneAndDelete(
            { _id: params.id }
        )
            .then(killThought => {
                if (!killThought) {
                    res.status(404).json({ message: "the thought disappeared" })
                    return;
                }
                res.json(killThought)
            })
            .catch(err => res.json(400).json(err))
    }
}

module.exports = thoughtMaker;
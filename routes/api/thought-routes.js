const router = require('express').Router();

const {
    getThoughts,
    getThoughtById,
    think,
    deleteThought,
    react,
    unReact
} = require('../../controllers/thought-controller')

router.route('/').get(getThoughts);

router.route('/:id').get(getThoughtById)
.delete(deleteThought);

router.route('/:userId').post(think);

router.route('/:thoughtId/reactions').put(react);

router.route('/:thoughtId/reactions/:reactionId').delete(unReact)

module.exports = router;
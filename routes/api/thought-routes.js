const router = require('express').Router();

const {
    getThoughts,
    getThoughtById,
    think,
    deleteThought
} = require('../../controllers/thought-controller')

router.route('/').get(getThoughts);

router.route('/:id').get(getThoughtById)
.delete(deleteThought);

router.route('/:userId').post(think);

module.exports = router;
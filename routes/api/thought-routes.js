const router = require('express').Router();

const {
    think
} = require('../../controllers/thought-controller')

router.route('/:userId').post(think);

module.exports = router;
const router = require('express').Router();

const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFreind,
    unfriend
} = require('../../controllers/user-controller')

router.route('/').post(createUser)
.get(getAllUsers);

router.route('/:id')
.get(getUserById)
.put(updateUser)
.delete(deleteUser)

router.route('/:id/friends/:friendIdd')
.post(addFreind)
.put(unfriend);


module.exports = router;
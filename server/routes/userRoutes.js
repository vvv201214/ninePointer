//Import the user controller

//Initialize the express router

//Example
router.route('/').get(userController.getUsers).post().patch().delete();

router.route('/:username').get(userController.getuser);

modeule.exports = router;

/**
 * Created by asafamir Vardi LTD. on 29/05/2017.
 */
var router = require('express').Router();
var controller = require('./UserController');
var auth = require('../../auth/auth');
var checkUser = [auth.decodeToken(), auth.getFreshUser()];

var checkCurrentEditorUser = [auth.decodeToken(),auth.getCurrentEditorUser()];


//router.param('id', controller.params);
router.get('/me', checkUser, controller.me);
router.post('/addNewUser' ,controller.addNewUser);
router.post('/deleteUser',checkCurrentEditorUser,controller.deleteUser);
router.post('/updateUser',checkCurrentEditorUser,controller.updateUser);
router.route('/getAllUsers',checkCurrentEditorUser, controller.getAllUsers);
router.route('/register', controller.register);


router.route('/:id')
    .get(controller.getOne)
    .put(checkUser, controller.put)
    .delete(checkUser, controller.delete)


module.exports = router;
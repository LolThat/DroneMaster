/**
 * Created by asafamir Vardi LTD. on 28/06/2017.
 */
var router = require('express').Router();
var controller = require('./EventController');
var auth = require('../../auth/auth');
var checkCurrentEditorUser = [auth.decodeToken(),auth.getCurrentEditorUser()];


router.post('/addNewItem' ,controller.addNewItem);
router.post('/deleteItem',checkCurrentEditorUser,controller.deleteItem);
router.post('/updateItem',checkCurrentEditorUser,controller.updateItem);
router.route('/getAllItems').post(checkCurrentEditorUser, controller.getAllItems);

module.exports = router;
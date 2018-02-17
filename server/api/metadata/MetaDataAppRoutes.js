/**
 * Created by asafamir Vardi LTD. on 29/05/2017.
 */
var router = require('express').Router();
var controller = require('./MetaDataAppController');
var auth = require('../../auth/auth');
var checkCurrentEditorUser = [auth.decodeToken(),auth.getCurrentEditorUser()];


router.post('/addNewItem',checkCurrentEditorUser ,controller.addNewItem);
router.post('/deleteItem',checkCurrentEditorUser,controller.deleteItem);
router.post('/updateItem',checkCurrentEditorUser,controller.updateItem);
router.route('/getAllItems').post(checkCurrentEditorUser, controller.getAllItems);

module.exports = router;
/**
 * Created by asafamir Vardi LTD. on 07/06/2017.
 */
var router = require('express').Router();
var controller = require('./noteController');
var auth = require('../../auth/auth');
var checkUser = [auth.decodeToken(), auth.getFreshUser()];

router.param('id', controller.params);


router.route('/')
    .get(controller.get)
    .post(controller.post)

router.route('/:id')
    .get(controller.getOne)
    .put(controller.put)
    .delete(controller.delete)


module.exports = router;
/**
 * Created by asafamir Vardi LTD. on 01/06/2017.
 */
module.exports = function (controller, router) {
    var auth = require('../../auth/auth');
    var checkUser = [auth.decodeToken(), auth.getFreshUser()];

    router.param('id', controller.params);
    router.get('/me', checkUser, controller.me);

    router.route('/')
        .get(controller.get)
        .post(controller.post)

    router.route('/:id')
        .get(controller.getOne)
        .put(controller.put)
        .delete(controller.delete)

};
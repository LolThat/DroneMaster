/**
 * Created by asafamir Vardi LTD. on 29/05/2017.
 */
module.exports = function(){
    return function (err, req, res, next) {
        console.log(err.message);
        res.status(500);
    }
};
/**
 * Created by asafamir Vardi LTD. on 29/05/2017.
 */
var router = require('express').Router();
//api will mount other routers
//for all our resources

router.use('/user', require('./user/userRoutes'));
router.use('/metadataapp',require('./metadata/MetaDataAppRoutes'));
router.use('/applications',require('./appliacation/applicationRoutes'));
router.use('/events',require('./event/eventRoutes'));
router.use('/notes',require('./note/noteRoutes'));
router.use('/categories', require('./category/categoryRoutes'));
router.use('/like', require('./likes/LikeRoutes'));
router.use('/wifi',require('./WIFI/WifiRoutes'));


module.exports = router;
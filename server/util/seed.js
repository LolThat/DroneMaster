/**
 * Created by asafamir Vardi LTD. on 01/06/2017.

var User = require('../api/user/userModel');
var Post = require('../api/post/postModel');
var Category = require('../api/category/categoryModel');
var _ = require('lodash');

console.log('Seeding Database');

var users = [
    {username:'x',password:'test'},
    {username:'y',password:'test'},
    {username:'z',password:'test'},

];

var categories = [
    {name:'c1'},
    {name:'c2'},
    {name:'c3'},
];

var posts = [
    {title:'t1'},
    {title:'t2'},
    {title:'t3'},
];

var createDoc = function (model, doc) {
    return new Promise(function (resolve, reject) {
        new model(doc).save(function (err, saved) {
            return err ? reject(err) : resolve(saved);
        });
    });
};

var cleanDB = function () {
    console.log("---------clean db-------------");
    var cleanPromises = [User, Categoty, Post]
        .map(function (model) {
            return model.remove().exec();
        });
    return Promise.all(cleanPromises);
}

var createUsers = function (data) {
    var promises = users.map(function (user) {
        return createDoc(User, user);
    });
    return Promise.all(promises)
        .then(function (users) {
            return _merge({users : users}, data || {} );
        });
};

var createCategories = function (date) {
    var promises = users.map(function (category) {
        return createDoc(Category, category);
    });
    return Promise.all(promises)
        .then(function (categories) {
            return _merge({categories : categories}, data || {} );
        });
};

var createUPosts = function (data) {
    var addCategory = function (post, category) {
        post.categories.push(category);
        return new Promise(function (resolve, reject) {
            post.save(function (err, saved) {
                return err ? reject(err) : resolve(saved);
            });
        });
    };
    var newPosts = posts.map(function (post, i)  {
        post.router = data.users[i]._id;
        return createDoc(Post,post);
    });

    return Promise.all(newPosts)
        .then(function (savedPosts) {
            return Promise.all(savedPosts.map(function (post, i) {
                return addCategory(post, data.categories[i])
            }));
        })
        .then(function () {
            return 'eeded db with 3 posts , 3 users , 3 categories ';
        });

};






var cleanDb = function () {
    var cleanPromises = [User, Categoty, Post]
        .map(function (model) {
            return model.remove().exec();
        });
};




cleanDB()
    .then(createUsers)
    .then(createCategories)
    .then(createPosts)

*/
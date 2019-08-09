const User = require('../models/user');

exports.getLogin = (req, res, next) => {    
    res.render('auth/login', {
        path: '/login',
        pageTitle: 'Login',
        isAuthenticated: false
    });   
};

exports.postLogin = (req, res, next) => {    
    User.findById('5d4b09ce1668a24a1b0d5415')
        .then(user => {
            req.session.isLoggedIn = true;
            req.session.user = user;
            res.redirect('/');
        })
        .catch(err => console.log(err));       
};

exports.postLogout = (req, res, next) => {    
    req.session.destroy(err => {
        console.log(err);
        res.redirect('/');
    });        
};
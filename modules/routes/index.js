var express = require('express');
var router = express.Router();
var path = require('path');
var bcrypt = require('bcrypt');
var bodyParser = require('body-parser');
var user = require('../user'); // add in user route

router.use(bodyParser.urlencoded({
    extended: true
}));
router.use(bodyParser.json());

router.get('/', function(req, res) {
    console.log('base url hit');
    res.sendFile(path.resolve('public/views/index.html'));
});
router.post('/', function(req, res) {
    user.findOne({
        username: req.body.username
    }, function(err, user) {
        if (err) {
            res.sendStatus(400);
        } else {
            if (user != undefined) {
                bcrypt.compare(req.body.password, user.password, function(err, isMatch) {
                    if (err) {
                        res.sendStatus(400);
                    } else {
                        if (isMatch) {
                            res.sendStatus(200);
                        } else {
                            res.sendStatus(418);
                        }
                    }
                });
            } else {
                res.sendStatus(400);
            }
        }
    });
});
module.exports = router;

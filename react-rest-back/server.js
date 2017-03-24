const express = require('express')
const app = express();
const request = require('request')
const PORT = process.env.PORT || 8080
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
// EXPRESS
app.listen(PORT, () => {
    console.log("Listening on Port:%s", PORT)
    console.log("Stop with Ctrl+C");
});
// express.static
app.use(express.static(__dirname + './../react-rest-front/build'));


// BODYPARSER
const bodyParser = require('body-parser')
app.use(bodyParser.json());

// MONGOOSE
const mongoose = require('mongoose');
const db = mongoose.connection;
const User = require('./userinformation/username');
const Groceries = require('./userinformation/grocerylist');
const authorize = require('./middleware/authorize');
mongoose.connect('mongodb://Baxter:Radiohead89@ds161099.mlab.com:61099/dinnerapp');
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log("Connected to db at /data/db/")
});
mongoose.Promise = global.Promise;

// CORS
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, authorization");
    res.header("Access-Control-Allow-Methods", "GET,POST,PULL,DELETE");
    next();
});


//Register User
app.post('/encrypt', (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    let email = req.body.email
    //generate salt and create a hash the password
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, (err, hash) => {
            // Store hash in your password DB. 
            if (err) {
                res.status(403)
                    .json({ err })
            }
            let newUser = User({
                username: username,
                password: hash,
                email: email,
            })
            newUser.save()
                .then(savedUser => {
                    res.send("usersaved")
                })
                .catch((err)=>{
                    res
                        .status(403)
                        .json(err)
                })
        });
    });
});
//Verify Login
app.post('/login', (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    User.find({ username })
        .then(user => {
            bcrypt.compare(password, user[0].password, (err, result) => {
                if (result) {
                    let token = jwt.sign({ username: username }, 'usernamekey');
                    res.json({ token: token, username: username });
                }
                else {
                    res
                        .status(403)
                        .json({ token: null })
                }
            })
        })
});
//get search results
app.get('/search/:value', (req, res) => {
    request('http://food2fork.com/api/search?key=a944d39557886c4dc048134bb926387f&q=' + req.params.value, (err, response, body) => {
        let search = JSON.parse(body)
        res.send(search)
    })
});
// get single recipe 
app.get('/recipe/:id', (req, res) => {
    request('http://food2fork.com/api/get?key=a944d39557886c4dc048134bb926387f&rId=' + req.params.id, (err, response, body) => {
        let recipe = JSON.parse(body)
        let newRecipe = recipe.recipe.ingredients.map((ingredients) => {
            return {
                ingredients: ingredients,
                need: false
            }
        })
        res.json({ newRecipe, recipe: recipe.recipe })
    })
});
// verify user is logged in
app.get('/verify', authorize, (req, res) => {
    res.send()
});
//write grocery list to database
app.post('/grocerylist/:username', (req, res) => {
    let newList = req.body;
    User.find({ username: req.params.username })
        .then(user => {
            user[0].grocerylist.push(Groceries(newList));
            user[0].save()
        })

        .then(savedUser => {
            res.json(savedUser)
        })
        .catch(err => {
            res.status(400)
                .json({ err })
        })
});
//get all grocery list.
app.get('/groceries/:username', (req, res) => {
    User.find({ username: req.params.username })
        .then(user => {
            let groceries = user[0].grocerylist
            res.json(groceries)
        })
        .catch(err => {
            res.status(400)
                .json({ err })
        })
})
// delete grocery list
app.delete('/groceries/:username/:recipe_id', (req, res) => {
    User.find({ username: req.params.username })
        .then(user => {
            let embRec = user[0].grocerylist.id(req.params.recipe_id)
            user[0].grocerylist.remove(embRec)
            let updateList = user[0].grocerylist
            user[0].save()
                .then(savedGroc => {
                    res.send(savedGroc)
                })
        })
        .catch(err => {
            res.status(400)
                .json({ err })
        })
})

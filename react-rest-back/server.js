const express = require('express')
const app = express();
const request = require('request')
const PORT = process.env.PORT || 8080
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
// EXPRESS
app.listen(PORT,() => {
	console.log("Listening on Port:%s",PORT)
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
    // console.log('postrequest')
    let username = req.body.username;
    let password = req.body.password;
    let email = req.body.email
    //generate salt and create a hash the password
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, (err, hash) => {
            // Store hash in your password DB. 
            if (err){
                res.status(403)
                    .json({err})
            }
            let newUser = User({
                username: username,
                password: hash,
                email: email,
            })
            // console.log(hash)
            newUser.save()
                .then(savedUser => {
                    res.json(savedUser)
                })
        });
    });
});
//Verify Login
app.post('/login', (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    // console.log("here")
    // console.log(username)
    User.find({ username })
        .then(user => {
            // console.log(user)
            // console.log(password)
            // console.log(user[0].password)
            bcrypt.compare(password, user[0].password, (err, result) => {
                // console.log(result)
              
                if (result) {
                    let token = jwt.sign({ username: username }, 'usernamekey');
                    res.json({ token: token, username: username });
                    // console.log(token)
                    // console.log('through login')
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
        // console.log(req.params.value)  
        let search = JSON.parse(body)
        res.send(search)
        // console.log(search)
    })
});
// get single recipe 
app.get('/recipe/:id', (req, res) => {
    request('http://food2fork.com/api/get?key=a944d39557886c4dc048134bb926387f&rId=' + req.params.id, (err, response, body) => {
        let recipe = JSON.parse(body)
        // console.log(recipe)
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
    // console.log('through middleware')
    res.send()
});
//write grocery list to database
app.post('/grocerylist/:username', (req, res) => {
    let newList = req.body;
    console.log(newList)
    User.find({ username: req.params.username })
        .then(user => {
            // console.log(user)
            user[0].grocerylist.push(Groceries(newList));
            user[0].save()
        })

        .then(savedUser => {
            res.json(savedUser)
        })
        .catch(err => {
            console.log(err)
            res.status(400)
                .json({ err })
        })

});
//get all grocery list.
app.get('/groceries/:username', (req, res) => {
    User.find({ username: req.params.username })
        .then(user => {
            // console.log(user)
            // console.log(user[0].grocerylist)
            let groceries = user[0].grocerylist
            // console.log(groceries)
            res.json(groceries)
        })
        .catch(err => {
            console.log(err)
            res.status(400)
                .json({ err })
        })
})

// delete grocery list
app.delete('/groceries/:username/:recipe_id', (req, res) => {
    User.find({ username: req.params.username })
        .then(user => {
            // console.log(user)
            // console.log(user[0].grocerylist)          
            let embRec = user[0].grocerylist.id(req.params.recipe_id)
            //   console.log(embRec)   
            user[0].grocerylist.remove(embRec)
            // console.log(user[0].grocerylist)
                let updateList = user[0].grocerylist             
                user[0].save()
                .then(savedGroc => {
                    // console.log(savedGroc)
                    res.send(savedGroc)
                })
        })
        .catch(err => {
            console.log(err)
            res.status(400)
                .json({ err })
        })
})

const express = require('express')
const app = express(); 
const PORT = process.env.PORT || 8080
const cors = require('cors')
const jwt = require('jsonwebtoken')
const models = require('./models')
const bcrypt = require('bcrypt')
const session = require('express-session')
const authentication = require('./middlewares/authentication')
const SALT_ROUNDS = 10

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors({credentials: true, origin: true}))
app.use(
    session({
        secret: 'SEEEECRET',
        resave: false,
        saveUninitialized: true
    })
);

app.post('/register', (req, res) => {
    console.log("Registering user...")
    let username = req.body.username
    let password = req.body.password

    models.User.findOne({
        where: {
            username: username
        }
    }).then(user => {
        if (user) { 
            res.status(500).json({message: "Username already exists"})
        }

        else {
            bcrypt.hash(password, SALT_ROUNDS)
            .then(hash => {
                models.User.create({
                    username: username,
                    password: hash
                })
            })
        }
    })
})

app.post('/login', (req, res) => {
    console.log('Logging in user...')
    let username = req.body.username
    let password = req.body.password

    models.User.findOne({
        where: {
            username: username
        }
    }).then(user => {
        if (user) {
            bcrypt.compare(password, user.password)
            .then((passwordMatch) => {
                // req.session.userId = user.id
                // req.session.save()
                // console.log(req.session)
                if (passwordMatch) {
                    console.log(user.id)
                    let payload = {userId: user.id, username: user.username}
                    const token = jwt.sign(payload, 'SOMESECRETKEY')
                    res.json({isAuthenticated: true, token: token})
                }
                else {
                    res.json({isAuthenticated: false})
                }
            })
        }
        else {
            res.json({isAuthenticated: false})
        }
    })
})

app.post('/updateNote', (req, res) => {
    let noteId = req.body.noteId
    let title = req.body.title
    let body = req.body.body

    models.Note.update({
        title: title,
        body: body
    }, {
        where: {
            id: noteId
        }
    }).then((updatedNote) => {
        res.status(200).send("Update success")
    })
})

app.post('/addNote', authentication, (req, res) => {
    console.log(req.session.userId)
    let title = req.body.title
    let body = req.body.body
    
    models.Note.create({
        title: title,
        body: body,
        userId: req.session.userId
    }).then((newNote) => {
        res.json({newNote: newNote.dataValues})
    }
    )
})

app.post('/deleteNote', (req, res) => {
    console.log("Deleting note")
    let noteId = req.body.noteId
    models.Note.destroy({
        where: {
            id: noteId
        }
    })
})

app.get('/get-notes', (req, res) => {
        console.log(req.session.userId)
        // Find only by userId later
        models.Note.findAll({
            where: {
                userId: 1
            }
        })
        .then(note => {
            res.json({
                notes: note
            })
        })
    }
)

app.listen(PORT, () => {
    console.log("Server is listening...")
})
const functions = require('firebase-functions');
const admin = require('firebase-admin')
const express = require('express')
const bodyParser = require('body-parser')
const { region } = require('firebase-functions');
const { response } = require('express');

admin.initializeApp()

async function getFacts() {

    var ref
    try {
        ref = await admin.firestore().collection('members').get()
    } catch (error) {
        functions.logger.error(`There was an error: ${error}`)
        return
    }
    var docs = ref.docs.map(doc => doc.data())

    return docs
}

const app = express()
app.set('views', './views')
app.set('view engine', 'ejs')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

//Create Auth Middleware
function isAuthenticated(request, response, next) {

}

app.get('/', async (request, response) => {
    // const facts = await getFacts()
    // // console.log(facts)
    // response.render('index', { data: facts })
    response.render('index')
})

app.get('/homecomingQueen', isAuthenticated, (request, response) => {
    response.render('homecomingQueen')
})

app.post('/', async (request, response) => {
    const breakfast = request.body.breakfast
    console.log(breakfast)
    response.render('results', { data: breakfast })
})

exports.app = functions.https.onRequest(app)

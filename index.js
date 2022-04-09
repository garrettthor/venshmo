const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const User = require('./models/user');
const Transaction = require('./models/transaction');
const { ppid } = require('process');


mongoose.connect('mongodb://localhost:27017/venshmo', {
    useNewUrlParser: true,
    // useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected.")
})

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));



// 'Home' route.  Right now it displays a list of all the users, but it should eventually show a feed of public transactions
app.get('/', async(req, res) => {
    // const users = await User.find({});
    const transactions = await Transaction.find({});
    // console.log(transactions)
    res.render('home', { transactions });
});

// Route to the 'New Transaction' page with form.  Loads the users for option selection in form.
app.get('/transaction/new', async(req, res) => {
    const users = await User.find({});
    res.render('transaction/new', { users });
});

app.post('/transaction', async(req, res) => {
    const transaction = new Transaction(req.body.transaction);

    // Just testing to see if the JSON object is sent out with all pertinent data
    // res.send(req.body.transaction)
    
    await transaction.save();
    res.redirect('/')
});

app.get('/users/new', (req,res)=>{
    res.render('users/new')
});

app.post('/users', async(req, res) => {
    const user = new User(req.body.user);
    await user.save();
    res.redirect(`/users/${user._id}`)
});

app.get('/users/:id/edit', async(req, res) =>{
    res.render('users/edit')
});

app.get('/users/:id', async(req,res) => {
    const user = await User.findById(req.params.id);
    res.render('users/show', { user })
    
});

app.listen(1984, () => { 
    console.log ('Serving on Port 1984')
});
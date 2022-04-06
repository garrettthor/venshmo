// Run $node seed.js at the terminal to erase and repopulate 100 users into the db users.

const mongoose = require('mongoose');
const User = require('./models/user');
const faker = require('faker');

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

const seedDB = async () => {
    await User.deleteMany({});
    console.log('database for Users deleted.')
    for(let i = 0; i < 100; i++){
        console.log(i)
        let first = faker.name.firstName();
        let last = faker.name.lastName();
        let userN = faker.internet.userName();
        let bal = faker.finance.amount();

        console.log(`new user created: ${first} ${last}.  ${userN}.  bal: $${bal}.`)

        const user = new User({ firstName: first, lastName: last, userName: userN, balance: bal});
        await user.save();
    }
}

seedDB();
require('dotenv').config();
const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const routes = require('./controllers');
const helpers = require('./utils/helpers');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const sequelize = require('./config/connection')


const sess = {
    secret: process.env.SESSION_SECRET,
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

const app = express();
const PORT = process.env.PORT || 3000;

app.use(session(sess));

const hbs = exphbs.create({ helpers,extname: 'hbs' });

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    res.locals.loggedIn = req.session.logged_in;
    res.locals.user_id = req.session.user_id;
    next();
});


app.use(routes);

sequelize.sync().then(() => {
    console.log('Database connected');
}).catch(err => {
    console.error('Unable to sync database:', err);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
const router = require('express').Router();
const { User } = require('../../models');


// CREATE a new user
router.post('/', async (req, res) => {
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.username = userData.username;
        req.session.logged_in = true;
    
        res.status(200).json({message: 'You are now logged in!'});
        }
    );
    } catch (err) {
        res.status(400).json({message: 'Failed to sign up'});
    }
}) 


// LOGIN a user
router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({ where: { username: req.body.username } });
    
        if (!userData) {
            res.status(400).json({ message: 'Incorrect username or password, please try again' });
            return;
        }
    
        const validPassword = await userData.checkPassword(req.body.password);
    
        if (!validPassword) {
            res.status(400).json({ message: 'Incorrect username or password, please try again' });
            return;
        }
    
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.username = userData.username;
            req.session.logged_in = true;
    
            res.json({ user: userData, message: 'You are now logged in!' });
        });
    
    } catch (err) {
        res.status(400).json({ message: 'Failed to log in' });
    }
});


// LOGOUT a user
router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});


module.exports = router;
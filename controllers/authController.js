const User = require('../models/user');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.handle_login = asyncHandler(async(req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const foundUser = await User.findOne({ username: username }).exec();
    if(!foundUser) {
        return res.sendStatus(401);
    }
    const passwordMatch = await bcrypt.compare(password, foundUser.password);
    if (passwordMatch) {
        const accessToken = jwt.sign({ user: foundUser }, process.env.JWT_SECRET_KEY);
        res.cookie('jwt', accessToken, {httpOnly: true});
        res.json({ token: accessToken })
    }
});

exports.handle_sign_up = asyncHandler(async(req, res) => {
    const userExists = await User.findOne({ username: req.body.username });
    if(userExists) {
        return res.sendStatus(409)
    }
    
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const user = new User({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        username: req.body.username,
        password: hashedPassword
    });

    await user.save();
    res.status(201).json({ 'message': 'New User Created' })
})

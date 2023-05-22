const jwt = require('jsonwebtoken');

exports.verifyJWT = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) return res.sendStatus(401);
    const token = authHeader.split(' ')[1];
    jwt.verify(token, proccess.env.JWT_SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.sendStatus(403);
        }
        req.currentUser = decoded.user;
        next();
    })
}
const jwt = require('jsonwebtoken');

const isAuth = (req, res, next) => {
    try {
        const { authorization } = req.headers;
        jwt.verify(authorization, process.env.JWT_SECRET_KEY, (err, result) => {
            if (err || !result) return res.status(404).send('unauthorized')
            if (result && result.hasOwnProperty('id')) next();
        })
    } catch (e) {
        throw res.status(404).send('unauthorized');
    }

}

module.exports = isAuth;
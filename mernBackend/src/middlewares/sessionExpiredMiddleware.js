function sessionExpired(req, res, next) {
    if (req.session && !req.session.user) {
        // Session expired, redirect to error page
        res.status(404).send('Session expired');
    } else {
        // Session still active, proceed to the next middleware
        next();
    }
}

module.exports = sessionExpired;
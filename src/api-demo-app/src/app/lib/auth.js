// lib/auth.js
const ensureAuthenticated = (handler) => {
    return (req, res) => {
        if (req.isAuthenticated()) {
            return handler(req, res);
        } else {
            res.status(401).json({ message: 'Unauthorized' });
        }
    };
};

module.exports = ensureAuthenticated;

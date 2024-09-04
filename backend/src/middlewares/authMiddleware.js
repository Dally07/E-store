const jwt = require('jsonwebtoken');

const secretKey = process.env.JWT_SECRET || 'secret';

exports.authMiddleware = (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '');
    
    if (!token) return res.status(401).json({ message: 'Accès non autorisé' });

    try {
        const decoded = jwt.verify(token, secretKey);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Token invalide' });
    }
};

exports.requireRole = (role) => {
    return (req, res, next) => {
        console.log("Rôle requis:", role);
        console.log("Rôle de l'utilisateur:", req.user.role);
        if (req.user.role !== role) {
            return res.status(403).json({ message: 'Accès interdit' });
        }
        next();
    };
};
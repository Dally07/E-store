const jwt = require('jsonwebtoken');


const secretKey = process.env.JWT_SECRET || 'secret';

// verification token
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

// identification du role d'un utilisateur
exports.requireRole = (...roles) => {
    return (req, res, next) => {
        console.log("Rôle requis:", roles);
        console.log("Rôle de l'utilisateur:", req.user.role);
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: 'Accès interdit' });
        }
        next();
    };
};


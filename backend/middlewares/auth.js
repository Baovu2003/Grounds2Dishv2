const User = require('../model/user.model.js');

// Middleware xác thực token
const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        status: 'error',
        message: 'Access token is required'
      });
    }
    
    const token = authHeader.substring(7); // Remove 'Bearer ' prefix
    
    // Tìm user trong database
    const user = await User.findOne({ token: token });
    if (!user || !user.isActive) {
      return res.status(401).json({
        status: 'error',
        message: 'User not found or inactive'
      });
    }
    
    // Attach user info to request
    req.user = user.toSafeObject();
    next();
    
  } catch (error) {
    return res.status(401).json({
      status: 'error',
      message: error.message || 'Invalid token'
    });
  }
};

// Middleware kiểm tra role admin
const requireAdmin = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      status: 'error',
      message: 'Authentication required'
    });
  }
  
  if (req.user.role !== 'admin') {
    return res.status(403).json({
      status: 'error',
      message: 'Admin access required'
    });
  }
  
  next();
};

module.exports = { 
  authenticate, 
  requireAdmin,
};
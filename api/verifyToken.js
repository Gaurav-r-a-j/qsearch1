import jwt from 'jsonwebtoken';

// Verify the token in the request headers
const verifyToken = (req, res, next) => {
  // console.log("req.body",req.body)
  // Get the token from the request headers
  const authorizationHeader = req.headers.authorization;
  if (!authorizationHeader) {
    return res.status(401).json({ error: 'No token provided' });
  }

  // Extract the token from the "Authorization Bearer" format
  const token = authorizationHeader.split(' ')[1];

  // Verify the token using the secret key
  jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
    // If the token is invalid, return an error
    if (error) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    // Set the decoded data on the request object
    req.user = decoded;
    req.user.role = decoded.role;
    // console.log(req.user.role)
    // console.log(req.user)

    // Call the next middleware function
    next();
  });
};

export default verifyToken;





// // middleware function to verify admin role
// const verifyAdmin = (req, res, next) => {
//   if (req.user.role !== 'admin') {
//     return res.status(401).send({ message: 'Unauthorized' });
//   }
//   next();
// };

// // middleware function to verify user role
// const verifyUser = (req, res, next) => {
//   if (req.user.role !== 'user') {
//     return res.status(401).send({ message: 'Unauthorized' });
//   }
//   next();
// };
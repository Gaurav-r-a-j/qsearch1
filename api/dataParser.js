const formDataParser = (req, res, next) => {
    let body = '';
  
    // Collect the request body data
    req.on('data', (chunk) => {
      body += chunk;
    });
  
    // Parse the request body data
    req.on('end', () => {
      // Split the request body into an array of key-value pairs
      const pairs = body.split('&');
      // Initialize the request body object
      req.body = {};
      // Iterate over the array of pairs
      pairs.forEach((pair) => {
        // Split each pair into a key and a value
        const [key, value] = pair.split('=');
        // Decode the key and value
        req.body[decodeURIComponent(key)] = decodeURIComponent(value);
      });
      // Call the next middleware or route handler
      next();
    });
  };
  
  export default formDataParser
  
  
export const clientMiddleware = (req, res, next) => {
    // Check if the session contains client data
    if (req.session.client) {
      req.client = req.session.client;
    } else {
      req.client = null;
    }
    next();
  };
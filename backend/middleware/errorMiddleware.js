export const errorhandler = (err, req, res, next) => {
  res.send(err.message);
};

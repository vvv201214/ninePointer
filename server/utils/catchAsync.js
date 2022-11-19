//Catching async errors and returning them to the global errror handling middleware

//Uncomment the code below

/*
module.exports = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch((err) => next(err));
  };
};
 */

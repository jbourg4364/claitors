const express = require("express");
const router = express.Router();

router.use((req, res, next) => {
    if (req.user) {
      console.log("User is set: ", req.user);
    }
    next();
  });
  
  
  //Health
  router.get('/health', async (req, res, next) => {
      res.send({
          message: 'Server is healthy',
          status: 200
      });
  });

//Router: /api/books
const booksRouter = require('./books');
router.use('/books', booksRouter);

const contentRouter = require('./content');
router.use('/content', contentRouter);

const loginRouter = require('./login');
router.use('/login', loginRouter);


  router.use("/", (req, res, next) =>{
    res.status(404);
    res.send(
      next({
        message: "Page Not Found",
        name: "Page Not Found",
        error: "Page Not Found",
      })
    )
  });
  
  //Error Handler
  router.use((error, req, res, next) => {
    res.send({
      message: error.message,
      name: error.name,
      error: error.error,
    });
  });
  
  
  module.exports = router;
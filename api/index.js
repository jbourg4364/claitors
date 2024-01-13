const express = require("express");
const router = express.Router();
const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/tphotos/');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });
router.use(express.static('public'));
router.use((req, res, next) => {
    if (req.user) {
      console.log("User is set: ", req.user);
    }
    next();
  });

 router.post('/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    res.json({ message: 'File uploaded successfully', filename: req.file.filename });
  });

  router.post('/upload/multiple', upload.array('files', 300), (req, res) => {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: 'No files uploaded' });
    }
  
    const filenames = req.files.map(file => file.filename);
    res.json({ message: 'Files uploaded successfully', filenames });
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
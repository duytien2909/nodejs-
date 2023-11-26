const express = require("express");
const router = express.Router();
const movieController = require('../controller/movieController')

const multer = require("multer");


const storage = multer.diskStorage({
    destination: (req, file, res) => {
      res(null, "./upload");
    },
    filename: (req, file, res) => {
      res(null, file.originalname);
    },
  });
  
  const upload = multer({ storage: storage });

router.get('/',movieController.homepage)
router.get('/FAV/',movieController.movieManager)
router.get('/FAV/add',movieController.addMovie)
router.post('/FAV/add',upload.single("image"),movieController.postAddMovie);
router.get('/FAV/view/:id',movieController.viewMovie)
router.get('/FAV/edit/:id',movieController.editMovie)
router.post('/FAV/edit/:id',upload.single("image"),movieController.editPutMovie);
router.delete('/FAV/edit/:id',movieController.deleteMovie);


module.exports = router;
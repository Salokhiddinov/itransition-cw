const multer = require("multer");
const Image = require("../models/image");

const Storage = multer.diskStorage({
  destination: "upload",
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: Storage }).single("image");

class imageController {
  async uploadImage(req, res) {
     upload(req, res, async(err) => {
      if (err) {
        console.log(err);
      } else {
        const newImage = new Image({
            name: req.body.name,
            image: {
                data: req.file.filename,
                contentType: "image/png" || "image/jpeg"||"image/jpg" || "image/gif",
            }
        })
        await newImage.save()
        .then(() => {
            res.send("Image uploaded");
        })
      }
    });
  }
  async getAllImages(req,res){
    try{
        const result = await Image.find();
        res.status(202).json(result);
    }
    catch(err){
        console.log(err)
    }
    
  }
}

module.exports = new imageController();

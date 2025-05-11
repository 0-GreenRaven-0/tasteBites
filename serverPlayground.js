const express = require("express")
const multer = require("multer")
const fs = require("fs")
const cors = require("cors")
const crypto = require("crypto")

const app = express()
const upload = multer({
    fileFilter: (req, file, cb) => {
      // Allow only JPEG or PNG images
      if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
        cb(null, true); // Accept the file
      } else {
        cb(new Error("Invalid file type"), false); // Reject the file
      }
    },
    limits: {
        fileSize: 1024 * 1024 * 5, // 5MB
    }
  });

app.use(cors())

const uploadDir = "uploads"

if(!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir)
}

app.post("/upload", upload.single("file"), (req, res) => {
    const file = req.file
    
    if(!file){
        return res.status(400).send({status: "error", message: "no file uploaded"})
    }

    const filePath = `${uploadDir}/${crypto.randomUUID()}-${file.originalname}`;
    try{
      fs.writeFileSync(filePath, file.buffer)
      res.send({status: "success", message: "File uploaded successfully!"})
    }catch(error){
        res.status(500).send({status: "error", message: "Failed to save the file :("})
    }
});

app.listen(3100)

console.log("side server is running...")
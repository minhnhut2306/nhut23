const express = require('express');
const router = express.Router();
const cloudinary = require('./config');
const multer = require('multer');
const path = require('path');
const Image = require('./Image'); 

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'D:/tmp/');
    },

    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

router.post('/upload', upload.single('image'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }
        const result = await cloudinary.uploader.upload(req.file.path);
        const newImage = new Image({
            secure_url: result.secure_url,
            public_id: result.public_id, 
        });

        await newImage.save(); 
        res.json({
            secure_url: result.secure_url,
            public_id: result.public_id, 
            message: 'Image uploaded and saved to MongoDB successfully!',
        });
    } catch (error) {
        console.error('Error uploading image:', error);
        res.status(500).json({ message: 'Error uploading image', error });
    }
});

router.get('/images', async (req, res) => {
    try {
        const images = await Image.find();
        res.json(images);
    } catch (error) {
        console.error('Error fetching images:', error);
        res.status(500).json({ message: 'Error fetching images', error });
    }
});


module.exports = router;

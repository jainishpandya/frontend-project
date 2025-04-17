import multer from 'multer';

const storage = multer.diskStorage({
    filename: function(req, file, cb) {
        cb(null, file.originalname + Date.now());
    }
});

const upload  = multer({storage: storage, limits:{ fileSize: 5000000 }});

export default upload;

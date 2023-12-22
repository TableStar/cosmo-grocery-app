import multer from 'multer';
import fs from 'fs';

const uploader = (dir) => {
    const defaultdir = './src/assets';

    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            const path = dir ? defaultdir + dir : defaultdir;

            if (fs.existsSync(path)) {
                cb(null, path);
            } else {
                fs.mkdirSync(path, (err) => {
                    if (err) {
                        // console.log("error creating directory", err);
                        cb(err);
                    } else {
                        cb(null, path);
                    }
                });
            }
        },
        filename: (req, file, cb) => {
            cb(null, `${Date.now()}-${file.originalname}`);
        }
    })

    const fileFilter = (req, file, cb) => {
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/gif' || file.mimetype === 'image/jpg') {
            cb(null, true);
        } else {
            cb(Error('Your file extension is denied, please upload jpg, jpeg, png, or gif file.'), false);
        }
    };

    return multer({ storage, fileFilter });
};

export default uploader;
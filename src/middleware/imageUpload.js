import multer from "multer"

const storage = multer.diskStorage({
    destination: function (request, file, callback) {
        callback(null, 'uploads/');
    },
    filename: function (request, file, callback) {
        let ext = file.originalname.split('.');
        callback(null, Date.now() + file.originalname);
    }
});

// Create multer instance
//const upload = multer({ storage: storage }).single('image');

let upload = multer({ storage: storage, 
    fileFilter: function(req, file, callback){
        if(
            file.mimetype == "image/png" ||
            file.mimetype == "image/jpg" ||
            file.mimetype == "image/JPG" ||
            file.mimetype == "image/JPEG" ||
            file.mimetype == "image/jpeg" ||
            file.mimetype == "image/PNG" ||
            file.mimetype == "image/svg" 
        ){
            callback(null,true)
        }else
        console.log('only image file support')
        callback(null, false)
    },
    limits: {
        fileSize: 1024*1024*2
    }
 })

 //module.export = upload



// Create Sequelize middleware
/*async function Uploads(req, res, next) {
    upload(req, res, async (err) => {
        if (err) {
           return res.status(400).send(err);
        } else {
            if (req.file) {
                if (
                    !req.file.originalname.match(/\.(pdf|jpg|JPG|jpeg|JPEG|png|PNG|svg)$/)
                ) {
                   return res.status(400).send({
                        status: 400,
                        message: "Only allowd pdf|jpg|JPG|jpeg|JPEG|png|PNG|svg",
                    });
                } else {
                    var path = req.file.filename;
                    // path = `${frontEndUrl}/images/${path}`;
                    req.fileurl = path;
                    next();
                }
            } else {
                req.fileurl = "";
                next();
            }
        }
    });
};*/
export default upload
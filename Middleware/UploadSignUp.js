  
const multer = require('multer');
const path = require('path');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './Client/public/UsersInformation');
    },
    filename: function (req, file, cb) {
        cb(null,"file-" + Date.now()+path.extname(file.originalname));
    },
});

var upload = multer({ storage })

module.exports = upload;
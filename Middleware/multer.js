  
const multer = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './Client/public/uploads');
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}.jpg`);
    },
});

var upload = multer({ storage });

module.exports = upload;
//set up multer
const multer = require('multer');

const Storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => {
        cb(null, Date.now()+'-'+file.fieldname);
    }
})

const upload = multer({
    storage: Storage
})

module.exports = upload
const multer = require('multer');

const upload = multer({
  dest: 'uploads/'
});
// Create a storage object for Multer to use. This specifies where uploaded files will be stored on your server:
function generateStorageConfig(storagePath = "uploads") {

  return multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, `resources/${storagePath}/`)
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, uniqueSuffix + '.' + file.mimetype.split('/')[1])
      // cb(null, file.originalname)
    }
  });
}
// Create a Multer middleware instance and pass in the storage object you just created:
// const uploadPic = multer({ storage: storage });

function uploadSinglePic(req, res, path) {
  try {
    // Use the 'upload' middleware to handle the file upload. The 'file' key should match the name attribute of the input field in the form:
    const uploadPic = multer({ storage: generateStorageConfig('orders') });
    return new Promise((resolve, reject) => {
      uploadPic.single('file')(req, res, function (err) {
        if (!req.file) {
          resolve({
            status: 'failed',
            error: "Please upload a picture"
          });
          return;
        }
        if (err instanceof multer.MulterError) {
          // A Multer error occurred when uploading.
          console.log('error', err)
          resolve({
            status: 500,
            error: err.message
          })
        } else if (err) {
          // An unknown error occurred when uploading.
          console.log('eror', err);
          resolve({
            status: 'failed',
            error: err.message
          })
        } else {
          // const filePath = req.file.path;
          // console.log('errrrror', req.file)
          resolve({
            status: 'success',
            data: req.file
          })
        }
      });
    })
  } catch (err) {
    return {
      status: 500,
      error: err.message
    }
  }
}

function isValidUserId(id) {
  // Check if the ID is a non-empty string
  if (typeof id !== 'string') {
    console.log('id===', id)
    return false;
  }

  // Check if the ID is a 24-character hexadecimal string (MongoDB ObjectID)
  const regex = /^[0-9a-fA-F]{24}$/;
  if (!regex.test(id)) {
    return false;
  }

  // If we've made it this far, the ID is valid
  return true;
}

module.exports = {
  uploadSinglePic,
  isValidUserId
}
 
import multer from "multer";
// import path from "path"; // Extension nikalne ke liye built-in module



const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images")
  },

  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.originalname)
  }
})

export const upload = multer({ 
    storage: storage,
    limits: {
        fileSize: 1 * 1000 * 1000// 1MB limit
    },
})
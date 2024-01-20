// controller for UPLOADING FILES
import multer, { diskStorage } from "multer";

// process.cwd() is the absolute link of the BE source C:\Users\Bao\Desktop\Cybersoft\Back End\Day 6\youtube app\node38_youtube_BE>

const storage = multer({
  storage: diskStorage({
    // define the location to save file
    destination: process.cwd() + "/public/img",
    // name the file
    filename: (req, file, callback) => {
      callback(null, new Date().getTime() + `_${file.originalname}`);
    },
  }),
});

export default storage;

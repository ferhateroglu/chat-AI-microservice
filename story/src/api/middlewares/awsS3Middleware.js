const { S3Client } = require("@aws-sdk/client-s3");
const multer = require("multer");
const multerS3 = require("multer-s3");
const aws = require("aws-sdk");

const {
  ACCESS_KEY_ID,
  SECRET_ACCESS_KEY,
  REGION,
  BUCKET_NAME,
} = require("../../config");

aws.config.update({
  accessKeyId: ACCESS_KEY_ID,
  secretAccessKey: SECRET_ACCESS_KEY,
  region: REGION
});

const s3 = new aws.S3();
let fileName = "";

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: BUCKET_NAME,
    key: function (req, file, cb) {
      fileName = Date.now().toString() +"-"+file.originalname;//for unique file name
      cb(null, fileName);     
    },
  }),
});

module.exports.uploadS3 = (file) => {
  return upload.single(file);
};

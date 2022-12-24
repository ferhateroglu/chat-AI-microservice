const { S3Client } = require("@aws-sdk/client-s3");
const multer = require("multer");
const multerS3 = require("multer-s3");
const aws = require("aws-sdk");

const {
  ACCESS_KEY_ID,
  SECRET_ACCESS_KEY,
  REGION,
  BUCKET_NAME,
} = require("../config");

aws.config.update({
  accessKeyId: ACCESS_KEY_ID,
  secretAccessKey: SECRET_ACCESS_KEY,
  region: REGION
});

module.exports.s3 = new aws.S3();




module.exports.uploadS3 = (file) => {
  return upload.single(file);
};

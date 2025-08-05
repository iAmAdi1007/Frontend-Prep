const { S3Client, GetObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

/* Here we are creating a nodejs user whom we are not giving any access as such because this is going to be a programmatic user, we are using the access key and secret key for the same nodejs user here
 */

/* Now this S3 Client is going to make all the API calls on behalf of nodejs user */
const s3Client = new S3Client({
  region: "ap-south-1",
  credentials: {
    accessKeyId: "AKIASAL3RCD24H3E735M",
    secretAccessKey: "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",
  },
});

async function getObjectURL(key) {
  const command = new GetObjectCommand({
    Bucket: "iamadi-bucket",
    Key: key,
  });
  const url = await getSignedUrl(s3Client, command);
  return url;
}

getObjectURL("IMG_7418.JPG").then(data => console.log("URL for the image:", data));

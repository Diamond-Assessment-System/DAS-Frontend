// import AWS from 'aws-sdk';

// // AWS.config.update({
// //   accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
// //   secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
// //   region: process.env.REACT_APP_AWS_REGION
// // });

// AWS.config.update({
//   accessKeyId: 'AKIATCKATES2JQM6KTEY',
//   secretAccessKey: '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',
//   region: 'ap-southeast-2'
// });

// const s3 = new AWS.S3();

// export default s3;

import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

const s3Client = new S3Client({
  region: 'ap-southeast-2',
  credentials: {
    accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID,
    secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY,
  },
});

export { s3Client, PutObjectCommand };

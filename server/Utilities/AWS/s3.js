import AWS from "aws-sdk"


//AWS s3 bucket config
const s3Bucket = new AWS.S3({
    accessKeyId: "AKIAXKEC7BCK3352TR5M",
    secretAccessKey:"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",
    region:"us-east-1"
});

export const s3Upload = (options) => {
    return new Promise((resolve,reject)=>
    s3Bucket.upload(options,(error,data)=>{
        if (error) return reject(error);
        return resolve(data);
    })
    );
};
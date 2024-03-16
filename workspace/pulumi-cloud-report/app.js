// Importing required libraries
const pulumi = require("@pulumi/pulumi");
const aws = require("@pulumi/aws");
const mongodb = require("mongodb");
const dotenv = require("dotenv");

console.log("Loading environment variables...");

// Load environment variables
try {
    const result = dotenv.config();
    
    if (result.error) {
        throw result.error;
    }  

    console.log("Environment variables loaded successfully.");

} catch (error) {
    console.error("Failed to load environment variables from .env file. Error:", error);
    process.exit(1);
}

// Verify if the necessary environment variables are present
if (!process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY || !process.env.MONGODB_CONNECTION_STRING) {
    console.error("Required environment variables are missing. Please check your .env file.");
    process.exit(1);
} else {
    console.log("All required environment variables are present.");
}

// Function to initialize and test AWS authentication
function testAwsAuthentication() {
    console.log("Initializing AWS...");

    // Initialize and configure AWS provider
    const awsProvider = new aws.Provider("awsProvider", {
        accessKey: process.env.AWS_ACCESS_KEY_ID,
        secretKey: process.env.AWS_SECRET_ACCESS_KEY,
        region: "ap-northeast-1",
    });

    console.log("Testing AWS authentication...");

    // Test AWS authentication by attempting to list all S3 buckets
    const bucketList = aws.s3.getBucket({}, { provider: awsProvider });

    if(!bucketList) {
        console.error("Failed to authenticate with AWS.");
        process.exit(1);
    } else {
        console.log("Successfully authenticated with AWS.");
    }
}

// Call the function to test AWS authentication
testAwsAuthentication();
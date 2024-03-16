const pulumi = require('@pulumi/pulumi');
const aws = require('@pulumi/aws');

// Load the AWS SDK
const AWS = require('aws-sdk');

// Load environment variables
require('dotenv').config();
const { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY } = process.env;

if (!AWS_ACCESS_KEY_ID || !AWS_SECRET_ACCESS_KEY) {
    console.error('Unable to load AWS credentials from environment variables');
    process.exit(1);
}

try {
    // Configure AWS SDK with credentials from .env
    AWS.config.update({ 
        accessKeyId: AWS_ACCESS_KEY_ID, 
        secretAccessKey: AWS_SECRET_ACCESS_KEY,
        region: "ap-northeast-1" // INPUT_REQUIRED {AWS region}
    });

    console.log('AWS SDK configured successfully with environment variables');
} catch (error) {
    console.error('Error while configuring AWS SDK:', error);
    process.exit(1);
}

let awsProvider;
try {
    // Initialize AWS provider for Pulumi
    awsProvider = new aws.Provider('awsProvider', {
        accessKey: AWS_ACCESS_KEY_ID,
        secretKey: AWS_SECRET_ACCESS_KEY,
        region: "ap-northeast-1" // INPUT_REQUIRED {AWS region}
    });

    console.log('AWS provider for Pulumi initialized successfully');
} catch (error) {
    console.error('Error while initializing AWS provider for Pulumi:', error);
    process.exit(1);
}

// Function to retrieve AWS resources
function retrieveAwsResources() {
    return new Promise((resolve, reject) => {
        try {
            // Create a new Pulumi stack reference
            const stackRef = new pulumi.StackReference('myOrganization/myProject/myStack'); // Replace 'myOrganization', 'myProject', 'myStack' with actual values

            // Get the output properties for the stack
            const outputs = stackRef.outputs();

            // Resolve the promise with the outputs
            resolve(outputs);
        } catch (error) {
            // Reject the promise and log error if there was an error
            console.error('Error while retrieving AWS resources:', error);
            reject(error);
        }
    });
}

module.exports = { awsProvider, retrieveAwsResources };
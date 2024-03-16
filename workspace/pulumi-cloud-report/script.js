const { retrieveAwsResources } = require('./pulumi.js');

retrieveAwsResources()
    .then(resources => {
        console.log('AWS resources retrieved successfully.');
        console.log(resources);
    })
    .catch(error => {
        console.error('Error while retrieving AWS resources:', error);
    });
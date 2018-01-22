let AWS = require('aws-sdk');

AWS.config.update({
  region: 'eu-west-1',
  endpoint: 'https://dynamodb.eu-west-1.amazonaws.com',
});

const dynamodb = new AWS.DynamoDB();
const tableName = 'Games';

const params = {
  TableName : tableName
};

dynamodb.deleteTable(params, function(err, data) {
  if (err) {
      console.error("Unable to delete table. Error JSON:", JSON.stringify(err, null, 2));
  } else {
      console.log("Deleted table. Table description JSON:", JSON.stringify(data, null, 2));
  }
});

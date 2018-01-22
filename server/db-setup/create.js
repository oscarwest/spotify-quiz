let AWS = require('aws-sdk');

AWS.config.update({
  region: 'eu-west-1',
  endpoint: 'https://dynamodb.eu-west-1.amazonaws.com',
});

const dynamodb = new AWS.DynamoDB();
const tableName = 'Games';

const params = {
  TableName : tableName,
  KeySchema: [
      { AttributeName: 'userId', KeyType: 'HASH' },  // Partition key
  ],
  AttributeDefinitions: [
      { AttributeName: 'userId', AttributeType: 'S' },
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 1,
    WriteCapacityUnits: 1,
  },
};

dynamodb.createTable(params, (err, data) => {
  if (err) {
    console.error('Unable to create table. Error JSON:', JSON.stringify(err, null, 2));
  } else {
    console.log('Created table. Table description JSON:', JSON.stringify(data, null, 2));
  }
});

let AWS = require('aws-sdk');

AWS.config.update({
  region: 'eu-west-1',
  endpoint: 'https://dynamodb.eu-west-1.amazonaws.com',
});

const dynamodb = new AWS.DynamoDB();
const tableName = 'Games';

var seedDb = () => {
  var game =
  {
      userId : "bitshunter",
      info : {
          "gameId": "f87ab64a-84aa-47aa-af8f-34700545f109",
          "createdDate" : "2018-01-22T00:00:00Z",
          "songs" : [
            {
              "title": "Bring you back - beacon",
              "trackId": "29j0gSMUj7dnfw6MKOPSzm"
            },
            {
              "title": "blackmill - embrace",
              "trackId": "5QjmOXFMKg9QOn9OWmkWDj"
            },
            {
              "title": "homebase - dzihan & kamien",
              "trackId": "1vmyaCBcIUH4DWpw7Cw5qe"
            },
            {
              "title": "Heartbreaker - crazy p",
              "trackId": "4vcPegtrtRJPUXrnfxqvg9"
            }
          ]
      }
  };

  let docClient = new AWS.DynamoDB.DocumentClient();
  let params = {
    TableName: tableName,
    Item: {
        "userId":  game.userId,
        "info":  game.info
    }
  };

  docClient.put(params, function(err, data) {
    if (err) {
        console.error("Unable to add data", game.userId, ". Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("PutItem succeeded:", game.userId);
    }
 });

};

seedDb();
//

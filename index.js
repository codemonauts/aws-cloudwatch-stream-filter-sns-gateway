'use strict';

const arn = process.env.sns_arn;
const zlib = require('zlib');
const AWS = require('aws-sdk');
let sns = new AWS.SNS();

exports.handler = (event, context, callback) => {
  const payload = new Buffer(event.awslogs.data, 'base64');
  zlib.gunzip(payload, (err, res) => {
    if (err) {
      return callback(err);
    }
    const parsed = JSON.parse(res.toString('utf8'));
    console.log('Decoded payload:', JSON.stringify(parsed));
    callback(null, `Successfully processed ${parsed.logEvents.length} log events.`);
    console.log('Sending entry to SNS-Hipchat Gateway');
    let payload = (`Error in ${parsed.logStream}, Message: ${parsed.logEvents[0].message}`);
    sns.publish({
      Message: payload,
      TargetArn: arn,
    }, function(err) {
      if (err) {
        console.log(err.stack);
        return callback(err);
      }
    });
  });
};

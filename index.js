'use strict';

const arn = process.env.sns_arn;
const debug = process.env.debug || 0;
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
    if (debug == 1) {
      console.log('Decoded payload:', JSON.stringify(parsed));
    }
    callback(null, `Successfully processed ${parsed.logEvents.length} log events.`);
    parsed.logEvents.forEach((element) => {
      sns.publish({
        Message: element.message,
        TargetArn: arn,
      }, function(err) {
        if (err) {
          console.log(err.stack);
          return callback(err);
        }
      });
    });
  });
};

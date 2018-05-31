# AWS CloudWatch Subscription Filter Gateway to SNS
This Lambda function can be used as CloudWatch Subscription Filter to send log messages to a SNS topic.

## Installation
1. Create a role with a policy to allow sns:publish to your SNS topic, for debug purpose add a policy to write to CloudWatch Logs as well.
2. Create a Lambda function with the content of the index.js. Use Node 8.10 or higher. Chose the execution role you just created.
3. Add an environment variable called sns_arn with the full arn of your destination SNS topic.
4. Setup the new Lambda function as Stream destination in your CloudWatch Log Groups.
5. Done.
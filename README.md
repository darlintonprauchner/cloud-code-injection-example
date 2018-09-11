# cloud-code-injection-example

## Getting Started

First, have a look at the `aws.json` file, you will need to add your AWS credentials to it:
```
{
  "accessKeyId": "<YOUR_ACCESS_KEY>",
  "secretAccessKey": "<YOUR_SECRET_KEY>",
  "region": "us-east-1"
}
```

If you don't know what are your access and secret key, you can use [this link](https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/getting-your-credentials.html) to figure it out.

### Creating your lambda for code injection

Now you need to [login on aws lambda console](https://console.aws.amazon.com/lambda/home?region=us-east-1#/functions) so you can create your lambda.
Here is the contract:

#### Request
```
{
    firstNumber: <ANY>
    secondNumber: <ANY>
}
```

#### Response
```
{
    statusCode: <NUMBER>
    body: <ANY>
}
```

Take note of your lambda name, you'll need it here.

### Updating the local code
On `index.js` look for:
```
var injectedLambdaMethod = '<YOUR_LAMBDA_NAME_HERE>';
```
And replace the string `<YOUR_LAMBDA_NAME_HERE>` by the name of the lambda method you created.


## Running your code:
```
npm run start
```

You can now run your code at [http://localhost:3000/2/4](http://localhost:3000/2/4)

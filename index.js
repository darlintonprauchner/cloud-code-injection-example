var express = require('express');
var AWS = require('aws-sdk');

var app = express();

// Configuring AWS - Change the aws.json file, here is how to get your localdev credentials: https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/getting-your-credentials.html
AWS.config.loadFromPath('./aws.json');

// This is the name of the lambda function you will inject from aws
var injectedLambdaMethod = '<YOUR_LAMBDA_NAME_HERE>';

// Instantiating Lambda
var lambda = new AWS.Lambda({});

// Creating a controller to test our remote method
app.get('/:first/:second', function (req, res) {
    var payload = {
        'firstNumber': req.params.first,
        'secondNumber': req.params.second
    };

    // Prepare payload to send to Lambda
    var pullParams = {
        FunctionName : injectedLambdaMethod,
        InvocationType : 'RequestResponse',
        Payload: JSON.stringify(payload)
    };

    // Invoke remote lambda function
    lambda.invoke(pullParams, function(err, data) {
        if (err) {
            res.send(err);
        } else {
            res.send(JSON.parse(data.Payload).body);
        }
    });
});

// Starting the MS
var server = app.listen(3000, function () {
    console.log('Listening...');
});

/*
    // ONE PLUS ONE METHOD (to put as a lambda)
    exports.handler = (event, context, callback) => {

        var first = +event.firstNumber;
        var second = +event.secondNumber;
        var total = first+second;

        // doing a simple x + Y
        const response = {
            statusCode: 200,
            body: first + " + " + second + " is " + total
        };

        callback(null, response);
    };
*/

/*
    // ONE MULTIPLIES ONE METHOD (to put as a lambda)
    exports.handler = (event, context, callback) => {

        var first = +event.firstNumber;
        var second = +event.secondNumber;
        var total = first*second;

        // doing a simple x * Y
        const response = {
            statusCode: 200,
            body: first + " * " + second + " is " + total
        };

        callback(null, response);
    };
*/

/*
    // ADD VALIDATION
    if (!Number.isInteger(event.firstNumber)) {
        callback(null, {body: event.firstNumber + " is not a number"})
    }
    if (!Number.isInteger(event.secondNumber)) {
        callback(null, {body: event.secondNumber + " is not a number"})
    }
*/

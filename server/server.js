var bodyParser = require('body-parser');
var app = require('express')();

app.use(bodyParser());

app.get('/', function(req,res,next) {
	res.send(200);
});

app.listen(8080);
console.log('Listening on 8080...');
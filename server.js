var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(express.static(__dirname + '/client'));
app.use(bodyParser());
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.get('/', function(req, res) {
	res.render('../client/index.html');
});

app.listen(process.env.PORT || 8080);
console.log('Listening on 8080...');
var express = require('express');
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');
var app = express();

var transporter = nodemailer.createTransport({
	service: 'Gmail',
	auth: {
		user: 'dummyuser5000@gmail.com',
		pass: 'duganIsMyName1'
	}
});

var mailOptions = {
	from: 'Dum Dum Dugan <dummyuser5000@gmail.com>',
	subject: 'You\'re Percolating!'
};

app.use(express.static(__dirname + '/client'));
app.use(bodyParser());
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.post('/request-demo', function(req, res) {
	var firstName = req.body.first;
	var lastName = req.body.last;
	var email = req.body.email;

	mailOptions.to = email;
	mailOptions.html = 'Hi ' + firstName + ' ' + lastName +'!<br>This is some text. Right?';

	transporter.sendMail(mailOptions, function (error, info) {
		if (error) {
			console.log(error);
		} else {
			console.log('Message sent: ' + info.response);
		}
	});
});

app.get('/', function(req, res) {
	res.render('../index.html');
});

app.listen(process.env.PORT || 8080);
console.log('Listening on 8080...');
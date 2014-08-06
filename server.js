var express = require('express');
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');
var app = express();

var transporter = nodemailer.createTransport({
	service: 'Gmail',
	auth: {
		user: process.env.EMAIL,
		pass: process.env.MAILPASS
	}
});

var mailOptions = {
	from: 'Dum Dum Dugan <dummyuser5000@gmail.com>',
	subject: 'You\'re Percolating!'
};

var twoCities = 'Here\'s some Dickens for you.<br><br>' +
		'It was the best of times,<br>' +
		'it was the worst of times,<br>' +
		'it was the age of wisdom,<br>' +
		'it was the age of foolishness,<br>' +
		'it was the epoch of belief,<br>' +
		'it was the epoch of incredulity,<br>' +
		'it was the season of Light,<br>' +
		'it was the season of Darkness,<br>' +
		'it was the spring of hope,<br>' +
		'it was the winter of despair,<br>' +
		'we had everything before us,<br>' +
		'we had nothing before us,<br>' +
		'we were all going direct to Heaven,<br>' +
		'we were all going direct the other way--<br>' +
		'in short, the period was so far like the present period, that some of<br>' +
		'its noisiest authorities insisted on its being received, for good or for<br>' +
		'evil, in the superlative degree of comparison only.<br><br>' +
		'From <a href="http://percolate.com">Percolate</a>';

app.use(express.static(__dirname + '/client'));
app.use(bodyParser());
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.post('/request-demo', function(req, res) {
	var firstName = req.body.first;
	var lastName = req.body.last;
	var email = req.body.email;

	mailOptions.to = email;
	mailOptions.html = 'Hi ' + firstName + ' ' + lastName +'!<br><br>' + twoCities;

	transporter.sendMail(mailOptions, function (error, info) {
		if (error) {
			console.log(error);
		} else {
			console.log('Message sent: ' + info.response);
			res.send('Email sent!');
		}
	});
});

app.get('*', function(req, res) {
	res.render('../index.html');
});

app.listen(process.env.PORT || 8080);
console.log('Listening on 8080...');
Percolate Front-End Challenge
==
A web-app clone of one of Percolate's client case study pages mocked up for the Amsterdam-based men's fashion brand Suitsupply, using Angular and Express.

Design Considerations
==
Many of Percolate's existing static assets were used in this project (images, css, etc), where available, to maintain a consistent look and user experience.

An animated gif was used for the heroes to provide visual interest.

The `REQUEST A DEMO` form is validated on the client side in an unobtrusive manner using Angular such that:
* detailed feedback of which inputs are invalid is provided upon submit, but not before
* an invalid input's border is colored red on blur, but not on focus
* following a successful submit, a success message is displayed before the form gets cleared out for further usage

However, client side validation, in and of itself, is not sufficient in that it is easily circumventible. Here, it serves mainly as a way to deter unnecessary trips to the server--thus emails are validated once more on the backend. Upon successful request, an email is generated using the user's information and sent out.

In Action
==
This application was deployed on Heroku and available at: [percolate-challenge.herokuapp.com](http://percolate-challenge.herokuapp.com)
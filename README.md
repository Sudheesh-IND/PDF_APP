# Getting Started with PDF APP

Website demo video: https://youtu.be/ksaaGYpyi0U?si=ppA3ipFUqLFNp-Ti

sample account use (email:sudheeshamv2000@gmail.com,pass:123)

## Technologies used

React JS,
NodeJS,
Express,
MongoDB Atlas,
React-Router-Dom Library,
Multer Library,
React PDF Library,
PDF Merger library,
Bcrypt library,
JSON Web Token Library,
React hook form library,
MD Bootstrap,
React Bootstrap,
Font awesome



### Starting Page
The application starts with a page with a button getting started and when we click on this page this button direct us to the Login page. React-Router-Dom library is used for navigating through each pages in this application.



### Login Page and Register page

This page consists of a form to login with input fields for posting data for registration and login and while login a token is generated for authentication purposes on the backend.The token required for authentication is generated using JSON Web Token library. Bcrypt is used for encrypting the password.

### Home page

On successful login the application takes us to the homepage where a header,searchbar and cards for showing the pdf are present. Each cards have its own dedicated trash icon for deleting the pdf. On the header there is a logo, and two buttons are present one button for adding pdf and other for managing user login. On successful login
the name of the user will be displayed on that button. Searching id implemented for better experience.


### View PDF Page

When the user click on any card it is then directed to the view pdf page where the user can view the pdf. This page consists of two buttons  one for downloading the pdf and other for extracting the pages required for the user. The selection of pages is dome using the checkboxes associated with each pages. PDF Merger library is used for extracting pdf.

### Not Found Page
If any error occurs while using this application then the application will be redirect it into the Not Found page.



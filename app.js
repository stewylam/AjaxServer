const express = require('express')
const app = express()
const fs = require('fs')
const pug = require('pug')
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('./src/public'));

app.set('views', './src/views');
app.set('view engine', 'pug');


// renders a page that displays all your users. The JSON content pasen naar een .pug file. JSON file parsen.

app.get('/', (req, res) => {
	
	// JSOn file gets read
	fs.readFile('./users.json', 'utf-8', function(err,data){
		if (err) {
			throw err;
		}
		
		var info = JSON.parse(data); // JSON file gets parsed
		res.render('index', {users: info}); // information gets passed to PUG and get renders to HTML
	});	

});


// renders a page that displays a form which is your search bar.*/

app.get('/search', (req, res) => {
    res.render('form') // the form in PUG gets rendered to HTML
})

// Ajax - Live Search
app.post('/autocomplete', (req, res) => {
    
    var input = req.body.name;
    
    findUsers(input, function (results) {
    	res.send(results);
    });

    function findUsers(input, onComplete) {
    	fs.readFile('./users.json', 'utf-8', (err, data) => {
    		user = JSON.parse(data);

    		var results = [];

    		user.forEach(function (users){
    			if (users.firstname.startsWith(input) || users.lastname.startsWith(input)) {
    				results.push(users)
    			}
    		});

    		onComplete(results);
    	});
    }
});




// takes in the post request from your form, then displays matching users on a new page. Users should be matched based on whether either their first or last name contains the input string.

app.post('/search', (req, res) => {

	fs.readFile('./users.json', 'utf-8', function(err,data){
		if (err) {
			throw err;
		}
		
		var user = JSON.parse(data);

		var input = req.body.name; // the input of the form is assigned to variable input

		// a loop to look through the JSON file for information of users
		for (var i = 0; i < user.length; i++) {
			if (user[i].firstname === input || user[i].lastname === input) {
				var userName = user[i].firstname
				var userLast = user[i].lastname
				var userEmail = user[i].email
			}
		};

		res.render('search', {userName: userName, userLast: userLast,
			userEmail: userEmail
		}); //The search PUG gets rendered to HTML

	});
});


// renders a page with three forms on it (first name, last name, and email) that allows you to add new users to the users.json file.
	
app.get('/adduser', (req, res) => {

    res.render('addUserForm') // User pug-form is rendered to html   
});


// takes in the post request from the 'create user' form, then adds the user to the users.json file. Once that is complete, redirects to the route that displays all your users (from part 0).

app.post('/adduser', (req, res) => {

	fs.readFile('./users.json', 'utf-8', function(err,data){
			if (err) {
				throw err;
			}
			
			var user = JSON.parse(data); //parsed the read JSON file

			// assign the submitted form to variable
			var newUserFirst = req.body.firstname
			var newUserLast = req.body.lastname
			var newUserEm = req.body.email

			// all the form variables are assigned to variable newUser
			var newUser = {
				firstname: newUserFirst,
				lastname: newUserLast,
				email: newUserEm
			};

			user.push(newUser); // the content of newUser gets added(pushed) to the parsed JSON file 

			fs.writeFile('./users.json', JSON.stringify(user)); // the variable gets added and write to the JSON file.

			res.redirect('/') // it will redirect to new page

	});		
});

const server = app.listen(8080, () => {
    console.log('server has started at ', server.address().port)
});
// application is listens to the request. And everytime the browser goes to localhost:8080 it will print out "Server has started at".
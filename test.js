const express = require('express')
const app = express()
const fs = require('fs')

/*app.get('/', function(request, response) {
	response.send('hi');
})
*/

// part 0: route 1: renders a page that displays all your users.
app.get('/', function(request, response) {
	
	fs.readFile('./users.json', 'utf-8', function(err,data){
		if (err) {
			throw err;
		}

		var info = JSON.parse(data);

		response.send(data);
	});	

});


const listener = app.listen(3000, function() {
    console.log('server has started at ', listener.address().port)
})

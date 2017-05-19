User Information App - AJAX Server

Starting with your previous website, create a new branch to preserve the old site. Your site has a form on it that acts like a search bar. On click, it should retrieve a list of matching users and list them by name on the same page, similar to how the search bars on airbnb.com or hipmunk.com function.

Hints:

use https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/String/indexOf
you cannot send or render a response more than once per request.
you must find a way to capture whenever the user's input changes in the search bar. This will trigger your Ajax request to your server.
Part 0: If you're having trouble finding matching users, solve this puzzle first:

// given an array of values, write a function that finds the index of where the value is located, and if nothing is found, returns -1.
// example: for ['apple', 'orange', 'pineapple']
// 'orange' returns '1'
// 'durian' returns '-1'

// now, write a function that finds all the indexes of where the value is located and returns them in an array, and if nothing is found, returns -1
// example: ['apple', 'orange', 'orange', 'pineapple']
// 'orange' returns [1,2]
Part 1: Autocomplete Modify your form so that every time the user enters a key, it makes an AJAX call that populates the search results. Do this work in a git branch called "autocomplete". Then, merge this branch into master with a pull request.

Part 2: Bandwidth optimization Modify your form again so that AJAX requests happen at most once every 300 milliseconds. Do this work in a git branch called "bandwidth-optimization". Then, merge this branch into master with a pull request.

Hints:

use https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/now
test it by opening the Network tab in Chrome's Developer Tools by checking that fewer requests are going off.
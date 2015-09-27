(function (global, $, undefined) {

    var $input = $('#textInput'),
        $results = $('#results');

    var list = document.getElementsByTagName("ul")[0];

    // Helper function (add item to unordered HTML list).
    function addToList(itemToAdd) {
	listItem = document.createElement("li");
	listItem.innerHTML = itemToAdd; 
	list.appendChild(listItem);
    }

    // Search Wikipedia for a given term
    function searchWikipedia (term) {
	$results.empty();
	return $.ajax({
	    url: 'http://en.wikipedia.org/w/api.php',
	    dataType: 'jsonp',
	    data: {
		action: 'opensearch',
		format: 'json',
		search: global.encodeURI(term)
	    }
	}).promise();
    }
    

    function main() {

	//// Notice how this code is almost identical to the basic one:
	//// It declare an helper function to add items to unordered list in HTML
	//// It declare an observable (the following 20 rows)
	//// It subscribe the same observer we used in basic example to the newly declared observable.
	
	//// So the only difference between the current DEMO and the basic one is just the observable definition.

	// Get all distinct key up events from the input and only fire if long enough and distinct
	var keyup = Rx.Observable.fromEvent($input, 'keyup')
	    .map(function (e) {
		return e.target.value; // Project the text from the input
	    })
	    .filter(function (text) {
		return text.length > 1; // Only if the text is longer than 1 characters
	    })
	    .debounce(700 /* Pause for 700ms */ )
	    .distinctUntilChanged(); // Only if the value has changed

	// -> Here i've an observable that emits text string candidate to be sent to wikipedia service (it already filtered out corner cases)
	
	var searcher = keyup.flatMapLatest(searchWikipedia);

	// -> Here i've an observable that emits only valid return values received from wikipedia service (flatMapLatest will filter out out-to-date responses).
	
	// Return term, if data is the response, data[1] contains the array of terms 
	// (https://en.wikipedia.org/w/api.php?action=opensearch&search=api&limit=10&namespace=0&format=jsonfm)
	var response = searcher.flatMapLatest(function(data) {return data[1]}) 
	
	// -> Here i've an observable that emits single strings extracted from the array (Iterable) of response strings received from the wikipedia service.
	
	response.subscribe(
	    function (x) {addToList(x);}, 
	    function(err) {addToList("Error raised: "+err);},
	    function() { addToList("Observable Completed!");}
	);
    }
    
    main();
    
}(window, jQuery));

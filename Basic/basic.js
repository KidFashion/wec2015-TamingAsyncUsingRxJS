
//// Observable from collection.
// var numbers = [1,2,3,4,5,6,7,8,9,10];
// var observable = Rx.Observable.from(numbers);

////Observable from event stream.
//var button = document.createElement("button");
//button.innerHTML = "Click me!";
//list.parentNode.insertBefore(button,list);
//var observable = Rx.Observable.fromEvent(button,'click');

//var stopListening = document.createElement("button");
//stopListening.innerHTML = "RaiseStopEvent";
//list.parentNode.insertAfter(stopListening, button);
//var obs2 = Rx.Observable.fromEvent(stopListening,'click');
//var observable = Rx.Observable.fromEvent(button,'click').takeUntil(obs2);

//Observable from Promise.
// var promise = new Promise(function(resolve,reject){
// alert("Simulating async task");
// resolve("Returned from async");
// });
// var observable = Rx.Observable.fromPromise(promise);


function main() {

// Helper function (add item to unordered HTML list).
function addToList(itemToAdd) {
    listItem = document.createElement("li");
    listItem.innerHTML = itemToAdd; 
    list.appendChild(listItem);
}

// Binding DOM elements.
var list = document.getElementsByTagName("ul")[0];

var emitBtn = document.getElementById("emitEvent");
var cancelBtn = document.getElementById("stopListening");

// Declare an observable.
var observable = Rx.Observable.empty()

//// DEMO 1: Iterable as Observable!
//// Comment previous observable definitions and uncomment the following one.
//var observable = Rx.Observable.from([1,2,3,4,5])

//// DEMO 2: Observer as Observable!
//// Make visible emitEvent button modifying basic.html file.
//// Comment previous observable definitions and uncomment the following one.
//var observable = Rx.Observable.fromEvent(emitBtn,'click')

//// DEMO 3: Promise as Observable! (Ugly, JS has no Thread.Sleep...)
//// Uncomment following promise declaration.
//// Comment previous observable definitions and uncomment the following one.
//var promise = new Promise(function(resolve,reject){
//  alert("Simulating async task");
//  resolve("Returned from async");
//  });
//var observable = Rx.Observable.fromPromise(promise)

//// DEMO 4: Don't unsubscribe but use takeUntil
//// Make visible emitEvent button modifying basic.html file
//// Make visible stopListening button modifying basic.html file.
//// Create a new observable around cancelBtn observer.
//// Comment previous observable definitions and uncomment the following one.
//var cancelObs = Rx.Observable.fromEvent(cancelBtn,'click')
//var observable = Rx.Observable.fromEvent(emitBtn,'click').takeUntil(cancelObs)


// Subscribe an observer to an observable (just add event to html list)
observable.subscribe(
    function (x) { addToList(x);},
    function(err) {addToList("Error raised: "+err);},
    function() { addToList("Observable Completed!");}
);

}

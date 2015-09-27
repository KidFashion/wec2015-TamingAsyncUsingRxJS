function main() {
var list1 = document.getElementById("results1");
var list2 = document.getElementById("results2");
var list3 = document.getElementById("results3");

function addToList(list,itemToAdd) {
listItem = document.createElement("li");
listItem.innerHTML = itemToAdd;
listItem.style.fontSize = "x-large" 
list.appendChild(listItem);
}

Rx.Observable.fromArray([1,2,3,4,5]).flatMap(function(a) {
  return Rx.Observable.repeat(a, 3, Rx.Scheduler.currentThread)
}).subscribe(function(r) { addToList(list1,r)});

Rx.Observable.fromArray([1,2,3,4,5]).flatMap(function(a) {
  return Rx.Observable.repeat(a, 3, Rx.Scheduler.immediate)
}).subscribe(function(r) {addToList(list2,r)});

Rx.Observable.fromArray([1,2,3,4,5]).flatMap(function(a) {
  return Rx.Observable.repeat(a, 3, Rx.Scheduler.default)
}).subscribe(function(r) {addToList(list3,r)});


}

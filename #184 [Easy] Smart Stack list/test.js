// Require SmartStack
var SmartStack = require('./SmartStack');

// Function to genereate a random integer
function randomInt(min, max) {
    return Math.floor(Math.random()*(max-min+1)+min);
}

function printList() {
    // Display stack
    console.log('Stack:', Stack.displayStack() );
    // Display sorted
    console.log('Sorted:', Stack.displaySorted() );
}

// Create an instance of the SmartStack
var Stack = new SmartStack();

// Push N random numbers on the Stack
var n = randomInt(1, 40);
for (var i = 0; i < n; i += 1) {
    Stack.push(randomInt(-1000, 1000));
}

printList();

// We are removing all values greater than X
var x = randomInt(-1000, 1000);
Stack.removeGreater(x);

console.log('Remove elements greater then:', x);
printList();

// Call the 'pop' method X times.
var popTimes = (Stack.size() / 2);
for (var i = 0; i < popTimes; i += 1) {
    Stack.pop();
}

console.log('Remove 50% of the list with calling the pop method');
printList();

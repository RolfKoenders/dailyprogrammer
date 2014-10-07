
var input = [
    100,
    34.24,
    2,
    25.8,
    58.32,
    4,
    10.10,
    158
];

function sort(input) {
    var smallList = [];
    var greaterList = [];
    var equalList = [];
    var sortedSmall = [];
    var sortedGreater = [];

    // Maybe the input is already sorted ;)
    if(input[0] < input[1] && input[2] > input[1]) {
        console.log('Data is already sorted');
        return input;
    };

    // Pick random item of array to use as pivot
    var startItem = input[Math.floor(Math.random()*input.length)];

    input.forEach(function(n) { 
        if(n < startItem) {
            smallList.push(n);
        } else if(n == startItem) {
            equalList.push(n);
        } else {
           greaterList.push(n); 
        }

        sortedSmall = sort(smallList);
        sortedGreater = sort(greaterList);
    });
    return sortedSmall.concat(equalList).concat(sortedGreater);
};

function start() {
    var sorted = sort(input);
    console.log('[==== INPUT ====]');
    console.log(input);
    console.log('[==== SORTED ====]');
    console.log(sorted);
};

start();

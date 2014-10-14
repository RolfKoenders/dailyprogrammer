
function SmartStack() {
    this.stack = [];
};

SmartStack.prototype = { 
    push: function(value) {
        this.stack.push(value);
    },
    pop: function() {
        this.stack.pop();
    },
    size: function() {
        return this.stack.length;
    },
    removeGreater: function(x) {
        for (var i = 0; i < this.size(); i += 1) {
            if(this.stack[i] > x) {
                this.stack.splice(this.stack.indexOf(this.stack[i]), 1);
                i -= 1;
            }
        }
    },
    displayStack: function() {
        return this.stack;
    },
    displaySorted: function() {
        var cloneStack = this.stack.slice(0);
        return cloneStack.sort(function(a, b) {
            return a -b;
        });
    }
};

module.exports = SmartStack;


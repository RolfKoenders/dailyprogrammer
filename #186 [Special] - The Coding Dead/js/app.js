
function Game(options) {
    this.options = options;
    this.ticks = options.t
};

Game.prototype = {
    init: function() {
        console.log('[Game] - init ', this.options);
        this.board = new Board(this.options.size);
        this.board.render();

        this.board.getSpot(1, 2);
    },

    play: function() {    
    }
};


function Board(size) {
    this.height = size.y;
    this.width = size.x;
    this.spots = new Array((this.height * this.width));
    this.$el = document.getElementById("game_board");
};

Board.prototype = {

    getSpot: function(x, y) {
        var index = (x * this.width) + y;
        var spot = this.spots[index-1];
        console.log('[Board] - getSpot: ' + index + ', ', spot);
        return spot;
    },

    render: function() {
        console.log('[Board] - render');
        var container = document.getElementById('game_board');
        var rowCount = 0;
        for(var i = 1; i <= this.spots.length; i++) {
            if(rowCount === this.width) {
                var row = document.createElement('div');
                row.className = 'row';
                this.$el.appendChild(row);
                rowCount = 0;
            }
            var div = document.createElement('div');
            div.className = 'spot';
            var nr = document.createTextNode(i);
            div.appendChild(nr);
            this.$el.appendChild(div);
            this.spots[(i-1)] = div;
            rowCount++;
        };
    }
};

/*
 * Game Input 
 * x = How many zombies will spawn
 * y = How many victims will spawn
 * z = How many hunters will spawn
 * t = How many ticks will happen
 */
var input = {
    x: 20,
    y: 20,
    z: 10,
    t: 50,
    size: {
        x: 20,
        y: 20
    }
};
var game = new Game(input);
game.init();

//game.play();


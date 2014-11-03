
function Game(options) {
    this.options = options;
    this.ticks = options.t
};

Game.prototype = {
    init: function() {
        console.log('[Game] - init ', this.options);
        this.board = new Board(this.options.size);
        this.board.render();
    },

    play: function() {    
    }
};


function Board(size) {
    this.height = size.y;
    this.width = size.x;
    this.spotCount = new Array((this.height * this.width));
    this.$el = document.getElementById("game_board");
};

Board.prototype = {
    render: function() {
        console.log('[Board] - render');
        var container = document.getElementById('game_board');
        console.log(container);
        for(var i = 0; i < this.spotCount.length; i++) {
            var div = document.createElement('div');
            div.className = 'spot';
            this.$el.appendChild(div);
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
        x: 8,
        y: 8
    }
};
var game = new Game(input);
game.init();

//game.play();


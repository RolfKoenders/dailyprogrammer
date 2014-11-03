
/* Game Class */
function Game(options) {
    this.options = options;
    this.ticks = options.t
};

Game.prototype = {
    init: function() {
        console.log('[Game] - init ', this.options);

        if((this.options.x + this.options.y + this.options.z) > (this.options.size.x * this.options.size.y)) {
            alert('Wrong input!, cannot handle more mobs than there are spots');
            window.stop();
        };

        this.board = new Board(this.options.size);
        this.board.render();

        //this.board.getSpot(1, 2);
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
    },
    placeOnSpot: function(mob, position) {
        var index = this.getSpot(position.x, position.y);
        this.spots[index];
    }
};


function Mob(spot) {
    this.position = null;
    this.spot = spot;
};
Mob.prototype = {
    moveTo: function(position) {
        console.log('moveTo: ', position);
    }
};
Mob.extend = function(extendClass) {
    extendClass.prototype = new Mob();
    extendClass.prototype.constructor = extendClass;
};


function Zombie(){
};
Mob.extend(Zombie);
Zombie.prototype = {
    move: function() {
        console.log('[Zombie] - move');
        // Move to new/random position
        this.moveTo(3,3);
    }
};


function Victim() {
};
Victim.prototype = {
};


function Hunter(){
};
Hunter.prototype = {
};


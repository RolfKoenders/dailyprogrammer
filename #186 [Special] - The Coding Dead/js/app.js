
/* 
 * Game Class
 * constructor
 */
function Game(options) {
    this.board = null;
    this.mobs = [];
    this.options = options;
    this.ticks = options.t;
};

Game.prototype = {
    /*
     *  Game init function
     */
    init: function() {
        console.log('[Game] - init ', this.options);

        if((this.options.x + this.options.y + this.options.z) > (this.options.size.x * this.options.size.y)) {
            alert('Wrong input!, cannot handle more mobs than there are spots');
            window.stop();
        };

        this.board = new Board(this.options.size);
        this.board.render();
        this.spawnMobs();
    },

    /*
     *  Function to spawn some mobs
     */
    spawnMobs: function() {
        console.log('Create: ' + this.options.x + ' zombies');
        for(var i = 0; i < this.options.x; i++) {
            var randomSpot = this.board.randomSpot(); 
            var x = new Zombie();
            x.init(randomSpot.position, randomSpot.$el);
            this.addMobToGame(x);
        };

        console.log('Create: ' + this.options.y + ' victims');
        for(var i = 0; i < this.options.y; i++) {
            var randomSpot = this.board.randomSpot();
            var y = new Victim();
            y.init(randomSpot.position, randomSpot.$el);
            this.addMobToGame(y);
        };

        console.log('Create: ' + this.options.z + ' hunters');
        for(var i = 0; i < this.options.z; i++) {
            var randomSpot = this.board.randomSpot();
            var z = new Hunter();
            z.init(randomSpot.position, randomSpot.$el);
            this.addMobToGame(z);
        };
    },

    /*
     *  Add a mob to the game
     */
    addMobToGame: function(mob) {
        this.board.placeOnSpot(mob);
        this.mobs.push(mob);
    },

    /*
     *  Game tick function
     */
    tick: function() {
        console.log('[Game] - Tick');
        var mobCount = this.mobs.length;
        for(var i = 0; i < mobCount; i++) {
            var Mob = this.mobs[i];
            var move = Mob.movementAction();
        };
    },

    /*
     *  Start the game and start the game loop
     */
    play: function() {
        console.log('[Game] - Play: ' + this.ticks + ' ticks');
        var _this = this;

        var tickCounter = 0;
        var tickInterval = setInterval(ticker, 2000); 
        function ticker() {
            if(tickCounter === _this.ticks) {
                console.log('[Game] - Finished');
                alert('Game is finished');
                clearInterval(tickInterval);
                return;
            }
            _this.tick();
            tickCounter++;
        }
    }
};

/*
 *  Game board class
 *  constructor
 */
function Board(size) {
    this.height = size.y;
    this.width = size.x;
    this.spots = new Array((this.height * this.width));
    this.$el = document.getElementById("game_board");
};

Board.prototype = {
    /*
     *  Return a random spot on the board
     *  TODO check if spot is already taken
     */
    randomSpot: function() {
        var cords = {
            x: Math.floor(Math.random() * (this.width - 0)) + 0,
            y: Math.floor(Math.random() * (this.height - 0)) + 0
        };
        if(cords.x === 0 || cords.y === 0) {
            return this.randomSpot();
        }
        var spot = this.getSpot(cords.x, cords.y);
        return {
            position: cords,
            $el: spot
        };
    },

    /*
     *  Return the spot based on the passed cordinates
     */
    getSpot: function(x, y) {
        var index = (x * this.width) + y;
        var spot = this.spots[index-1];
        console.log('[Board] - getSpot: ' + index + ', ', spot);
        return spot;
    },

    /*
     *  Render board on the webpage
     */
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

    /*
     *  Place something (mob) on the board
     */
    placeOnSpot: function(mob) {
        var index = mob.position;
        this.spots[index] = mob;
        mob.render();
    }
};


function Mob() {
    this.position = null;
    this.el = null;
};
Mob.prototype = {
    _init: function(position, el) {
        this.position = position;
        this.el = el;
    },
    _moveTo: function(position) {
        console.log('moveTo: ', position);
    },
    movementAction: function() {
        console.log("movementAction");
        var currentPosition = this.position;
        this.move(currentPosition);
    }
};
Mob.extend = function(extendClass) {
    extendClass.prototype = new Mob();
    extendClass.prototype.constructor = extendClass;
};


function Zombie() {};
Mob.extend(Zombie);

Zombie.prototype.init = function(position, el) {
    this._init(position, el);
};
Zombie.prototype.render = function() {
    console.log('[Zombie] - render');
    this.el.className += ' zombie';
};
Zombie.prototype.move = function(currentPosition) {
    console.log('[Zombie] - move');
    console.log("current position: ", currentPosition);

    // Check if can move up
    console.log('move up pos: ', (currentPosition.y -1)); 
    
    // down

    // left

    // right

    // Move to new/random position
    //this.moveTo(3,3);
};


function Victim() {};
Mob.extend(Victim);

Victim.prototype.init = function(position, el) {
    this._init(position, el);
};
Victim.prototype.render = function() {
    console.log('[Victim] - render');
    this.el.className += ' victim';
};
Victim.prototype.move = function() {
    console.log('[Victim] - move');
};


function Hunter() {};
Mob.extend(Hunter);

Hunter.prototype.init = function(position, el) {
    this._init(position, el);
};
Hunter.prototype.render = function() {
    console.log('[Hunter] - render');
    this.el.className += ' hunter';
};
Hunter.prototype.move = function() {
    console.log('[Hunter - move');
};

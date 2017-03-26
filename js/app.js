//Main variables
var allEnemies = [];
var gameTime = 0;
var score = 0;
var allStars = [];
var level = 0;

// Enemies our player must avoid

var Enemy = function() {

    //set random location on different lanes for the enemies
    this.x = 0;
    var locataion = Math.random();
    if (locataion <= 0.33) {
        this.y = 60;
    } else if (locataion < 0.66) {
        this.y = 145;
    } else if (0.66 <= locataion) {
        this.y = 230;
    }

    //set different speed for the enemies
    var speed = Math.random();

    if (score < 10) {
        this.speed = speed;
    } else if (score < 30) {
        this.speed = speed * 1.5;
        level = 1;
    } else if (score < 60) {
        this.speed = speed * 2;
        level = 2;
    } else if (score < 100) {
        this.speed = speed * 2.5;
        level = 3;
    } else if (score < 140) {
        this.speed = speed * 3;
        level = 4;
    }
    this.sprite = 'images/enemy-bug.png';
};

//Makes it move
Enemy.prototype.update = function(dt) {
    for (x = 0; x < 500; x++) {
        this.x += (this.speed) * dt;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//Our player

var Player = function() {
    this.x = 200;
    this.y = 390;
    this.sprite = 'images/char-boy.png';
};

//return our player to the starting position in case it reached water
Player.prototype.update = function() {
    if (this.y < 40) {
        this.y = 390;
        this.x = 200;
        score++;
    }
};

// Draw the player on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//allow to control the player object, so object don't move of the screen
Player.prototype.handleInput = function(key) {
    if (key == 'left') {
        if (0 < this.x) {
            this.x -= 100;
        } else {
            this.x;
        }
    } else if (key == 'right') {
        if (this.x < 400) {
            this.x += 100;
        } else {
            this.x;
        }
    } else if (key == 'up') {
        if (0 < this.y) {
            this.y -= 83;
        } else {
            this.y;
        }
    } else if (key == 'down') {
        if (this.y < 350) {
            this.y += 83;
        } else {
            this.y;
        }
    }
};

document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
    player.update();
});

var checkCollisions = function() {
    for (var i = 0; i < allEnemies.length; i++) {
        if (allEnemies[i].x < player.x + 75 && allEnemies[i].x + 75 > player.x && allEnemies[i].y < player.y + 30 && allEnemies[i].y + 30 > player.y) {
            player.x = 200;
            player.y = 390;
            score--;
        }
    }
};

var checkStars = function() {
    for (var i = 0; i < allStars.length; i++) {
        if (allStars[i].x < player.x + 70 && allStars[i].x + 70 > player.x && allStars[i].y < player.y + 30 && allStars[i].y + 30 > player.y) {
            score += 10;
            allStars.splice(i, 1);
            i--;
        }
    }
};

var Star = function() {
    var yLocataion = Math.random();
    if (yLocataion <= 0.33) {
        this.y = 70;
    } else if (yLocataion < 0.66) {
        this.y = 155;
    } else if (0.66 <= yLocataion) {
        this.y = 235;
    }

    var xLocataion = Math.random();
    if (xLocataion <= 0.20) {
        this.x = 0;
    } else if (yLocataion < 0.40) {
        this.x = 100;
    } else if (yLocataion < 0.60) {
        this.x = 200;
    } else if (yLocataion < 0.80) {
        this.x = 300;
    } else if (0.80 <= yLocataion) {
        this.x = 400;
    }
    this.sprite = 'images/star.png';
};

// Draw the player on the screen, required method for game
Star.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var player = new Player();
var scoreEl = document.getElementById('score');
var levelEl = document.getElementById('level');
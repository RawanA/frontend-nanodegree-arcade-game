// a varaible helps in the conditions of win and lose
var valid = true;

var Heart = function (x, y){
  this.sprite = 'images/Heart.png';
  this.x = x;
  this.y = y;
};

// Draw the heart on the screen, required method for game
Heart.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// when a player lose the all hearts (game) the hearts will be refilled by this function.
Heart.prototype.reset = function(){

  //if the life is empty the hearts will be refilled again for another game.
  if(allHearts.length === 0){
    heart1 = new Heart(100, 570);
    heart2 = new Heart(200, 570);
    heart3 = new Heart(300, 570);

    allHearts = [heart1, heart2, heart3];
  }

};
// Enemies our player must avoid
var Enemy = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    // random number between 50 and 300
    this.speed = Math.floor((Math.random() * 300) + 50);

    this.x = x;
    this.y = y;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x < 505) {
      this.x += this.speed * dt;
    }
    else {
      this.x = -200;
    }

    this.checkCollisions();

};

Enemy.prototype.checkCollisions = function(){
  // when the player and the bugs collied
  // one heart will be removed from the array
  // and the player's position will be reseted
  if(this.x < player.x + 30 && this.x + 60 > player.x && this.y < player.y + 60 && this.y + 40 > player.y) {

    allHearts.pop();
    player.reset();
  }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y){
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started
  this.x = x;
  this.y = y;
  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  this.sprite = 'images/char-princess-girl.png';
};

Player.prototype.update = function(){

  // check if the user has reached the river safley and so won the games
  // the player can continue playing by entering 'Shift'
  // Until he/she loses the game
  if (this.y < 20 & valid) {
    document.getElementById('won-lose-mssg').innerHTML += "Congradulation :), Press 'Shift' to continue";
    valid = false;
  }

  // if there is no heart left the plyed lose the games
  // a losing maeesage appears
  // and after 3 seconds the hearts will be refilled again
  // and the games is restarted
  if(allHearts.length == 0 & valid){

  document.getElementById('won-lose-mssg').innerHTML += "Game Over :(";
  valid = false;

  setTimeout(function() {
    document.getElementById('won-lose-mssg').innerHTML = "";

    heart1.reset();

      valid = true;
  }, 3000);

  }

};

// resert the player's position
Player.prototype.reset = function(){
  this.x = 200;
  this.y = 380;
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(move){

  if(move === 'right' && this.x < 400){
    this.x += 45;
  }
  if(move === 'left' && this.x > 0){
    this.x -= 45;
  }
  if(move === 'up' && this.y > 0){
    this.y -= 45;
  }
  if(move === 'down' && this.y < 400){
    this.y += 45;
  }
  if(move === 'shift'){
    document.getElementById('won-lose-mssg').innerHTML ="";
    valid = true;
    this.reset();
  }
};
// Now instantiate your objects.
// Place all three Hearts Objects in an array call allHearts
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var heart1 = new Heart(100, 570);
var heart2 = new Heart(200, 570);
var heart3 = new Heart(300, 570);

var allHearts = [heart1, heart2, heart3];

var enemy1 = new Enemy(-100, 60);
var enemy2 = new Enemy(-200, 140);
var enemy3 = new Enemy(-300, 230);
var enemy4 = new Enemy(-400, 140);
var enemy5 = new Enemy(-500, 60);
var enemy6 = new Enemy(-700, 230);

var allEnemies = [enemy1, enemy2, enemy3, enemy4, enemy5, enemy6];

var player = new Player(200, 380);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
// Added 'shift' for the played if he/she wanted to continue playing til loosing
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        16: 'shift',
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

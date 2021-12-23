// The engine class will only be instantiated once. It contains all the logic
// of the game relating to the interactions between the player and the
// enemy and also relating to how our enemies are created and evolve over time
class Engine {
	// The constructor has one parameter. It will refer to the DOM node that we will be adding everything to.
	// You need to provide the DOM node when you create an instance of the class
	constructor(theRoot) {
		// We need the DOM element every time we create a new enemy so we
		// store a reference to it in a property of the instance.
		this.root = theRoot;
		// We create our hamburger.
		// Please refer to Player.js for more information about what happens when you create a player
		this.player = new Player(this.root);
		// Initially, we have no enemies in the game. The enemies property refers to an array
		// that contains instances of the Enemy class
		this.enemies = [];

		this.score = 0;
		// We add the background image to the game
		addBackground(this.root);

		// console.log(this.player)
		// console.log(this.enemies)

		this.lives = 5;

		this.heartOne = document.querySelector(".heart1");
		this.heartTwo = document.querySelector(".heart2");
		this.heartThree = document.querySelector(".heart3");
		this.heartFour = document.querySelector(".heart4");
		this.heartFive = document.querySelector(".heart5");
	}

	// The gameLoop will run every few milliseconds. It does several things
	//  - Updates the enemy positions
	//  - Detects a collision between the player and any enemy
	//  - Removes enemies that are too low from the enemies array
	gameLoop = () => {
		// This code is to see how much time, in milliseconds, has elapsed since the last
		// time this method was called.
		// (new Date).getTime() evaluates to the number of milliseconds since January 1st, 1970 at midnight.
		if (this.lastFrame === undefined) {
			this.lastFrame = new Date().getTime();
		}

		let timeDiff = new Date().getTime() - this.lastFrame;

		this.lastFrame = new Date().getTime();
		// We use the number of milliseconds since the last call to gameLoop to update the enemy positions.
		// Furthermore, if any enemy is below the bottom of our game, its destroyed property will be set. (See Enemy.js)
		this.enemies.forEach((enemy) => {
			enemy.update(timeDiff);
		});

		// We remove all the destroyed enemies from the array referred to by \`this.enemies\`.
		// We use filter to accomplish this.
		// Remember: this.enemies only contains instances of the Enemy class.
		this.enemies = this.enemies.filter((enemy) => {
			if (enemy.destroyed) {
				this.score++;
				document.getElementById("score").innerText = "Score:" + this.score;
				// console.log(this.score);
			} else {
				return !enemy.destroyed;
			}
		});

		// We need to perform the addition of enemies until we have enough enemies.
		while (this.enemies.length < MAX_ENEMIES) {
			// We find the next available spot and, using this spot, we create an enemy.
			// We add this enemy to the enemies array
			const spot = nextEnemySpot(this.enemies);
			this.enemies.push(new Enemy(this.root, spot));
		}

		// We check if the player is dead. If he is, we alert the user
		// and return from the method (Why is the return statement important?)

		if (this.isPlayerDead() || this.score === 100) {
			window.alert("Game over");
			location.reload();
			return;
		}

		// If the player is not dead, then we put a setTimeout to run the gameLoop in 20 milliseconds
		setTimeout(this.gameLoop, 20);
	};

	isPlayerDead = () => {
		// this checks if enemies hit the player. In the engine, we should decrement the lives of player for every enemy that hits the player for a maxium of three times until game is over.
		// let theyHit = false;

		//the for loop is looping over the enemies array, to find each enemy object because we have to verify if any of the enemy objects collide with the player object.
		for (let i = 0; i < this.enemies.length; i++) {
			//the if statement is comparing individual enemy object's x + y axis to the player x + y axis.
			// the enemy y axis has to include the height of the entire enemy because the y axis point can be anywhere along the enemy height and has to be greater to or equal to the player's y axis which signifies their hitboxes colliding.

			if (this.enemies[i].y + ENEMY_HEIGHT >= this.player.y) {
				//If any enemy object's x axis point collides w/ the player's x axis point
				if (this.enemies[i].x >= this.player.x) {
					// if the enemies object x axis point + enemy width collides w/ player x axis point + player width (x point can be anywhere along the width of enemies or player.)
					if (this.enemies[i].x + ENEMY_WIDTH <= this.player.x + PLAYER_WIDTH) {
						this.enemies[i].hitPlayer = true;
						this.enemies[i].destroyed = true;

						// if any of the enemies are destroyed by collision we want to remove that enemey object.
						if (this.enemies[i].destroyed) {
							this.enemies[i].domElement.remove();
						}
						// console.log(this.enemies[i].hitPlayer);

						// player losing lives on collision
						if (this.lives > 0) {
							this.lives--;

							if (this.lives === 4) {
								// console.log(this.lives);

								this.heartFive.remove();
							}

							if (this.lives === 3) {
								// console.log(this.lives);
								this.heartFour.remove();
							}
							if (this.lives === 2) {
								// console.log(this.lives);

								this.heartThree.remove();
							}

							if (this.lives === 1) {
								// console.log(this.lives);

								this.heartTwo.remove();
							}

							if (this.lives === 0) {
								// console.log(this.lives);

								this.heartOne.remove();
							}

							// this.heartThree.remove()

							// player losing game if lives = 0
							if (this.lives === 0) {
								return true;
							}
						}
					}
				}
			}
		}
		return false;
	};
}

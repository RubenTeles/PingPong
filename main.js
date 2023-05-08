import { Player } from './player.js';
import { InputHandler } from './input.js';;
import { Ball } from './ball.js';;

window.addEventListener('load', function(){
    const canvas = this.document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = 1000;
    canvas.height = 650;
    const background = this.document.createElement("img");
    background.src="assets/background42.jpg"
    const ball = this.document.createElement("img2");
    ball.src="assets/pingpong.png"
    // <img id="player" >
    // <img id="ball" src="assets/pingpong.png">
    // <img id="background" src="assets/background42.jpg">

    class Game {
        constructor(width, height){
            this.width = width;
            this.height = height;
            this.inputKey = new InputHandler();
            this.Player1 = new Player(this, 1);
            this.Player2 = new Player(this, 2);
            this.Ball = new Ball(this);
            this.player1Score = 0;
            this.player2Score = 0;
        }
        point(player){
            if (player === 1)
                this.player1Score++;
            else
                this.player2Score++;
        }
        update(){
            this.Player1.update(this.inputKey.keys);
            this.Player2.update(this.inputKey.keys);
            this.Ball.update(this.Player1, this.Player2);
        }
        draw(context){
            //context.drawImage(background, 0, 0, this.width, this.height);
            this.Player1.draw(context);
            this.Player2.draw(context);
            this.drawScore(context);
            this.Ball.draw(context);
        }
        drawScore(ctx) {
            ctx.font = "50px Arial";
            ctx.fillStyle = 'black';
            ctx.fillText(this.player1Score + " : " + this.player2Score, this.width / 2 - 40, 50);
        }

    }
    
    const game = new Game(canvas.width, canvas.height);
    console.log(game);

    function animate()
    {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        game.update();
        game.draw(ctx);
        requestAnimationFrame(animate);
    }
    animate();
});
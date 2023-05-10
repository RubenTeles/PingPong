import { Player } from './player.js';
import { InputHandler } from './input.js';;
import { Ball } from './ball.js';
import { Table } from "./table.js";
/*import avatarDefault from "./assets/avatar_default.jpg";
import marvin from "./assets/marvin.png";*/

window.addEventListener('load', function(){
    const canvas = this.document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
  canvas.width = 1000;
  canvas.height = 750;

    class Game {
        width;
        height;
        offSet = 0;
        maxPoint = 3;
        inputKey;
        Player1;
        Player2;
        Ball;
        constructor(width, height, offSet, maxPoint) {
            this.width = width;
            this.height = height;
            this.offSet = offSet;
            this.maxPoint = maxPoint;
            this.inputKey = new InputHandler();
            this.Player1 = new Player(this, 1, "Player 1", null);
            this.Player2 = new Player(this, 2, "Player 2", null);
            this.Ball = new Ball(this);
        }

        drawScore(ctx) {
          ctx.font = "50px 'Press Start 2P', cursive";
          ctx.fillStyle = "black";
    
          ctx.strokeStyle = "black";
          ctx.lineWidth = 10;
          this.Player1.score
          ctx.strokeText(this.Player1.score + " : " + this.Player2.score, this.width / 2 - 120, 90);
    
          ctx.fillStyle = "white";
          ctx.fillText(this.Player1.score + " : " + this.Player2.score, this.width / 2 - 120, 90);
        }

        draw(context) {
          this.Player1.draw(context);
          this.Player2.draw(context);
          this.drawScore(context);
          this.Ball.draw(context);
          if (this.isEndGame()) this.endGame(context);
        }

        isEndGame() {
          if (this.Player1.score === this.maxPoint || this.Player2.score === this.maxPoint) return true;
          return false;
        }
    
        endGame(context) {
          context.font = "100px 'Press Start 2P', cursive";
          context.fillStyle = "black";
    
          context.strokeStyle = "black";
          context.lineWidth = 10;
          context.strokeText("GAME OVER", 56, 380);
          context.strokeText("____ ____", 56, 405);
    
          context.fillStyle = "yellow";
          context.fillText("GAME OVER", 56, 380);
          context.fillText("____ ____", 56, 405);
        }

        update() {
          if (!this.isEndGame()) this.Ball.update(this.Player1, this.Player2);
    
          this.Player1.update(this.inputKey.keys);
          this.Player2.update(this.inputKey.keys);
        }
    
    }
    
    const game = new Game(canvas.width, canvas.height - 228, 164, 3);
    const tableBoard = new Table(canvas.width, canvas.height, "DarkSlateBlue", "#1e8c2f");
    console.log(game);

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      tableBoard.draw(ctx);
      game.update();
      game.draw(ctx);
      requestAnimationFrame(animate);
    }
    animate();
});
export class Player {
    game;
    width = 30;
    height = 100;
    player;
    y;
    x = 0;
    speed = 10;
    score = 0;
    nickname;
    avatar = new Image();

    constructor(game, player_n, nickname, avatar) {
        this.game = game;
        this.player = player_n;
        this.y = game.height / 2 - this.height / 2 + this.game.offSet;
        if (this.player === 1) this.x = 50;
        else if (this.player === 2) this.x = game.width - this.width - 50;
        this.nickname = nickname;
       // this.avatar.src = avatar;
      }
    
      moveUp() {
        if (this.y > this.game.offSet) this.y -= this.speed;
      }
    
      moveDown() {
        if (this.y < this.game.height - this.height + this.game.offSet) this.y += this.speed;
      }
    
      point() {
        this.score++;
      }
    
      update(input) {
        if (this.player === 1) {
          if (input.includes("w")) this.moveUp();
          if (input.includes("s")) this.moveDown();
        } else if (this.player === 2) {
          if (input.includes("ArrowUp")) this.moveUp();
          if (input.includes("ArrowDown")) this.moveDown();
        }
      }
    
      
      drawNickName(ctx) {
        let pos_x = 100;
        let collor = "red";
        if (this.player === 2) {
          pos_x = this.game.width - 100 - 200;
          collor = "blue";
        }
    
        ctx.font = "50px 'Press Start 2P', cursive";
        ctx.strokeStyle = "black";
        ctx.lineWidth = 10;
        ctx.fillStyle = collor;
    
        ctx.strokeText(this.nickname, pos_x, 89, 200);
        ctx.fillText(this.nickname, pos_x, 89, 200);
      }
    
      drawPhoto(context, whidth) {
        context.drawImage(this.avatar, whidth ? whidth - 25 : 25 , 35, 50, 50);
        context.strokeStyle = "black";
        context.lineWidth = 3;
        context.strokeRect(whidth ? whidth - 25 : 25, 35, 50, 50);
      }
    
      drawPlayer(context, color) {
        context.fillStyle = color;
        context.fillRect(this.x, this.y, this.width, this.height);
    
        context.strokeStyle = "black";
        context.lineWidth = 3;
    
        context.strokeRect(this.x, this.y, this.width, this.height);
      }
      
      draw(context) {
        if (this.player === 1) {
          //this.drawPhoto(context);
          this.drawNickName(context);
          this.drawPlayer(context, "red");
        } else if (this.player === 2) {
        //  this.drawPhoto(context, this.game.width - 50);
          this.drawNickName(context);
          this.drawPlayer(context, "blue");
        }
      }
}
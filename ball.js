export class Ball {
    //Macros
    speedIncrement = 1;
    speedStart = 5;
  
    game;
    width = 25;
    height = 25;
    x = 0;
    y = 0;
    dir = 1;
    speed;
    angle = 0;

    constructor(game) {
        this.game = game;
        this.x = game.width / 2 - this.width / 2;
        this.y = this.game.height / 2 - this.height / 2 + this.game.offSet;
        this.dir = Math.floor(Math.random() * 2) + 1;
        this.speed = this.speedStart;
        this.angle = this.dir === 1 ? this.generateRandomAngle(135, 225) : this.generateRandomAngle(-45, 45);
      }
    
      generateRandomAngle(minAngle, maxAngle) {
        const range = maxAngle - minAngle;
        const randomAngle = Math.random() * range + minAngle;
        return (randomAngle * Math.PI) / 180;
      }
    
      update(player1, player2) {
        // Move a bola com base em sua velocidade e ângulo
        this.x += this.speed * Math.cos(this.angle);
        this.y += this.speed * Math.sin(this.angle);
    
        const random = this.generateRandomAngle(-1, 1);
        // Verifica se a bola colidiu com a raquete do jogador 1
        if (this.dir === 1) {
          if (
            this.x >= player1.x &&
            this.x <= player1.x + player1.width &&
            this.y + this.height / 2 >= player1.y &&
            this.y + this.height / 2 <= player1.y + player1.height
          ) {
            // Inverte a direção da bola
            this.angle = Math.PI - this.angle;
    
            // Ajusta o ângulo com base no ponto de contato na raquete
            let relativeIntersectY = player1.y + player1.height / 2 - (this.y + this.height / 2);
            let normalizedRelativeIntersectionY = relativeIntersectY / (player1.height / 2);
            this.angle -= normalizedRelativeIntersectionY * (Math.PI / 4);
    
            this.angle += random;
    
            this.dir = 2;
            this.speed += this.speedIncrement;
          }
        }
        // Verifica se a bola colidiu com a raquete do jogador 2
        else if (this.dir === 2) {
          if (
            this.x + this.width >= player2.x &&
            this.x + this.width <= player2.x + player2.width &&
            this.y + this.height / 2 >= player2.y &&
            this.y + this.height / 2 <= player2.y + player2.height
          ) {
            // Inverte a direção da bola
            this.angle = Math.PI - this.angle;
    
            // Ajusta o ângulo com base no ponto de contato na raquete
            let relativeIntersectY = player2.y + player2.height / 2 - (this.y + this.height / 2);
            let normalizedRelativeIntersectionY = relativeIntersectY / (player2.height / 2);
            this.angle = normalizedRelativeIntersectionY * (Math.PI / 4) + Math.PI;
    
            this.angle += random;
    
            this.dir = 1;
            this.speed += this.speedIncrement;
          }
        }
    
        // Verifica se a bola colidiu com as paredes superior ou inferior
        if (this.y < this.game.offSet || this.y + this.height > this.game.height + this.game.offSet) {
          // Inverte a direção da bola
          this.angle = -this.angle;
        }
    
        // Verifica se a bola saiu do campo e marca um ponto
        if (this.x <= 0 || this.x + this.width >= this.game.width) {
          if (this.x <= 0) {
            // Marca um ponto para o jogador 2
            this.game.Player2.point();
            this.angle = this.generateRandomAngle(-45, 45);
            this.dir = 2;
          } else {
            // Marca um ponto para o jogador 1
            this.game.Player1.point();
            this.angle = this.generateRandomAngle(135, 225);
            this.dir = 1;
          }
          // Reinicia a posição e o ângulo da bola
          this.x = this.game.width / 2 - this.width / 2;
          this.y = this.game.height / 2 - this.height / 2 + this.game.offSet;
          this.speed = this.speedStart;
        }
      }
      draw(context) {
        if (this.dir === 1) context.fillStyle = "red";
        else if (this.dir === 2) context.fillStyle = "blue";
    
        context.beginPath();
        context.arc(this.x + this.width / 2, this.y + this.height / 2, this.width / 2, 0, 360);
        context.fill();
        context.strokeStyle = 'black';
        context.lineWidth = 3;
        context.stroke();
      }
}
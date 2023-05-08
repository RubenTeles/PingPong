export class Ball {
    constructor(game){

        //Macros
        this.speedIncrement = 1;
        this.speedStart = 5;

        this.game = game;
        this.width = 25;
        this.height = 25;
        this.x = game.width / 2 - this.width / 2;
        this.y = game.height / 2 - this.height / 2;
        this.number = Math.floor(Math.random() * 2) + 1;
        this.speed = this.speedStart;
        this.angle = this.number === 1 ? this.generateRandomAngle(135, 225) : this.generateRandomAngle(-45, 45);
    }

    generateRandomAngle(minAngle, maxAngle) {
        const range = maxAngle - minAngle;
        const randomAngle = Math.random() * range + minAngle;
        return randomAngle * Math.PI / 180;
    }

    update(player1, player2){
            // Move a bola com base em sua velocidade e ângulo
            this.x += this.speed * Math.cos(this.angle);
            this.y += this.speed * Math.sin(this.angle);

            const random = this.generateRandomAngle(-1, 1);
            // Verifica se a bola colidiu com a raquete do jogador 1
            if (this.number === 1) {
                if ((this.x >= player1.x && this.x <= player1.x + player1.width) &&
                    (this.y + this.height / 2 >= player1.y && this.y + this.height / 2 <= player1.y + player1.height)) {

                    // Inverte a direção da bola
                    this.angle = Math.PI - this.angle;

                    // Ajusta o ângulo com base no ponto de contato na raquete
                    let relativeIntersectY = (player1.y + player1.height / 2) - (this.y + this.height / 2);
                    let normalizedRelativeIntersectionY = relativeIntersectY / (player1.height / 2);
                    this.angle -= normalizedRelativeIntersectionY * (Math.PI / 4);
                    
                    this.angle += random;
                    
                    this.number = 2;
                    this.speed += this.speedIncrement;
                }
            }
            // Verifica se a bola colidiu com a raquete do jogador 2
            else if (this.number === 2) {
                if ((this.x + this.width >= player2.x && this.x + this.width <= player2.x + player2.width) &&
                    (this.y + this.height / 2 >= player2.y && this.y + this.height / 2 <= player2.y + player2.height)) {

                    // Inverte a direção da bola
                    this.angle = Math.PI - this.angle;

                    // Ajusta o ângulo com base no ponto de contato na raquete
                    let relativeIntersectY = (player2.y + player2.height / 2) - (this.y + this.height / 2);
                    let normalizedRelativeIntersectionY = relativeIntersectY / (player2.height / 2);
                    this.angle = normalizedRelativeIntersectionY * (Math.PI / 4) + Math.PI;

                    this.angle += random;

                    this.number = 1;
                    this.speed += this.speedIncrement;
            }
        }

        // Verifica se a bola colidiu com as paredes superior ou inferior
        if (this.y < 0 || this.y + this.height > this.game.height) {
            // Inverte a direção da bola
            this.angle = -this.angle;
        }

        // Verifica se a bola saiu do campo e marca um ponto
        if (this.x <= 0 || this.x + this.width >= this.game.width) {
            if (this.x <= 0) {
                // Marca um ponto para o jogador 2
                this.game.point(2);
                this.angle = this.generateRandomAngle(-45, 45);
                this.number = 2;
            } else {
                // Marca um ponto para o jogador 1
                this.game.point(1);
                this.angle = this.generateRandomAngle(135, 225);
                this.number = 1;
            }
            // Reinicia a posição e o ângulo da bola
            this.x = this.game.width / 2 - this.width / 2;
            this.y = this.game.height / 2 - this.height / 2;
            this.speed = this.speedStart;
        }

    }
    draw(context, ball){

        if (this.number === 1)
            context.fillStyle = 'red';
        else if (this.number === 2)
            context.fillStyle = 'green';

        context.fillRect(this.x, this.y, this.width, this.height);
    }
}
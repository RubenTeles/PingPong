export class Ball {
    constructor(game){
        this.game = game;
        this.width = 25;
        this.height = 25;
        this.x = game.width / 2 - this.width / 2;
        this.y = game.height / 2 - this.height / 2;
        this.number = 1;
        this.speed = 3;
    }
    update(player1, player2){
        if (this.number === 1)
        {
            this.x -= this.speed;
        }
        else if (this.number === 2)
        {
            this.x += this.speed;
        }

        if (this.number === 1)
        {
            if ((this.x >= player1.x && player1.x + player1.width >= this.x) &&
                ((this.y >= player1.y && player1.y + player1.height >= this.y) 
                ||(this.y + this.height >= player1.y && player1.y + player1.height >= this.y + this.height)))
                this.number = 2;
                this.speed += 0.005;
        }
        else if (this.number === 2)
        {
            if ((this.x + this.width >= player2.x && player2.x + player2.width >= this.x + this.width) &&
                ((this.y >= player2.y && player2.y + player2.height >= this.y)
                || (this.y + this.height >= player2.y && player2.y + player2.height >= this.y + this.height)))
                this.number = 1;
                this.speed += 0.005;
        }

        if (this.x < 0)
            this.x = 0;
        else if (this.x + this.width > this.game.width)
            this.x = this.game.width - this.width;

    }
    draw(context){
        if (this.number === 1)
            context.fillStyle = 'red';
        else if (this.number === 2)
            context.fillStyle = 'green';

        context.fillRect(this.x, this.y, this.width, this.height);
    }
}
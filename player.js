export class Player {
    constructor(game, player_n){
        this.game = game;
        this.width = 30;
        this.height = 100;
        this.number = player_n;
        this.y = game.height / 2 - this.height / 2;
        if (this.number == 1)
            this.x = 50;
        else if (this.number == 2)
           this.x = game.width - 100;

    }
    update(){
    }
    draw(context){
        if (this.number == 1)
            context.fillStyle = 'red';
        else if (this.number == 2)
            context.fillStyle = 'green';

        context.fillRect(this.x, this.y, this.width, this.height);
    }
}
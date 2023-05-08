export class Player {
    constructor(game, player_n){
        this.game = game;
        this.width = 30;
        this.height = 100;
        this.number = player_n;
        this.y = game.height / 2 - this.height / 2;
        if (this.number === 1)
            this.x = 50;
        else if (this.number === 2)
           this.x = game.width - this.width - 50;
        this.speed = 7.5;

    }
    update(input){
        if (this.number === 1)
        {
            if (input.includes('w') && this.y > 0) this.y -= this.speed;
            if (input.includes('s') && this.y < this.game.height - this.height) this.y += this.speed;
        }
        else if (this.number === 2)
        {
            if (input.includes('ArrowUp') && this.y > 0) this.y -= this.speed;
            if (input.includes('ArrowDown') && this.y < this.game.height - this.height) this.y += this.speed;
        }
        
        /*const event = new CustomEvent('PlayerYChanged', { detail: { playerNumber: this.number, y: this.y }});
        window.dispatchEvent(event);
        if (input.includes('ArrowDown'))
        {
            window.addEventListener('PlayerYChanged', (e) => {
                console.log(`Player ${e.detail.playerNumber} Y position changed to ${e.detail.y} to ${e.detail.gamewi}`);
            });

        }*/
        //this.x++;
    }
    draw(context){
        if (this.number === 1)
            context.fillStyle = 'red';
        else if (this.number === 2)
            context.fillStyle = 'green';

        context.fillRect(this.x, this.y, this.width, this.height);
    }
}
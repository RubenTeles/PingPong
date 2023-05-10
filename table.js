export class Table {
	width = 30;
	height = 100;
	background;
	color;
  
	constructor(width, height, background, color) {
	  this.width = width;
	  this.height = height;
	  this.background = background;
	  this.color = color;
	}
  
	draw(context) {
	  this.drawBackGround(context);
	  this.drawTableColor(context);
	  this.drawLines(context);
	}
  
	drawLines(context)
	{
	  context.fillStyle = "white";
	  context.fillRect(78, this.height - 330, this.width - 154, 10);
	  context.fillRect(this.width / 2 - 5, 152, 10, this.height - 205);
	  context.fillStyle = "black";
	  context.beginPath();
	  context.arc(this.width / 2, 146, 20 / 2, 0, 360);
	  context.arc(this.width / 2, this.height - 46, 20 / 2, 0, 360);
	  context.fill();
	}
  
	drawTableColor(context)
	{
	  context.fillStyle = this.color;
	  context.fillRect(78, 174, this.width - 158, this.height - 248);
	}
  
	drawBackGround(context)
	{
	  context.fillStyle = this.background;
	  context.fillRect(0, 0, this.width, this.height);
	  context.fillStyle = "white";
	  context.fillRect(68, 164, this.width - 137, this.height - 228);
	}
  
  }
  
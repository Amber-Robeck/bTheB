const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
canvas.width = 1024;
canvas.height = 576;

ctx.fillStyle = 'lightgrey';
ctx.fillRect(0, 0, canvas.width, canvas.height);

//draw image needs an html image object not src
const image = new Image();
image.src = './assets/images/mapOne.png';

const playerImage = new Image();
playerImage.src = './assets/images/ACharDown.png';

image.onload = () => {
    //image, x start, y start
    ctx.drawImage(image, -1700, -400);
    ctx.drawImage(playerImage, canvas.width / 2, canvas.height / 2, 175, 175);
};

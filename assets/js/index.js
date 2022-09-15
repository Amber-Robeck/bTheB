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
    ctx.drawImage(image, -1745, -400);
    //image, crop x4, x start, y start, width, height
    ctx.drawImage(
        playerImage,
        0,
        0,
        playerImage.width / 2,
        playerImage.height / 2,
        canvas.width / 2 - playerImage.width,
        canvas.height / 2 - playerImage.height / 2,
        100,
        100);
};

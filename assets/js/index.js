const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
canvas.width = 1024;
canvas.height = 576;

ctx.fillStyle = 'lightgrey';
ctx.fillRect(0, 0, canvas.width, canvas.height);

//draw image needs an html image object not src
const image = new Image();
image.src = './assets/images/mapOne.png';

image.onload = () => {
    //image, x start, y start
    ctx.drawImage(image, 0, 0);
};


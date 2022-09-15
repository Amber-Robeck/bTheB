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

class Sprite {
    constructor({
        position,
        image
    }) {
        this.position = position
        this.image = image
    }

    draw() {
        ctx.drawImage(this.image, this.position.x, this.position.y);
    }
};

const background = new Sprite({ position: { x: -1745, y: -400 }, image: image })

const keys = {
    w: {
        pressed: false
    },
    s: {
        pressed: false
    },
    a: {
        pressed: false
    },
    d: {
        pressed: false
    }
};

//animation loop
function animate() {
    window.requestAnimationFrame(animate);

    //Draw map and player
    background.draw();
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

    //background movement
    if (keys.w.pressed) {
        background.position.y += 3;
    }
    else if (keys.s.pressed) {
        background.position.y -= 3;
    }
    else if (keys.a.pressed) {
        background.position.x += 3;
    }
    else if (keys.d.pressed) {
        background.position.x -= 3;
    }
};
animate();

//Player movement
window.addEventListener('keydown', (e) => {
    // console.log('pressed', e);
    switch (e.key) {
        case 'w':
            console.log('Pressed w/up')
            keys.w.pressed = true;
            // console.log('keys', keys)
            break;
        case 's':
            console.log('Pressed s/down')
            keys.s.pressed = true;
            break;
        case 'a':
            console.log('Pressed a/left')
            keys.a.pressed = true;
            break;
        case 'd':
            console.log('Pressed d/right')
            keys.d.pressed = true;
            break;
    }
});

window.addEventListener('keyup', (e) => {
    switch (e.key) {
        case 'w':
            keys.w.pressed = false;
            break;
        case 's':
            keys.s.pressed = false;
            break;
        case 'a':
            keys.a.pressed = false;
            break;
        case 'd':
            keys.d.pressed = false;
            break;
    }
});
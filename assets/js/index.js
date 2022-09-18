const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
canvas.width = 1024;
canvas.height = 576;

// ctx.fillStyle = 'lightgrey';
// ctx.fillRect(0, 0, canvas.width, canvas.height);

//Collisions
const collisionsArray = [];
//map 70x40 for every 70(row) create new array
for (let index = 0; index < collisions.length; index += 70) {
    collisionsArray.push(collisions.slice(index, index + 70));
};
// console.log(collisionsArray)

//map exported at 4X (12)
class Boundary {
    static width = 48
    static height = 48
    constructor({ position }) {
        this.position = position
        this.width = 48
        this.height = 48
    }

    draw() {
        ctx.fillStyle = 'rgba(255, 0, 0, 0.0)'
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
};

const offset = {
    x: -1745,
    y: -400
};

const boundaries = [];

collisionsArray.forEach((row, i) => {
    row.forEach((bdry, j) => {
        if (bdry == 1025) {
            boundaries.push(new Boundary({ position: { x: j * Boundary.width + offset.x, y: i * Boundary.height + offset.y } }))
        }
    })
})
console.log(boundaries)
//draw image needs an html image object not src
//background image is 3360x1920
const image = new Image();
image.src = './assets/images/mapOne.png';

//foreground image
const foregroundImage = new Image();
foregroundImage.src = './assets/images/foreground.png';

//sprite player is 48x48
const playerImage = new Image();
playerImage.src = './assets/images/ACharDown.png';
let lastKey = '';

class Sprite {
    constructor({
        position,
        image,
        frames = { max: 1 },
        resize = { x: 3360, y: 1920 }
    }) {
        this.position = position
        this.image = image
        this.frames = frames
        this.resize = resize
        this.image.onload = () => {
            this.width = this.image.width / this.frames.max
            this.height = this.image.height / this.frames.max
            console.log('width', this.width, 'height', this.height)
        }
    }

    draw() {
        //image, crop x4, x start, y start, width, height
        ctx.drawImage(
            this.image,
            0,
            0,
            this.image.width / this.frames.max,
            this.image.height / this.frames.max,
            this.position.x,
            this.position.y,
            this.resize.x,
            this.resize.y
        );
    }
};

const player = new Sprite({
    position: {
        x: canvas.width / 2 - 52,
        y: canvas.height / 2 + -35
    },
    image: playerImage,
    frames: {
        max: 2
    },
    resize: {
        x: 100,
        y: 100
    }
});

const background = new Sprite({ position: { x: offset.x, y: offset.y }, image: image });
const foreground = new Sprite({ position: { x: offset.x, y: offset.y }, image: foregroundImage });

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

// const testBoundary = new Boundary({ position: { x: 400, y: 400 } });

const movables = [background, foreground, ...boundaries];

function isCollision({ rectangle1, rectangle2 }) {
    const numberOffset = 24;
    const numberTwoOffset = 36;
    return (rectangle1.position.x + rectangle1.width >= rectangle2.position.x - numberTwoOffset &&
        rectangle1.position.x + numberOffset <= rectangle2.position.x + rectangle2.width &&
        rectangle1.position.y + numberOffset <= rectangle2.position.y + rectangle2.height &&
        rectangle1.position.y + rectangle1.height >= rectangle2.position.y - + numberTwoOffset
    )
}

//animation loop
function animate() {
    window.requestAnimationFrame(animate);

    //Draw map and player
    background.draw();
    //boundary
    boundaries.forEach(bdry => {
        bdry.draw()
        //collision detection
        if (isCollision({
            rectangle1: player,
            rectangle2: bdry
        })
        ) {
            console.log('collision')
        }

    });
    player.draw();

    foreground.draw();


    //background movement
    let movement = true;
    if (keys.w.pressed && lastKey === 'w') {
        for (let index = 0; index < boundaries.length; index++) {
            const bdry = boundaries[index];
            if (isCollision({
                rectangle1: player,
                rectangle2: {
                    ...bdry, position: {
                        x: bdry.position.x,
                        y: bdry.position.y + 3
                    }
                }
            })
            ) {
                console.log('collision')
                movement = false;
                break
            }
        }
        if (movement) {
            movables.forEach((moveable) => { moveable.position.y += 3 });
        }
    }
    else if (keys.s.pressed && lastKey === 's') {
        for (let index = 0; index < boundaries.length; index++) {
            const bdry = boundaries[index];
            if (isCollision({
                rectangle1: player,
                rectangle2: {
                    ...bdry, position: {
                        x: bdry.position.x,
                        y: bdry.position.y - 3
                    }
                }
            })
            ) {
                console.log('collision')
                movement = false;
                break
            }
        }
        if (movement) {
            movables.forEach((moveable) => { moveable.position.y -= 3 });
        }
    }
    else if (keys.a.pressed && lastKey === 'a') {
        for (let index = 0; index < boundaries.length; index++) {
            const bdry = boundaries[index];
            if (isCollision({
                rectangle1: player,
                rectangle2: {
                    ...bdry, position: {
                        x: bdry.position.x + 3,
                        y: bdry.position.y
                    }
                }
            })
            ) {
                console.log('collision')
                movement = false;
                break
            }
        }
        if (movement) {
            movables.forEach((moveable) => { moveable.position.x += 3 });
        }
    }
    else if (keys.d.pressed && lastKey === 'd') {
        for (let index = 0; index < boundaries.length; index++) {
            const bdry = boundaries[index];
            if (isCollision({
                rectangle1: player,
                rectangle2: {
                    ...bdry, position: {
                        x: bdry.position.x - 3,
                        y: bdry.position.y
                    }
                }
            })
            ) {
                console.log('collision')
                movement = false;
                break
            }
        }
        if (movement) {
            movables.forEach((moveable) => { moveable.position.x -= 3 });
        }
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
            lastKey = 'w';
            // console.log('keys', keys)
            break;
        case 's':
            console.log('Pressed s/down')
            keys.s.pressed = true;
            lastKey = 's';
            break;
        case 'a':
            console.log('Pressed a/left')
            keys.a.pressed = true;
            lastKey = 'a';
            break;
        case 'd':
            console.log('Pressed d/right')
            keys.d.pressed = true;
            lastKey = 'd';
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
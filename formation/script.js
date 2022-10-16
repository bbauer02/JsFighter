
const canvas = document.querySelector("#screenGame");
const c = canvas.getContext("2d");

canvas.width=1024;
canvas.height=576;

const gravity = 0.2;
c.fillRect(0,0, canvas.width,canvas.height);

class Sprite {
    constructor({velocity, position })
    {
        this.position = position;
        this.velocity = velocity;
        this.width = 50;
        this.height = 150;
    }

    draw() {
        c.fillStyle = 'red';
        c.fillRect(this.position.x, this.position.y, this.width, this.height);
    }

    update() {
        this.draw();
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
        if(this.position.y + this.height + this.velocity.y >=  canvas.height ) {
            this.velocity.y = 0;
        }
        else {
            this.velocity.y += gravity;
        }
    }
}
const player = new Sprite( { position : { x:10,y:0 } , velocity:{x:0, y:0}}  );
const enemy = new Sprite({velocity : {x:0, y:0}, position : {x: 964, y:0 }});

const keys = {
    d: {
        pressed: false
    },
    q: {
        pressed: false
    },
    z: {
        pressed: false
    }
}

let lastKey;
function animate() {
    window.requestAnimationFrame( animate );
    c.clearRect(0,0, canvas.width, canvas.height);
    player.update();
    enemy.update();
    player.velocity.x = 0;
    if(keys.d.pressed && lastKey === 'd') {
        player.velocity.x = 1;
    } else if (keys.q.pressed && lastKey === 'q') {
        player.velocity.x = -1;
    }

}
animate()


window.addEventListener("keydown", (e) => {
    switch (e.key) {
        case  "d" :
            keys.d.pressed = true;
            lastKey = "d";
            break;
        case  "q" :
            keys.q.pressed = true
            lastKey = "q";
            break;
        case  "z" :
            player.velocity.y = -10;
            break;
    }

    console.log(e.key)
})


window.addEventListener("keyup", (e) => {
    switch (e.key) {
        case  "d" :
            keys.d.pressed = false
            break;
        case  "q" :
            keys.q.pressed = false
            break;
        case  "z" :
            keys.z.pressed = false
            break;
    }
})



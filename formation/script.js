
const canvas = document.querySelector("#screenGame");
const c = canvas.getContext("2d");

canvas.width=1024;
canvas.height=576;

const gravity = 0.7;
c.fillRect(0,0, canvas.width,canvas.height);

class Sprite {
    constructor({velocity, position })
    {
        this.position = position;
        this.velocity = velocity;
        this.width = 50;
        this.height = 150;
        this.lastKey = "";
        this.attackBox = {
            position: this.position,
            width:100,
            height: 50
        }
    }

    draw() {
        c.fillStyle = 'red';

        c.fillRect(this.position.x, this.position.y, this.width, this.height);
        //Attack Box
        c.fillStyle = 'green';
        c.fillRect(
            this.attackBox.position.x,
            this.attackBox.position.y,
            this.attackBox.width,
            this.attackBox.height
        );
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
    },
    ArrowLeft: {
        pressed: false
    },
    ArrowRight: {
        pressed: false
    },
    ArrowUp: {
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
    enemy.velocity.x=0;
    // Mouvement du joueur
    if(keys.d.pressed && player.lastKey === 'd') {
        player.velocity.x = 5;
    } else if (keys.q.pressed && player.lastKey === 'q') {
        player.velocity.x = -5;
    }
    // Mouvement de l'ennemi
    if(keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight') {
        enemy.velocity.x = 5;
    } else if (keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft') {
        enemy.velocity.x = -5;
    }

}
animate()


window.addEventListener("keydown", (e) => {
    switch (e.key) {
        case  "d" :
            keys.d.pressed = true;
            player.lastKey = "d";
            break;
        case  "q" :
            keys.q.pressed = true
            player.lastKey = "q";
            break;
        case  "z" :
            player.velocity.y = -20;
            break;
        case  "ArrowRight" :
            keys.ArrowRight.pressed = true;
            enemy.lastKey = "ArrowRight";
            break;
        case  "ArrowLeft" :
            keys.ArrowLeft.pressed = true
            enemy.lastKey = "ArrowLeft";
            break;
        case  "ArrowUp" :
            enemy.velocity.y = -20;
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
        case  "ArrowLeft" :
            keys.ArrowLeft.pressed = false
            break;
        case  "ArrowRight" :
            keys.ArrowRight.pressed = false
            break;
    }
})



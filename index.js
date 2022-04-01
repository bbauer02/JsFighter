const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = 1024;
canvas.height = 576;

c.fillRect(0,0,canvas.width,canvas.height);
const gravity = 0.7;

// Class Sprite
class Sprite {
    lastKey;

    constructor({position, velocity, color='red'}) {
        this.position = position;
        this.velocity = velocity;
        this.height = 150;
        this.attackBox = {
            position: this.position , 
            width: 100,
            height: 50,
        }
        this.color=color;
    }
    update() {
        this.draw();
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
        // Si le sprite dépasse du canvas
        if(this.position.y + this.height + this.velocity.y >= canvas.height ) {
            this.velocity.y = 0;
        } else this.velocity.y += gravity
    }
    draw() {
        c.fillStyle = this.color;
        c.fillRect(this.position.x,this.position.y, 50,this.height);

        // attackbox
        c.fillStyle = 'green';
        c.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height);
    }
}


// Main
const player = new Sprite({
    position: {
        x:0,
        y:0
    },
    velocity: {
        x:0,
        y:10
    }
});

const ennemy = new Sprite({
    position: {
        x:400,
        y:100
    },
    velocity: {
        x:0,
        y:0
    },
    color:'blue'
});

const keys = {
    q: {
        pressed: false
    },
    d: {
        pressed: false
    },  
    z: {
        pressed: false
    }, 
    ArrowRight: {
        pressed: false
    },
    ArrowLeft: {
        pressed: false
    },
    ArrowUp: {
        pressed:false
    }
}


function animate() {
    window.requestAnimationFrame(animate);
    c.fillStyle = 'black';
    c.fillRect(0,0, canvas.width, canvas.height);
    player.update();
    ennemy.update();

    player.velocity.x = 0;
    ennemy.velocity.x = 0;

    // Player Movement
    if(keys.q.pressed && player.lastKey === 'q') {
        player.velocity.x = -5;
    } else if (keys.d.pressed && player.lastKey === 'd') {
        player.velocity.x = 5;
    }

    // Ennemy Movement
    if(keys.ArrowLeft.pressed && ennemy.lastKey === 'ArrowLeft') {
        ennemy.velocity.x = -5;
    } else if (keys.ArrowRight.pressed && ennemy.lastKey === 'ArrowRight') {
        ennemy.velocity.x = 5;
    }
    
    // detect for colision
    if(player.attackBox.position.x + player.attackBox.width >= ennemy.position.x && player.attackBox.position.x <= ennemy.position.x + ennemy.width) {
        console.log("colision")
    }

}

animate();

window.addEventListener('keydown', (event) => {
    console.log(event.key);
    switch(event.key) {
        case 'd':
            keys.d.pressed = true;
            player.lastKey = 'd';
            break;
        case 'q':
            keys.q.pressed = true;
            player.lastKey = 'q';
            break;
        case 'z':
            player.velocity.y = -20;
            break;
        
        case 'ArrowRight':
            keys.ArrowRight.pressed = true;
            ennemy.lastKey = 'ArrowRight';
            break;
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = true;
            ennemy.lastKey = 'ArrowLeft';
            break;
        case 'ArrowUp':
            ennemy.velocity.y = -20;
            break;
        
    }

});

window.addEventListener('keyup', (event) => {
    switch(event.key) {
        case 'd':
            keys.d.pressed = false;
            break;
        case 'q':
            keys.q.pressed = false;
            break;
        case 'z':
            keys.z.pressed = false;
            break;

        case 'ArrowRight':
            keys.ArrowRight.pressed = false;
            break;
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false;
            break;
        case 'ArrowUp':
            keys.ArrowUp.pressed = false;
            break;
    }

});
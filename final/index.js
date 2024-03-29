const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = 1024;
canvas.height = 576;

c.fillRect(0,0,canvas.width,canvas.height);
const gravity = 0.7;

const background = new Sprite({
    position: {
        x:0,
        y:0
    },
    imageSrc: './img/background.png'
})

const shop = new Sprite({
    position: {
        x:600,
        y:128
    },
    imageSrc: './img/shop.png',
    scale:2.75,
    framesMax:6
})

// Main
const player = new Fighter({
    position: {
        x:0,
        y:0
    },
    velocity: {
        x:0,
        y:10
    },
    imageSrc: './img/samuraiMack/Idle.png',
    framesMax:8,
    scale:2.5,
    offset: {
        x: 215,
        y:157
    },
    sprites: {
        idle: {
            imageSrc: './img/samuraiMack/Idle.png',
            framesMax:8,
         },
         run: {
            imageSrc: './img/samuraiMack/Run.png',
            framesMax:8
         },
         jump: {
            imageSrc: './img/samuraiMack/Jump.png',
            framesMax:2
         },
         fall: {
            imageSrc: './img/samuraiMack/Fall.png',
            framesMax:2
         },
         attack1: {
            imageSrc: './img/samuraiMack/Attack1.png',
            framesMax:6
         }
    }
});

const enemy = new Fighter({
    position: {
        x:400,
        y:100
    },
    velocity: {
        x:0,
        y:0
    },
    color:'blue',
    offset: {
        x: -50,
        y:0
    },
    imageSrc: './img/kenji/Idle.png',
    framesMax:4,
    scale:2.5,
    offset: {
        x: 215,
        y:167
    },
    sprites: {
        idle: {
            imageSrc: './img/kenji/Idle.png',
            framesMax:4,
         },
         run: {
            imageSrc: './img/kenji/Run.png',
            framesMax:8
         },
         jump: {
            imageSrc: './img/kenji/Jump.png',
            framesMax:2
         },
         fall: {
            imageSrc: './img/kenji/Fall.png',
            framesMax:2
         },
         attack1: {
            imageSrc: './img/kenji/Attack1.png',
            framesMax:4
         }
    }
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
    },
    ArrowDown: {
        pressed:false
    }
}


let timer = 60;
let timerId
function decreaseTimer() {
    if(timer > 0) {
        timerId = setTimeout(decreaseTimer, 1000);
        timer--;
        document.querySelector('#timer').innerHTML = timer;
    }
    else {
        determineWinner({player, enemy, timerId})
    }
}

decreaseTimer();
function animate() {
    window.requestAnimationFrame(animate);
    c.fillStyle = 'black';
    c.fillRect(0,0, canvas.width, canvas.height);
    background.update();
    shop.update();
    player.update();
    enemy.update();

    player.velocity.x = 0;
    enemy.velocity.x = 0;

    // Player Movement
    
    if(keys.q.pressed && player.lastKey === 'q') {
        player.velocity.x = -5;
        player.switchSprite('run');
    } else if (keys.d.pressed && player.lastKey === 'd') {
        player.velocity.x = 5;
        player.switchSprite('run');
    } else {
        player.switchSprite('idle');
    }
    // jumping
    if(player.velocity.y < 0) {
        player.switchSprite('jump');
    } else if (player.velocity.y > 0) {
        player.switchSprite('fall');
    }
    // enemy Movement
    if(keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft') {
        enemy.velocity.x = -5;
        enemy.switchSprite('run');
        
    } else if (keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight') {
        enemy.velocity.x = 5;
        enemy.switchSprite('run');
    }
    else {
        enemy.switchSprite('idle');
    }
    
    // jumping
    if(enemy.velocity.y < 0) {
        enemy.switchSprite('jump');
    } else if (enemy.velocity.y > 0) {
        enemy.switchSprite('fall');
    }

    // detect for colision
    if(
        rectangularCollision({
            rectangle1: player,
            rectangle2: enemy
        }) &&
        player.isAttacking
    ) {
        player.isAttacking=false;
        enemy.health -= 20;
        document.querySelector('#enemyHealth').style.width = enemy.health + '%';
    }

    if(
        rectangularCollision({
            rectangle1: enemy,
            rectangle2: player
        }) &&
        enemy.isAttacking
    ) {
        enemy.isAttacking=false;
        player.health -= 20;
        document.querySelector('#playerHealth').style.width = player.health + '%';
    }

    // end game based on health
    if(enemy.health <= 0 || player.health <= 0) {
        determineWinner({player, enemy, timerId});
    }

}


animate();

window.addEventListener('keydown', (event) => {
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
        case ' ':
            player.attack();
            break;
        case 'ArrowRight':
            keys.ArrowRight.pressed = true;
            enemy.lastKey = 'ArrowRight';
            break;
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = true;
            enemy.lastKey = 'ArrowLeft';
            break;
        case 'ArrowUp':
            enemy.velocity.y = -20;
            break;
        case 'ArrowDown':
        enemy.attack();
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
        case 'ArrowDown':
            keys.ArrowDown.pressed = false;
            break;
    }

});
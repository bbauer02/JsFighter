
const canvas = document.querySelector("#screenGame");
const c = canvas.getContext("2d");

canvas.width=1024;
canvas.height=576;

// Creation Background de couleur noir
c.fillRect(0,0, canvas.width,canvas.height);

class Sprite {
    constructor({velocity, position })
    {
        this.position = position;
        this.velocity = velocity;
    }

    draw() {
        c.fillStyle = 'red';
        c.fillRect(this.position.x, this.position.y, 50, 150);
    }

    update() {
        this.draw();

        if(this.position.y < canvas.height - 150) {
            this.position.y += 10;
        }
    }
}
const player = new Sprite( { position : { x:10,y:0 } , velocity:{x:0, y:0}}  );
const enemy = new Sprite({velocity : {x:0, y:0}, position : {x: 964, y:0 }});

function animate() {
    window.requestAnimationFrame( animate );
    c.clearRect(0,0, canvas.width, canvas.height);
    player.update();
    enemy.update();

}
animate()

window.addEventListener('keypress', (event) => {

    switch (event.key) {
        case "d" :
            console.log("d");
        break;
        case "q" :
            console.log("q");
        break;
        case "z" :
            console.log("z");
        break;
    }
});


const canvas = document.getElementById('fire');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const particlesArray = [];

// Changes canvas size when the window is resized.
window.addEventListener('resize', function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

const mouse = {
    x: undefined,
    y: undefined,
}
canvas.addEventListener('click', function(event){
    mouse.x = event.x;
    mouse.y = event.y;
    for (let i = 0; i < 10; i++){
        particlesArray.push(new Particle());
    }
});

canvas.addEventListener('mousemove', function(event){
    mouse.x = event.x;
    mouse.y = event.y;
    //adds a new particle to particle array
    for (let i = 0; i < 5; i++){
        particlesArray.push(new Particle());
    }
})

class Particle {
    constructor(){
        this.x = mouse.x;
        this.y = mouse.y;
        this.size = Math.random() * 15 + 2;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * -3 - 1.5;
        this.hue = 65;
        this.color = 'hsl(' + this.hue + ', 100%, 50%)';
    }
    update(){
        this.x += this.speedX / 2;
        this.y += this.speedY;
        this.hue -= this.size * 0.2; //decreases hue to create fire gradient
        this.color = 'hsl(' + this.hue + ', 100%, 50%)';
        if (this.size > 0.2) this.size -= 0.4;
    }
    draw(){
        ctx.fillStyle = this.color;
        ctx.beginPath();
        //circle
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);

        //square
        //ctx.rect(this.x, this.y, this.size, this.size);

        ctx.fill();
    }
}

function handleParticles(){
    for (let i = 0; i < particlesArray.length; i++){
        particlesArray[i].update();
        particlesArray[i].draw();

        if (particlesArray[i].size <= 3){
            particlesArray.splice(i, 1);
            i--;
        }
    }
}

function animate(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    handleParticles();
    //hue+=2;
    requestAnimationFrame(animate);
}
animate();




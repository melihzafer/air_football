
    const cvs = document.getElementById('game');
    const ctx = cvs.getContext('2d');
    const cvs_w = cvs.width;
    const cvs_h = cvs.height;
    const drawRect = (x,y,w,h,color) => {
       ctx.fillStyle = color;
       ctx.fillRect(x,y,w,h);
    }
   

    const  drawCircleF = (x,y,r,color) => {
        ctx.fillStyle =color;
        ctx.beginPath();
        ctx.arc(x,y,r, 2*Math.PI, false)
        ctx.closePath()
        ctx.fill()
    }
    const drawText = (text, x, y, color) =>{
        ctx.fillStyle =color
        ctx.font = '50px sans-serif'
        ctx.fillText(text, x,y)
    }
    const  drawCircleS = (x,y,r,w,color) => {
        ctx.strokeStyle =color;
        ctx.lineWidth = w
        ctx.beginPath()
        ctx.arc(x,y,r, 2*Math.PI, false)
        ctx.closePath()
        ctx.stroke()
    }
const user ={
    x: 20,
    y: cvs_h/2-50,
    w: 10,
    h: 100,
    color: '#fff',
    score: 0
}
const ball={
    x: cvs_w/2-6,
    y: cvs_h/2-6,
    r: 16,
    color: '#b33c60',
    speed: 5 ,
    velocityX: 3,
    velocityY: 4,
    stop: true 
}
const com = {
    x: cvs_w-30,
    y: cvs_h/2-50,
    w: 10,
    h: 100,
    color: '#fff',
    score: 0,
}

const movePaddle = (e) =>{
    let rect = cvs.getBoundingClientRect();
    user.y = e.clientY - rect.top - user.h/2;
}
cvs.addEventListener('mousemove', movePaddle);

    const collision = (b,p) => {

        b.top = b.y - b.r;
        b.bottom = b.y + b.r;
        b.left = b.x - b.r;
        b.right = b.x + b.r;

        p.top = p.y
        p.bottom = p.y + p.h
        p.left = p.x
        p.right = p.x +p.w

        return (b.top < p.bottom && b.bottom > p.top && b.left < p.right && b.right > p.left);


    }

    const resetBall = () => {
        
        ball.x = cvs_w/2-6
        ball.y = cvs_h/2-6
        ball.speed= 5
        ball.velocityX = Math.random() * 9
        ball.velocityY = Math.random() * 9
      }

 const update= () =>{
     ball.x += ball.velocityX;
     ball.y += ball.velocityY;

     if(ball.y + ball.r > cvs_h || ball.y - ball.r < 0)
     {
         ball.velocityY = -ball.velocityY
         
         
     }
     let comp_level = 0.1;
         com.y += (ball.y - (com.y + com.h/2)) * comp_level;

         let player = (ball.x < cvs_w/2) ? user : com;
         if(collision(ball,player)){
            var intersectY = ball.y - (player.y + player.h/2  )
             intersectY /= player.h/2

             let maxBounceRate = Math.PI/ 3
             let bounceAngel = intersectY * maxBounceRate
             let direction = (ball.x < cvs_w/2)  ? 1 : -1

             ball.velocityX = direction * ball.speed * Math.cos(bounceAngel)
             ball.velocityY= ball.speed * Math.sin(bounceAngel)

             ball.speed += 0.5
         }
         if(ball.x >cvs_w){
             user.score++;
             resetBall()
         }
         else if(ball.x < 0){
             com.score++;
             resetBall()
         }
 }
   const render = ()=>{
    drawRect(0,0,cvs_w, cvs_h, '#3cb371')
    drawRect(cvs_w/2-10, 0, 10, cvs_h, '#fff')
    drawCircleF(cvs_w/2-5, cvs_h/2-5, 10, '#fff')
    drawCircleS(cvs_w/2-5, cvs_h/2-5,50, 10, '#fff')
    drawText(user.score, cvs_w/4, 100, '#fff')
    drawText(com.score, cvs_w-cvs_w/4, 100, '#fff')
    drawRect(user.x,user.y,user.w,user.h,user.color)
    drawRect(com.x, com.y, com.w, com.h, com.color)
    drawCircleF(ball.x,ball.y, ball.r,ball.color)
  
   }
   const game = () => {
    update()
    render()
   }
   const fps = 50;
   setInterval(game, 1000/fps)
  
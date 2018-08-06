const numBalls = 50;
const balls = [];
let ball;

function celebrate(value) {
  //check value that was passed and perform action
	if (value===1) {

    	// Some random colors
    	const colors = ["#3CC157", "#2AA7FF", "#1B1B1B", "#FCBC0F", "#F85F36"];
  		for (let i = 0; i < numBalls; i++) {
			ball = document.createElement("div");
			ball.classList.add("ball");
			ball.style.background = colors[Math.floor(Math.random() * colors.length)];
			ball.style.left = `${Math.floor(Math.random() * 50)}vw`;
			ball.style.top = `${Math.floor(Math.random() * 50)}vh`;
			ball.style.transform = `scale(${Math.random()})`;
			ball.style.width = `${Math.random()}em`;
			ball.style.height = ball.style.width;

			balls.push(ball);
			document.body.append(ball);
  		}

		// Keyframes
		balls.forEach((el, i, ra) => {
			let to = {
				x: Math.random() * (i % 2 === 0 ? -11 : 11),
				y: Math.random() * 12
			};

			let anim = el.animate(
				[
				{ transform: "translate(0, 0)" },
				{ transform: `translate(${to.x}rem, ${to.y}rem)` }
				],
				{
				duration: (Math.random() + 1) * 2000, // random duration
				direction: "alternate",
				fill: "both",
				iterations: Infinity,
				easing: "ease-in-out"
				}
			);
		}); 
	} else if(value ===0) {
		let allBalls = document.querySelectorAll('.ball') 
		if (allBalls.length != 0) {			
			for (let i = 0; i < allBalls.length; i++) {      
				allBalls[i].style.display = "none";  
			}	
		} 
    }
}


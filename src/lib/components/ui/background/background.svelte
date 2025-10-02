<script lang="ts">
	import { onMount } from 'svelte';

	// Default options
	const options = {
		numberOfStars: 500,
		maxDistance: 100,
		starSize: { min: 1, max: 3 },
		speedFactor: 0,
		mouseRadius: 70,
		starColor: '#fff',
		connectionColor: 'rgba(255, 255, 255, ${opacity})',
		lineThickness: 1,
		starShapes: ['circle', 'star'],
		randomStarSpeeds: true,
		rotationSpeed: { min: 0.001, max: 0.003 },
		connectionsWhenNoMouse: true,
		percentStarsConnecting: 25,
		connectionLinesDashed: false,
		dashedLinesConfig: [5, 15],
		starDensity: 'high',
		interactive: true,
		parallaxEffect: false,
		parallaxStrength: 1,
		idleRestartTime: 1000
	};

	const starDensities = {
		low: 0.00005,
		medium: 0.0001,
		high: 0.0002,
		ultra: 0.0004
	};

	const CELL_SIZE = options.maxDistance;
	let cells: Record<number, Record<number, any[]>> = {};
	let canvasBackground: HTMLCanvasElement;
	let canvasStars: HTMLCanvasElement;
	let ctxBackground: CanvasRenderingContext2D;
	let ctxStars: CanvasRenderingContext2D;
	let stars: any[] = [];
	let mouse = { x: null as number | null, y: null as number | null };
	let animationIdleTimeout: number | null = null;

	class Star {
		x: number;
		y: number;
		size: number;
		shape: string;
		speedX: number;
		speedY: number;
		rotation: number;
		rotationSpeed: number;
		connects: boolean;
		depth: number;
		originalX: number;
		originalY: number;

		constructor(x: number, y: number) {
			this.x = x;
			this.y = y;
			this.size =
				Math.random() * (options.starSize.max - options.starSize.min) + options.starSize.min;
			this.shape = options.starShapes[Math.floor(Math.random() * options.starShapes.length)];
			this.speedX = (Math.random() - 0.5) * (options.randomStarSpeeds ? options.speedFactor : 1);
			this.speedY = (Math.random() - 0.5) * (options.randomStarSpeeds ? options.speedFactor : 1);
			this.rotation = 0;
			this.rotationSpeed =
				Math.random() * (options.rotationSpeed.max - options.rotationSpeed.min) +
				options.rotationSpeed.min;
			this.connects =
				options.percentStarsConnecting === 100
					? true
					: options.connectionsWhenNoMouse && Math.random() < options.percentStarsConnecting / 100;
			this.depth = Math.random();
			this.originalX = x;
			this.originalY = y;
			this.size *= this.depth;
		}

		draw() {
			ctxStars.beginPath();
			ctxStars.fillStyle = options.starColor;
			switch (this.shape) {
				case 'circle':
					ctxStars.arc(this.x, this.y, this.size, 0, Math.PI * 2);
					break;
				case 'star':
					ctxStars.save();
					ctxStars.translate(this.x, this.y);
					ctxStars.rotate(this.rotation);
					ctxStars.beginPath();
					for (let i = 0; i < 5; i++) {
						ctxStars.lineTo(0, -this.size / 2);
						ctxStars.translate(0, -this.size / 2);
						ctxStars.rotate((Math.PI * 2) / 10);
						ctxStars.lineTo(0, -this.size / 2);
						ctxStars.translate(0, -this.size / 2);
						ctxStars.rotate(-((Math.PI * 6) / 10));
					}
					ctxStars.lineTo(0, -this.size / 2);
					ctxStars.restore();
					break;
			}
			ctxStars.closePath();
			ctxStars.fill();
		}
	}

	function resizeCanvas() {
		canvasBackground.width = window.innerWidth;
		canvasBackground.height = window.innerHeight;
		canvasStars.width = window.innerWidth;
		canvasStars.height = window.innerHeight;
	}

	function createStars() {
		resizeCanvas();
		const numberOfStars =
			starDensities[options.starDensity as keyof typeof starDensities] *
			canvasStars.width *
			canvasStars.height;
		for (let i = 0; i < numberOfStars; i++) {
			let x = Math.random() * canvasStars.width;
			let y = Math.random() * canvasStars.height;
			let star = new Star(x, y);
			stars.push(star);
			let cellX = Math.floor(x / CELL_SIZE);
			let cellY = Math.floor(y / CELL_SIZE);
			if (!cells[cellX]) {
				cells[cellX] = {};
			}
			if (!cells[cellX][cellY]) {
				cells[cellX][cellY] = [];
			}
			cells[cellX][cellY].push(star);
		}
	}

	function animateStars() {
		ctxStars.clearRect(0, 0, canvasStars.width, canvasStars.height);
		cells = {};

		stars.forEach((star) => {
			star.x += star.speedX;
			star.y += star.speedY;

			if (star.shape === 'star') star.rotation += star.rotationSpeed;
			if (star.x > canvasStars.width || star.x < 0) {
				star.speedX = -star.speedX;
			}
			if (star.y > canvasStars.height || star.y < 0) {
				star.speedY = -star.speedY;
			}
			star.draw();

			let cellX = Math.floor(star.x / CELL_SIZE);
			let cellY = Math.floor(star.y / CELL_SIZE);
			if (!cells[cellX]) {
				cells[cellX] = {};
			}
			if (!cells[cellX][cellY]) {
				cells[cellX][cellY] = [];
			}
			cells[cellX][cellY].push(star);

			for (let i = -1; i <= 1; i++) {
				for (let j = -1; j <= 1; j++) {
					let neighbourCellX = cellX + i;
					let neighbourCellY = cellY + j;
					if (cells[neighbourCellX] && cells[neighbourCellX][neighbourCellY]) {
						cells[neighbourCellX][neighbourCellY].forEach((otherStar) => {
							let dx = star.x - otherStar.x;
							let dy = star.y - otherStar.y;
							let distance = Math.sqrt(dx * dx + dy * dy);
							let mouseDx = star.x - (mouse.x || 0);
							let mouseDy = star.y - (mouse.y || 0);
							let mouseDistance = Math.sqrt(mouseDx * mouseDx + mouseDy * mouseDy);
							if (
								distance < options.maxDistance &&
								(mouseDistance < options.mouseRadius || (star.connects && otherStar.connects))
							) {
								ctxStars.beginPath();
								ctxStars.moveTo(star.x, star.y);
								ctxStars.lineTo(otherStar.x, otherStar.y);
								const opacity = (options.maxDistance - distance) / options.maxDistance;
								ctxStars.strokeStyle = options.connectionColor.replace(
									'${opacity}',
									opacity.toString()
								);
								ctxStars.lineWidth = options.lineThickness;
								if (options.connectionLinesDashed) {
									ctxStars.setLineDash(options.dashedLinesConfig);
								} else {
									ctxStars.setLineDash([]);
								}
								ctxStars.stroke();
							}
						});
					}
				}
			}
		});
		requestAnimationFrame(animateStars);
	}

	onMount(() => {
		ctxBackground = canvasBackground.getContext('2d')!;
		ctxStars = canvasStars.getContext('2d')!;

		const handleMouseMove = (event: MouseEvent) => {
			mouse.x = event.clientX;
			mouse.y = event.clientY;

			clearTimeout(animationIdleTimeout!);
			animationIdleTimeout = window.setTimeout(() => {
				mouse.x = null;
				mouse.y = null;
			}, options.idleRestartTime);
		};

		const handleResize = () => {
			stars.length = 0;
			cells = {};
			resizeCanvas();
			createStars();
		};

		const handleClick = (event: MouseEvent) => {
			if (!options.interactive) return;
			const star = new Star(event.clientX, event.clientY);
			stars.push(star);
		};

		window.addEventListener('mousemove', handleMouseMove);
		window.addEventListener('resize', handleResize);
		window.addEventListener('click', handleClick);

		createStars();
		animateStars();

		return () => {
			window.removeEventListener('mousemove', handleMouseMove);
			window.removeEventListener('resize', handleResize);
			window.removeEventListener('click', handleClick);
			if (animationIdleTimeout) clearTimeout(animationIdleTimeout);
		};
	});
</script>

<canvas bind:this={canvasBackground} id="backgroundCanvas"></canvas>
<canvas bind:this={canvasStars} id="starsCanvas"></canvas>

<style>
	#backgroundCanvas,
	#starsCanvas {
		position: fixed;
		top: 0;
		left: 0;
		z-index: -1;
		pointer-events: none;
	}

	#starsCanvas {
		pointer-events: auto;
	}
</style>

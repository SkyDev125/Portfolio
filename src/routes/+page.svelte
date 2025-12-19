<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { resolve } from '$app/paths';
	import '@fortawesome/fontawesome-free/css/all.min.css';

	const heroData = {
		greeting: "Heyoo! I'm",
		name: 'Diogo Santos',
		nickname: 'Sky',
		title: 'CS Student & Research Assistant',
		tagline: 'Trying my best to make this world slightly a better place ✨',
		description:
			'Top 1.8% CS&E student at IST Portugal. Currently researching Social Robotics at GAIPS (INESC-ID), working on SLAM, autonomous navigation, and human-robot interaction for the Horizon Europe CARMA project.'
	};

	const featuredProjects = [
		{
			title: 'UnitSense',
			description:
				'Custom NER model using BIO tagging to intelligently detect and convert Imperial/Metric units in unstructured text, solving where standard Regex fails.',
			tags: ['Python', 'NLP', 'Machine Learning'],
			link: 'https://github.com/SkyDev125/UnitSense',
			icon: 'fa-brain'
		},
		{
			title: 'Voice at Night',
			description:
				'Whisper-to-speech system using OpenAI models — converts whispers to text, then synthesizes speech in a chosen voice for late-night communication.',
			tags: ['Python', 'OpenAI', 'Speech AI'],
			link: 'https://github.com/SkyDev125/Voice_at_Night',
			icon: 'fa-microphone'
		},
		{
			title: 'PrologTester',
			description:
				'VSCode extension for Prolog unit-testing, built to address a need in my Programming Logic course at IST.',
			tags: ['JavaScript', 'VSCode', 'Prolog'],
			link: 'https://github.com/SkyDev125/PrologTester',
			icon: 'fa-puzzle-piece'
		}
	];

	const highlights = [
		{
			icon: 'fa-robot',
			title: 'Robotics & AI',
			description: 'SLAM, ROS, autonomous navigation, and human-robot interaction research at GAIPS'
		},
		{
			icon: 'fa-code',
			title: 'Systems Programming',
			description:
				'Python & C/C++ (Advanced) — from embedded systems to high-performance applications'
		},
		{
			icon: 'fa-mobile-alt',
			title: 'Mobile & Web',
			description: 'Flutter/Dart, Svelte, TypeScript — crafting cross-platform experiences'
		},
		{
			icon: 'fa-shield-halved',
			title: 'Cybersecurity',
			description: 'Cisco certified, with focus on secure systems architecture'
		}
	];

	const currentStatus = {
		available: true,
		statusText: 'Open to opportunities',
		currentFocus:
			'Research Assistant at GAIPS (INESC-ID) working on Social Robotics for the Horizon Europe CARMA project'
	};
</script>

<svelte:head>
	<title>SkyDev125 | Portfolio</title>
	<meta name="description" content={heroData.description} />
</svelte:head>

<div class="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
	<!-- Hero Section -->
	<section class="mb-20 flex min-h-[60vh] flex-col items-center justify-center text-center">
		<!-- Status Badge -->
		{#if currentStatus.available}
			<div
				class="mb-6 inline-flex items-center gap-2 rounded-full border border-green-500/30 bg-green-500/10 px-4 py-2 text-sm text-green-600 dark:text-green-400"
			>
				<span class="relative flex h-2 w-2">
					<span
						class="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"
					></span>
					<span class="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
				</span>
				{currentStatus.statusText}
			</div>
		{/if}

		<!-- Main Heading -->
		<h1 class="mb-4 text-lg font-medium text-muted-foreground sm:text-xl">
			{heroData.greeting}
		</h1>
		<h2
			class="mb-2 bg-gradient-to-r from-primary via-chart-1 to-chart-2 bg-clip-text pb-3 text-5xl font-bold tracking-tight text-transparent sm:text-6xl md:text-7xl"
		>
			{heroData.name}
		</h2>
		<p class="mb-4 text-xl text-muted-foreground sm:text-2xl">
			aka <span class="font-semibold text-chart-1">{heroData.nickname}</span>
		</p>
		<h3 class="mb-6 text-2xl font-semibold text-foreground/80 sm:text-3xl md:text-4xl">
			{heroData.title}
		</h3>

		<!-- Tagline -->
		<p class="mb-4 max-w-2xl text-xl text-muted-foreground sm:text-2xl">
			{heroData.tagline}
		</p>

		<!-- Description -->
		<p class="mb-10 max-w-xl text-base text-muted-foreground/80">
			{heroData.description}
		</p>

		<!-- CTA Buttons -->
		<div class="flex flex-wrap justify-center gap-4">
			<Button href={resolve('/projects')} size="lg" class="gap-2">
				<i class="fa-solid fa-folder-open"></i>
				View My Work
			</Button>
			<Button href={resolve('/contact')} variant="outline" size="lg" class="gap-2">
				<i class="fa-solid fa-paper-plane"></i>
				Get In Touch
			</Button>
		</div>

		<!-- Scroll indicator -->
		<div class="mt-16 animate-bounce text-muted-foreground/50">
			<i class="fa-solid fa-chevron-down text-2xl"></i>
		</div>
	</section>

	<!-- What I Do Section -->
	<section class="mb-20">
		<div class="mb-10 text-center">
			<h2 class="mb-3 text-3xl font-bold sm:text-4xl">What I Do</h2>
			<p class="mx-auto max-w-2xl text-muted-foreground">
				From web apps to mobile, from systems programming to Discord bots — I love building things
				that solve real problems
			</p>
		</div>

		<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
			{#each highlights as highlight}
				<Card.Root
					class="group border-border/50 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5"
				>
					<Card.Header class="pb-3">
						<div
							class="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110"
						>
							<i class="fa-solid {highlight.icon} text-xl"></i>
						</div>
						<Card.Title class="text-lg">{highlight.title}</Card.Title>
					</Card.Header>
					<Card.Content>
						<p class="text-sm text-muted-foreground">{highlight.description}</p>
					</Card.Content>
				</Card.Root>
			{/each}
		</div>
	</section>

	<!-- Featured Projects Section -->
	<section class="mb-20">
		<div class="mb-10 text-center">
			<h2 class="mb-3 text-3xl font-bold sm:text-4xl">Featured Projects</h2>
			<p class="mx-auto max-w-2xl text-muted-foreground">
				A selection from my 37+ repositories — ranging from university projects to personal passion
				projects
			</p>
		</div>

		<div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
			{#each featuredProjects as project}
				<Card.Root
					class="group flex flex-col border-border/50 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5"
				>
					<Card.Header>
						<div class="mb-2 flex items-center gap-3">
							<div
								class="flex h-10 w-10 items-center justify-center rounded-lg bg-chart-1/10 text-chart-1"
							>
								<i class="fa-solid {project.icon}"></i>
							</div>
							<Card.Title class="text-xl">{project.title}</Card.Title>
						</div>
						<Card.Description class="text-sm">{project.description}</Card.Description>
					</Card.Header>
					<Card.Content class="mt-auto">
						<div class="mb-4 flex flex-wrap gap-2">
							{#each project.tags as tag}
								<span
									class="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground"
								>
									{tag}
								</span>
							{/each}
						</div>
						<Button href={project.link} variant="ghost" size="sm" class="group/btn gap-2 p-0">
							View Project
							<i class="fa-solid fa-arrow-right transition-transform group-hover/btn:translate-x-1"
							></i>
						</Button>
					</Card.Content>
				</Card.Root>
			{/each}
		</div>

		<div class="mt-8 text-center">
			<Button href={resolve('/projects')} variant="outline" class="gap-2">
				View All Projects
				<i class="fa-solid fa-arrow-right"></i>
			</Button>
		</div>
	</section>

	<!-- Current Focus / About Teaser -->
	<section class="mb-20">
		<Card.Root
			class="overflow-hidden border-border/50 bg-gradient-to-br from-card/80 via-card/50 to-primary/5 backdrop-blur-sm"
		>
			<div class="grid gap-8 p-8 md:grid-cols-2 md:p-12">
				<div>
					<h2 class="mb-4 text-3xl font-bold">Currently</h2>
					<p class="mb-6 text-lg text-muted-foreground">
						{currentStatus.currentFocus}
					</p>
					<div class="space-y-4">
						<div class="flex items-center gap-3">
							<i class="fa-solid fa-flask text-chart-1"></i>
							<span class="text-muted-foreground"
								>Research Assistant at GAIPS (INESC-ID) — Social Robotics</span
							>
						</div>
						<div class="flex items-center gap-3">
							<i class="fa-solid fa-trophy text-chart-2"></i>
							<span class="text-muted-foreground">Top 1.8% at IST — Diploma of Academic Merit</span>
						</div>
						<div class="flex items-center gap-3">
							<i class="fa-solid fa-drum text-chart-3"></i>
							<span class="text-muted-foreground">Percussion Section Coordinator at TMIST</span>
						</div>
					</div>
				</div>
				<div class="flex flex-col justify-center">
					<blockquote
						class="border-l-4 border-primary/50 pl-6 text-lg text-muted-foreground italic"
					>
						"Code is like humor. When you have to explain it, it's bad."
						<footer class="mt-2 text-sm font-medium text-foreground">— Cory House</footer>
					</blockquote>
					<div class="mt-8">
						<Button href={resolve('/about')} variant="secondary" class="gap-2">
							<i class="fa-solid fa-user"></i>
							Learn More About Me
						</Button>
					</div>
				</div>
			</div>
		</Card.Root>
	</section>

	<!-- Quick Links / CTA Section -->
	<section class="mb-8">
		<Card.Root class="border-border/50 bg-card/50 p-8 text-center backdrop-blur-sm md:p-12">
			<h2 class="mb-4 text-3xl font-bold">Let's Build Something Together</h2>
			<p class="mx-auto mb-8 max-w-xl text-muted-foreground">
				Whether you have a project idea, want to collaborate on open source, or just want to chat
				about tech, feel free to reach out!
			</p>
			<div class="flex flex-wrap justify-center gap-4">
				<Button href={resolve('/contact')} size="lg" class="gap-2">
					<i class="fa-solid fa-envelope"></i>
					Start a Conversation
				</Button>
				<Button href="https://github.com/SkyDev125" variant="outline" size="lg" class="gap-2">
					<i class="fa-brands fa-github"></i>
					View GitHub
				</Button>
				<Button
					href="https://www.linkedin.com/in/diogo-sky/"
					variant="outline"
					size="lg"
					class="gap-2"
				>
					<i class="fa-brands fa-linkedin"></i>
					Connect on LinkedIn
				</Button>
			</div>
		</Card.Root>
	</section>
</div>

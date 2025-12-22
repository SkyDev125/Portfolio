<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';
	import ContactLink from '$lib/components/ui/contact-link/contact-link.svelte';
	import '@fortawesome/fontawesome-free/css/all.min.css';

	const timeline = [
		{
			year: '2025 - Present',
			title: 'Research Assistant',
			org: 'GAIPS (INESC-ID)',
			description:
				'Working on Social Robotics within the Horizon Europe CARMA project. Engineering human-robot interactions for first-responder teams, developing guiding systems for disaster response using Jetson Nano and Unitree Go2 quadrupeds.',
			icon: 'fa-flask',
			highlight: true
		},
		{
			year: '2024 - Present',
			title: 'Student Mentor & Percussion Lead / Soloist',
			org: 'IST / TMIST',
			description:
				'Guiding incoming students through the NAPE Mentoring Program. Soloing and Leading the percussion section at TMIST, dedicating 400+ hours annually to rehearsals, performances, and festivals.',
			icon: 'fa-users'
		},
		{
			year: '2023 - 2026 (expected)',
			title: 'BSc Computer Science & Engineering',
			org: 'Instituto Superior Técnico',
			description:
				'Top 1.8% of cohort with a 17.68/20 GPA. Diploma of Academic Merit. Focus on AI, Machine Learning, Systems Architecture, and Cybersecurity.',
			icon: 'fa-graduation-cap',
			highlight: true
		},
		{
			year: '2022 - 2023',
			title: 'Lab Manager & Instructor',
			org: 'EPVR',
			description:
				'Managed network infrastructure, supervised student capstone projects, and supported VR technology integration for education. Self-studied mathematics for national exams in the evenings.',
			icon: 'fa-chalkboard-teacher'
		},
		{
			year: '2022',
			title: 'Software Developer Intern',
			org: 'Sandeza (Turin, Italy)',
			description:
				'Erasmus+ internship. Overhauled a legacy scheduling system using modern JavaScript, achieving >90% performance boost (60s → 4s load times).',
			icon: 'fa-plane',
			highlight: true
		},
		{
			year: '2019 - 2022',
			title: 'IT Technician Diploma',
			org: 'EPVR',
			description:
				'Graduated with highest average in school (19/20). Perfect scores on capstone project and internship. SIMAS Academic Excellence Award.',
			icon: 'fa-award'
		}
	];

	const skills = {
		languages: [
			{ name: 'Python', level: 'Advanced' },
			{ name: 'C/C++', level: 'Advanced' },
			{ name: 'Java', level: 'Intermediate' },
			{ name: 'Flutter/Dart', level: 'Intermediate' },
			{ name: 'Svelte/TypeScript', level: 'Intermediate' }
		],
		domains: [
			'Robotics & ROS',
			'SLAM & Navigation',
			'Machine Learning',
			'Human-Robot Interaction',
			'Embedded Systems',
			'Cybersecurity'
		],
		certifications: [
			'IT Essentials Instructor (Cisco & EPVR)',
			'Introduction to Cybersecurity (Cisco)'
		],
		languages_spoken: [
			{ lang: 'Portuguese', level: 'Native' },
			{ lang: 'English', level: 'C2' }
		]
	};

	const hobbies = [
		{ icon: 'fa-gamepad', name: 'Competitive Gaming' },
		{ icon: 'fa-dragon', name: 'D&D Campaigns' },
		{ icon: 'fa-music', name: 'Music & Remixing' },
		{ icon: 'fa-microphone', name: 'Singing' },
		{ icon: 'fa-drum', name: 'Percussion' }
	];
</script>

<svelte:head>
	<title>About | Diogo Santos</title>
	<meta
		name="description"
		content="From vocational tech support to AI research — the journey of Diogo Santos"
	/>
</svelte:head>

<div class="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
	<!-- Hero Section -->
	<section class="mb-16 text-center">
		<h1
			class="mb-4 bg-gradient-to-r from-primary via-chart-1 to-chart-2 bg-clip-text pb-1 text-4xl font-bold tracking-tight text-transparent sm:text-5xl"
		>
			About Me
		</h1>
		<p class="mx-auto max-w-2xl text-lg text-foreground/80">
			From a vocational tech support student to a researcher debugging robots and AI
		</p>
	</section>

	<!-- Story Section -->
	<section class="mb-16">
		<Card.Root class="border-border/50 bg-card/50 backdrop-blur-sm">
			<Card.Header>
				<Card.Title class="flex items-center gap-2 text-2xl">
					<i class="fa-solid fa-book-open text-chart-1"></i>
					My Story
				</Card.Title>
			</Card.Header>
			<Card.Content class="space-y-4 text-muted-foreground">
				<p>
					My journey in computer science has required immense <strong class="dark:text-foreground"
						>resilience and adaptability</strong
					>. As the
					<strong class="dark:text-foreground">first in my family to pursue higher education</strong
					>, I've transformed from maintaining servers and networks to developing autonomous systems
					that can navigate disaster zones.
				</p>
				<p>
					At Escola Profissional Val do Rio, I developed a deep understanding of computing's
					physical layer, from hardware integration to robot development. I graduated with the <strong
						class="dark:text-foreground">highest average in the school</strong
					>
					and perfect scores on my capstone project and Erasmus+ internship in Turin, where I overhauled
					a legacy system to achieve a
					<strong class="dark:text-foreground">>90% performance boost</strong>.
				</p>
				<p>
					This made me realize my true passion: not just maintaining systems, but
					<strong class="dark:text-foreground">architecting new solutions from the ground up</strong
					>. So while working as Lab Manager by day, I self-studied mathematics in the evenings to
					enroll at
					<strong class="dark:text-foreground">Instituto Superior Técnico</strong>, Portugal's most
					prestigious engineering university.
				</p>
				<p>
					At IST, I earned the <strong class="dark:text-foreground"
						>Diploma of Academic Merit</strong
					>
					and ranked in the <strong class="dark:text-foreground">top 1.8%</strong> of my cohort. My
					greatest passion emerged in AI coursework, which led me to join
					<strong class="dark:text-foreground">GAIPS (INESC-ID)</strong> as a Research Assistant, where
					I now work on Social Robotics for the Horizon Europe CARMA project.
				</p>
				<p>
					My practical background has given me a distinct perspective: a pure desire to dig deeper
					and transform lines of code into <strong class="dark:text-foreground"
						>truly autonomous and intelligent systems</strong
					>.
				</p>
			</Card.Content>
		</Card.Root>
	</section>

	<!-- Timeline Section -->
	<section class="mb-16">
		<h2 class="mb-8 text-center text-2xl font-bold sm:text-3xl">Journey</h2>
		<div class="relative">
			<!-- Timeline line -->
			<div
				class="absolute top-0 left-4 h-full w-0.5 bg-gradient-to-b from-chart-1 via-chart-2 to-chart-3 md:left-1/2 md:-translate-x-1/2"
			></div>

			<div class="space-y-8">
				{#each timeline as item, i}
					<div
						class="relative flex flex-col md:flex-row {i % 2 === 0
							? 'md:flex-row'
							: 'md:flex-row-reverse'}"
					>
						<!-- Timeline dot -->
						<div
							class="absolute left-4 z-10 flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full {item.highlight
								? 'bg-chart-1 text-white'
								: 'bg-secondary text-secondary-foreground'} md:left-1/2"
						>
							<i class="fa-solid {item.icon} text-sm"></i>
						</div>

						<!-- Content -->
						<div class="ml-12 md:ml-0 md:w-1/2 {i % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}">
							<Card.Root
								class="border-border/50 bg-card/50 backdrop-blur-sm transition-all {item.highlight
									? 'ring-1 ring-chart-1/20'
									: ''}"
							>
								<Card.Header class="pb-2">
									<div class="flex items-center justify-between">
										<span class="text-sm font-medium text-chart-1">{item.year}</span>
									</div>
									<Card.Title class="text-lg">{item.title}</Card.Title>
									<Card.Description class="font-medium">{item.org}</Card.Description>
								</Card.Header>
								<Card.Content>
									<p class="text-sm text-muted-foreground">{item.description}</p>
								</Card.Content>
							</Card.Root>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- Skills Section -->
	<section class="mb-16">
		<h2 class="mb-8 text-center text-2xl font-bold sm:text-3xl">Skills & Expertise</h2>
		<div class="grid gap-6 md:grid-cols-2">
			<!-- Programming Languages -->
			<Card.Root class="border-border/50 bg-card/50 backdrop-blur-sm">
				<Card.Header>
					<Card.Title class="flex items-center gap-2 text-lg">
						<i class="fa-solid fa-code text-chart-1"></i>
						Programming Languages
					</Card.Title>
				</Card.Header>
				<Card.Content>
					<div class="space-y-3">
						{#each skills.languages as lang}
							<div class="flex items-center justify-between">
								<span class="font-medium">{lang.name}</span>
								<span
									class="rounded-full px-2 py-1 text-xs {lang.level === 'Advanced'
										? 'bg-chart-1/20 text-chart-1'
										: 'bg-secondary text-secondary-foreground'}"
								>
									{lang.level}
								</span>
							</div>
						{/each}
					</div>
				</Card.Content>
			</Card.Root>

			<!-- Domains -->
			<Card.Root class="border-border/50 bg-card/50 backdrop-blur-sm">
				<Card.Header>
					<Card.Title class="flex items-center gap-2 text-lg">
						<i class="fa-solid fa-diagram-project text-chart-2"></i>
						Domains
					</Card.Title>
				</Card.Header>
				<Card.Content>
					<div class="flex flex-wrap gap-2">
						{#each skills.domains as domain}
							<span class="rounded-full bg-secondary px-3 py-1 text-sm text-secondary-foreground">
								{domain}
							</span>
						{/each}
					</div>
				</Card.Content>
			</Card.Root>

			<!-- Certifications -->
			<Card.Root class="border-border/50 bg-card/50 backdrop-blur-sm">
				<Card.Header>
					<Card.Title class="flex items-center gap-2 text-lg">
						<i class="fa-solid fa-certificate text-chart-3"></i>
						Certifications
					</Card.Title>
				</Card.Header>
				<Card.Content>
					<ul class="space-y-2">
						{#each skills.certifications as cert}
							<li class="flex items-start gap-2 text-sm text-muted-foreground">
								<i class="fa-solid fa-check mt-1 text-green-500"></i>
								{cert}
							</li>
						{/each}
					</ul>
				</Card.Content>
			</Card.Root>

			<!-- Languages Spoken -->
			<Card.Root class="border-border/50 bg-card/50 backdrop-blur-sm">
				<Card.Header>
					<Card.Title class="flex items-center gap-2 text-lg">
						<i class="fa-solid fa-language text-chart-4"></i>
						Languages
					</Card.Title>
				</Card.Header>
				<Card.Content>
					<div class="space-y-3">
						{#each skills.languages_spoken as lang}
							<div class="flex items-center justify-between">
								<span class="font-medium">{lang.lang}</span>
								<span class="text-sm text-muted-foreground">{lang.level}</span>
							</div>
						{/each}
					</div>
				</Card.Content>
			</Card.Root>
		</div>
	</section>

	<!-- Hobbies Section -->
	<section class="mb-16">
		<h2 class="mb-8 text-center text-2xl font-bold sm:text-3xl">When I'm Not Coding</h2>
		<div class="flex flex-wrap justify-center gap-4">
			{#each hobbies as hobby}
				<div
					class="flex items-center gap-2 rounded-full border border-border/50 bg-card/50 px-4 py-2 backdrop-blur-sm transition-all"
				>
					<i class="fa-solid {hobby.icon} text-chart-1"></i>
					<span class="text-sm font-medium text-muted-foreground">{hobby.name}</span>
				</div>
			{/each}
		</div>
	</section>

	<!-- Get In Contact Section -->
	<section class="mb-8">
		<ContactLink />
	</section>
</div>

<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';
	import * as Field from '$lib/components/ui/field/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Textarea } from '$lib/components/ui/textarea/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Tooltip from '$lib/components/ui/tooltip/index.js';
	import '@fortawesome/fontawesome-free/css/all.min.css';
	import { onMount, onDestroy } from 'svelte';

	import { toast } from 'svelte-sonner';

	// Live Lisbon time
	let currentTime = $state('');
	let timezoneAbbr = $state('');
	let intervalId: ReturnType<typeof setInterval>;

	function updateTime() {
		const now = new Date();
		const lisbonTime = new Intl.DateTimeFormat('en-GB', {
			timeZone: 'Europe/Lisbon',
			hour: '2-digit',
			minute: '2-digit',
			second: '2-digit',
			hour12: false
		}).format(now);
		currentTime = lisbonTime;

		// Determine if DST (WEST) or standard time (WET)
		const jan = new Date(now.getFullYear(), 0, 1).getTimezoneOffset();
		const jul = new Date(now.getFullYear(), 6, 1).getTimezoneOffset();
		const lisbonOffset = new Date().toLocaleString('en-US', {
			timeZone: 'Europe/Lisbon',
			timeZoneName: 'short'
		});
		timezoneAbbr =
			lisbonOffset.includes('GMT+1') || lisbonOffset.includes('WEST')
				? 'WEST (UTC+1)'
				: 'WET (UTC+0)';
	}

	onMount(() => {
		updateTime();
		intervalId = setInterval(updateTime, 1000);
	});

	onDestroy(() => {
		if (intervalId) clearInterval(intervalId);
	});

	const email = 'diogo_goncalves2004@hotmail.com';
	let name = $state('');
	let subject = $state('');
	let message = $state('');
	let copied = $state(false);

	const socials = [
		{
			name: 'GitHub',
			icon: 'fa-github',
			url: 'https://github.com/SkyDev125',
			color: 'hover:text-[#333] dark:hover:text-white'
		},
		{
			name: 'LinkedIn',
			icon: 'fa-linkedin',
			url: 'https://www.linkedin.com/in/diogo-sky/',
			color: 'hover:text-[#0077B5]'
		}
		// {
		// 	name: 'Discord',
		// 	icon: 'fa-discord',
		// 	url: 'https://discord.com/users/skydev125',
		// 	color: 'hover:text-[#5865F2]'
		// }
	];

	const contactReasons = [
		{ icon: 'fa-handshake', title: 'Collaboration', desc: 'Open source or research projects' },
		{ icon: 'fa-briefcase', title: 'Opportunities', desc: 'Internships & job opportunities' },
		{ icon: 'fa-comments', title: 'Just Chat', desc: 'About robotics, AI, or anything!' }
	];

	function mailto(filled?: boolean) {
		let mailtoUrl = `mailto:${email}`;

		if (filled) {
			const fullSubject = subject ? `[Contact] ${name} - ${subject}` : `[Contact] ${name}`;
			mailtoUrl = `mailto:${email}?subject=${encodeURIComponent(fullSubject)}&body=${encodeURIComponent(message)}`;
		}

		const iframe = document.createElement('iframe');
		iframe.style.display = 'none';
		iframe.src = mailtoUrl;

		document.body.appendChild(iframe);

		setTimeout(() => {
			document.body.removeChild(iframe);
		}, 100);
	}

	function submitForm() {
		if (!name.trim()) {
			toast.error('Please enter your name');
			return;
		}
		if (!message.trim()) {
			toast.error('Please enter a message');
			return;
		}
		mailto(true);
		toast.success('Opening your email client...');
	}

	function simpleMailto() {
		mailto(false);
	}

	async function onCopy() {
		try {
			await navigator.clipboard.writeText(email);

			// Show toast only if not recently copied
			if (!copied) toast.success('Email copied to clipboard!');
			copied = true;
			setTimeout(() => (copied = false), 2000);
		} catch (e) {
			toast.error('Failed to copy email');
		}
	}
</script>

<svelte:head>
	<title>Contact | Diogo Santos</title>
	<meta name="description" content="Get in touch with Diogo Santos — let's collaborate!" />
</svelte:head>

<div class="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
	<!-- Hero Section -->
	<section class="mb-12 text-center">
		<h1
			class="mb-4 bg-gradient-to-r from-primary via-chart-1 to-chart-2 bg-clip-text pb-1 text-4xl font-bold tracking-tight text-transparent sm:text-5xl"
		>
			Get In Touch
		</h1>
		<p class="mx-auto max-w-2xl text-lg text-muted-foreground">
			Have a question, project idea, or just want to say hi? I'd love to hear from you!
		</p>
	</section>

	<!-- Contact Reasons -->
	<section>
		<div class="grid gap-4 sm:grid-cols-3">
			{#each contactReasons as reason}
				<Card.Root
					class="border-border/50 bg-card/50 text-center backdrop-blur-sm transition-all duration-300 hover:border-primary/50"
				>
					<Card.Content>
						<div
							class="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-chart-1/10"
						>
							<i class="fa-solid {reason.icon} text-xl text-chart-1"></i>
						</div>
						<h3 class="font-semibold">{reason.title}</h3>
						<p class="text-sm text-muted-foreground">{reason.desc}</p>
					</Card.Content>
				</Card.Root>
			{/each}
		</div>
	</section>

	<!-- Separator -->
	<div class="mt-4 mb-4 flex items-center gap-0">
		<div class="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent"></div>
		<i class="fa-solid fa-paper-plane text-muted-foreground/50"></i>
		<div class="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent"></div>
	</div>

	<div class="grid gap-8 lg:grid-cols-5">
		<!-- Contact Form -->
		<div class="lg:col-span-3">
			<Card.Root class="border-border/50 bg-card/50 backdrop-blur-sm">
				<Card.Header>
					<Card.Title class="flex items-center gap-2 text-xl">
						<i class="fa-solid fa-paper-plane text-chart-1"></i>
						Send a Message
					</Card.Title>
					<Card.Description>
						Fill out the form and it'll open your email client with everything pre-filled.
					</Card.Description>
				</Card.Header>
				<Card.Content>
					<Field.Set>
						<Field.Group class="space-y-2">
							<Field.Field>
								<Field.Label for="name">Your Name</Field.Label>
								<Input
									id="name"
									placeholder="John Doe"
									class="border-border/50 bg-background/50"
									bind:value={name}
								/>
							</Field.Field>
							<Field.Field>
								<Field.Label for="subject">Subject (optional)</Field.Label>
								<Input
									id="subject"
									placeholder="e.g. Research Collaboration"
									class="border-border/50 bg-background/50"
									bind:value={subject}
								/>
							</Field.Field>
							<Field.Field>
								<Field.Label for="message">Message</Field.Label>
								<Textarea
									id="message"
									class="min-h-40 border-border/50 bg-background/50"
									placeholder="Hi Diogo! I'd love to connect about..."
									bind:value={message}
								/>
							</Field.Field>
							<Button type="submit" class="w-full gap-2" onclick={submitForm}>
								<i class="fa-solid fa-paper-plane"></i>
								Send Message
							</Button>
						</Field.Group>
					</Field.Set>
				</Card.Content>
			</Card.Root>
		</div>

		<!-- Sidebar -->
		<div class="space-y-6 lg:col-span-2">
			<!-- Direct Email -->
			<Card.Root class="border-border/50 bg-card/50 backdrop-blur-sm">
				<Card.Header>
					<Card.Title class="flex items-center gap-2 text-lg">
						<i class="fa-solid fa-envelope text-chart-2"></i>
						Direct Email
					</Card.Title>
				</Card.Header>
				<Card.Content>
					<div class="flex items-center gap-2">
						<button
							type="button"
							onclick={simpleMailto}
							class="truncate text-sm text-muted-foreground underline-offset-4 transition-colors hover:text-primary hover:underline"
						>
							{email}
						</button>
						<Tooltip.Provider>
							<Tooltip.Root>
								<Tooltip.Trigger>
									<button
										type="button"
										onclick={onCopy}
										aria-label="Copy Email"
										class="inline-flex h-8 w-8 items-center justify-center rounded-md transition hover:bg-secondary focus:ring-2 focus:ring-primary focus:outline-none"
									>
										<span class="sr-only">{copied ? 'Copied' : 'Copy email'}</span>
										{#if copied}
											<i class="fa-solid fa-check text-green-500" aria-hidden="true"></i>
										{:else}
											<i class="fa-solid fa-copy text-muted-foreground" aria-hidden="true"></i>
										{/if}
									</button>
								</Tooltip.Trigger>
								<Tooltip.Content>
									<p>{copied ? 'Copied!' : 'Copy Email'}</p>
								</Tooltip.Content>
							</Tooltip.Root>
						</Tooltip.Provider>
					</div>
				</Card.Content>
			</Card.Root>

			<!-- Social Links -->
			<Card.Root class="border-border/50 bg-card/50 backdrop-blur-sm">
				<Card.Header>
					<Card.Title class="flex items-center gap-2 text-lg">
						<i class="fa-solid fa-share-nodes text-chart-3"></i>
						Connect With Me
					</Card.Title>
				</Card.Header>
				<Card.Content>
					<div class="space-y-3">
						{#each socials as social}
							<a
								href={social.url}
								target="_blank"
								rel="noopener noreferrer"
								class="flex items-center gap-3 rounded-lg p-2 transition-colors hover:bg-secondary"
							>
								<div class="flex h-10 w-10 items-center justify-center rounded-full bg-secondary">
									<i class="fa-brands {social.icon} text-lg"></i>
								</div>
								<div>
									<p class="font-medium">{social.name}</p>
									<p class="text-xs text-muted-foreground">
										{social.url.replace('https://', '').split('/')[0]}
									</p>
								</div>
								<i
									class="fa-solid fa-arrow-up-right-from-square ml-auto text-xs text-muted-foreground"
								></i>
							</a>
						{/each}
					</div>
				</Card.Content>
			</Card.Root>

			<!-- Quick Response & Location -->
			<Card.Root class="border-chart-1/30 bg-chart-1/5 backdrop-blur-sm">
				<Card.Content class="space-y-4">
					<div class="flex items-center justify-between gap-3">
						<div class="flex items-center gap-3">
							<div class="flex h-10 w-10 items-center justify-center rounded-full bg-chart-1/20">
								<i class="fa-solid fa-bolt text-chart-1"></i>
							</div>
							<div>
								<p class="font-medium">Quick Response</p>
								<p class="text-sm text-muted-foreground">Usually within 24 hours</p>
							</div>
						</div>
						<div class="text-right">
							<p class="font-mono text-lg font-semibold text-chart-1 tabular-nums">
								{currentTime || '--:--:--'}
							</p>
							<p class="text-xs text-muted-foreground">{timezoneAbbr || 'WET/WEST'}</p>
						</div>
					</div>
					<div class="flex items-center gap-3 border-t border-chart-1/20 pt-4">
						<div class="flex h-10 w-10 items-center justify-center rounded-full bg-chart-1/20">
							<i class="fa-solid fa-location-dot text-chart-1"></i>
						</div>
						<div>
							<p class="font-medium">Lisbon, Portugal</p>
							<p class="text-sm text-muted-foreground">Available to collaborate remotely</p>
						</div>
					</div>
				</Card.Content>
			</Card.Root>
		</div>
	</div>
</div>

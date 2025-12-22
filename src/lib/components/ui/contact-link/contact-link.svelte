<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';
	import '@fortawesome/fontawesome-free/css/all.min.css';
	import { Button } from '$lib/components/ui/button/index.js';
	import { resolve } from '$app/paths';
</script>

<Card.Root class="border-border/50 bg-card/50 p-8 text-center backdrop-blur-sm md:p-12">
	<h2 class="mb-4 text-3xl font-bold">Let's Build Something Together</h2>
	<p class="mx-auto mb-8 max-w-xl text-muted-foreground">
		Whether you want to discuss research, collaborate on a project, or just chat about robots, AI
		and IT, I'd love to hear from you!
	</p>
	<div class="flex flex-wrap justify-center gap-4">
		<Button href={resolve('/contact')} size="lg" class="gap-2">
			<i class="fa-solid fa-envelope"></i>
			Start a Conversation
		</Button>
		<Button
			href="https://github.com/SkyDev125"
			variant="outline"
			size="lg"
			class="gap-2 text-white"
		>
			<i class="fa-brands fa-github"></i>
			View GitHub
		</Button>
		<Button
			href="https://www.linkedin.com/in/diogo-sky/"
			variant="outline"
			size="lg"
			class="gap-2 text-white"
		>
			<i class="fa-brands fa-linkedin"></i>
			Connect on LinkedIn
		</Button>
	</div>
</Card.Root>

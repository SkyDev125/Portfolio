<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';
	import * as Field from '$lib/components/ui/field/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Textarea } from '$lib/components/ui/textarea/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Tooltip from '$lib/components/ui/tooltip/index.js';

	import { toast } from 'svelte-sonner';

	const email = 'diogo_goncalves2004@hotmail.com';
	let name = '';
	let message = '';
	let copied = false;

	function mailto(filled?: boolean) {
		let mailtoUrl = `mailto:${email}`;

		if (filled) {
			mailtoUrl = `mailto:${email}?subject=[Contact] ${encodeURIComponent(name)}&body=${encodeURIComponent(message)}`;
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
		mailto(true);
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

<Card.Root class="mx-auto w-4xl">
	<Card.Header>
		<Card.Title>Let's Connect</Card.Title>
		<Card.Description>
			<Field.Set>
				<Field.Description>
					Have questions or want to collaborate? Fill out the form below to get in touch!
				</Field.Description>
				<Field.Group>
					<Field.Field class="name">
						<Field.Label for="name">Full name</Field.Label>
						<Input id="name" placeholder="Starry Cloud" class="bg-white" bind:value={name} />
					</Field.Field>
					<Field.Field class="mail">
						<Field.Label for="mail">Message</Field.Label>
						<Textarea
							id="mail"
							class="min-h-80"
							placeholder="Hi there! I would love to connect with you about..."
							bind:value={message}
						/>
					</Field.Field>
					<Field.Field orientation="vertical">
						<Button type="submit" class="" onclick={submitForm}>Submit</Button>
					</Field.Field>
				</Field.Group>
			</Field.Set>
		</Card.Description>
	</Card.Header>
</Card.Root>
<Card.Root class="mx-auto my-2 w-4xl">
	<Card.Header>
		<Card.Title class="text-center">
			Feel free to also just contact me directly at
			<button type="button" onclick={simpleMailto} class="underline hover:text-primary"
				>{email}</button
			>
			<Tooltip.Provider>
				<Tooltip.Root>
					<Tooltip.Trigger>
						<button
							type="button"
							onclick={onCopy}
							aria-label="Copy Email"
							class="inline-flex items-center justify-center rounded p-0.5 transition hover:bg-slate-50 focus:ring-2 focus:ring-primary focus:outline-none dark:hover:bg-slate-800"
						>
							<span class="sr-only">{copied ? 'Copied' : 'Copy email'}</span>
							{#if copied}
								<i class="fa-solid fa-check text-green-500" aria-hidden="true"></i>
							{:else}
								<i class="fa-solid fa-copy" aria-hidden="true"></i>
							{/if}
						</button>
					</Tooltip.Trigger>
					<Tooltip.Content>
						<p>{copied ? 'Copied!' : 'Copy Email'}</p>
					</Tooltip.Content>
				</Tooltip.Root>
			</Tooltip.Provider>
		</Card.Title>
	</Card.Header>
</Card.Root>

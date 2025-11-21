<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';
	import * as Field from '$lib/components/ui/field/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Textarea } from '$lib/components/ui/textarea/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Tooltip from '$lib/components/ui/tooltip/index.js';

	import { copy } from 'svelte-copy';

	const email = 'diogo_goncalves2004@hotmail.com';
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
						<Input id="name" placeholder="Starry Cloud" class="bg-white" />
					</Field.Field>
					<Field.Field class="mail">
						<Field.Label for="mail">Message</Field.Label>
						<Textarea
							id="mail"
							class="min-h-80"
							placeholder="Hi there! I would love to connect with you about..."
						/>
					</Field.Field>
					<Field.Field orientation="vertical">
						<Button type="submit" class="">Submit</Button>
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
			<a href="mailto:{email}">{email}</a>
			<Tooltip.Provider>
				<Tooltip.Root>
					<Tooltip.Trigger>
						<button use:copy={email} aria-label="Copy Email">
							<i class="fa-solid fa-copy"></i>
						</button>
					</Tooltip.Trigger>
					<Tooltip.Content>
						<p>Copy Email</p>
					</Tooltip.Content>
				</Tooltip.Root>
			</Tooltip.Provider>
		</Card.Title>
	</Card.Header>
</Card.Root>

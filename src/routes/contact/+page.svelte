<script lang="ts">
	import { IconMail, IconSend, IconUser, IconMessage, IconBrandGmail } from '@tabler/icons-svelte';

	let name = $state('');
	let email = $state('');
	let subject = $state('');
	let message = $state('');

	const recipient = '17daniel.dev@gmail.com';

	function buildMailto() {
		const body = `From: ${name} (${email})\n\n${message}`;
		return `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
	}

	function buildGmailUrl() {
		const body = `From: ${name} (${email})%0D%0A%0D%0A${encodeURIComponent(message)}`;
		return `https://mail.google.com/mail/?view=cm&fs=1&to=${recipient}&su=${encodeURIComponent(subject)}&body=${body}`;
	}

	function handleMailto(e: SubmitEvent) {
		e.preventDefault();
		window.location.href = buildMailto();
	}

	function handleGmail() {
		window.open(buildGmailUrl(), '_blank');
	}
</script>

<svelte:head>
	<title>Contact | Serban-Daniel Iacob</title>
	<meta name="description" content="Get in touch with Serban-Daniel Iacob." />
</svelte:head>

<div class="mx-auto max-w-2xl space-y-8 px-4 py-8 md:py-12">
	<header class="space-y-2">
		<h1 class="flex items-center gap-3 text-3xl font-bold">
			<IconMail size={28} class="text-accent" />
			<span>Get in Touch</span>
		</h1>
		<p class="text-subtext0 text-base leading-relaxed">
			Have a question, want to collaborate, or just want to say hi? Fill this out and it'll open
			your email client.
		</p>
	</header>

	<form
		onsubmit={handleMailto}
		class="border-surface0 bg-base space-y-5 rounded-xl border p-6 shadow-lg"
	>
		<div class="grid grid-cols-1 gap-5 md:grid-cols-2">
			<div class="space-y-2">
				<label for="name" class="text-subtext0 flex items-center gap-2 text-sm font-medium">
					<IconUser size={16} class="text-accent" />
					Name
				</label>
				<input
					id="name"
					type="text"
					bind:value={name}
					required
					placeholder="Your name"
					class="border-surface0 bg-mantle text-text placeholder:text-overlay0 focus:border-accent w-full rounded-lg border px-4 py-2.5 text-sm transition-colors focus:outline-none"
				/>
			</div>

			<div class="space-y-2">
				<label for="email" class="text-subtext0 flex items-center gap-2 text-sm font-medium">
					<IconMail size={16} class="text-accent" />
					Your Email
				</label>
				<input
					id="email"
					type="email"
					bind:value={email}
					required
					placeholder="you@example.com"
					class="border-surface0 bg-mantle text-text placeholder:text-overlay0 focus:border-accent w-full rounded-lg border px-4 py-2.5 text-sm transition-colors focus:outline-none"
				/>
			</div>
		</div>

		<div class="space-y-2">
			<label for="subject" class="text-subtext0 flex items-center gap-2 text-sm font-medium">
				<IconMessage size={16} class="text-accent" />
				Subject
			</label>
			<input
				id="subject"
				type="text"
				bind:value={subject}
				required
				placeholder="What's this about?"
				class="border-surface0 bg-mantle text-text placeholder:text-overlay0 focus:border-accent w-full rounded-lg border px-4 py-2.5 text-sm transition-colors focus:outline-none"
			/>
		</div>

		<div class="space-y-2">
			<label for="message" class="text-subtext0 flex items-center gap-2 text-sm font-medium">
				<IconMessage size={16} class="text-accent" />
				Message
			</label>
			<textarea
				id="message"
				bind:value={message}
				required
				rows={6}
				placeholder="Write your message here..."
				class="border-surface0 bg-mantle text-text placeholder:text-overlay0 focus:border-accent w-full resize-none rounded-lg border px-4 py-2.5 text-sm transition-colors focus:outline-none"
			></textarea>
		</div>

		<div class="flex flex-col gap-3 sm:flex-row">
			<button
				type="submit"
				class="bg-accent/80 hover:bg-accent focus:ring-accent/50 inline-flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-medium transition-colors focus:ring-2 focus:ring-offset-2 focus:outline-none"
			>
				<IconSend size={16} />
				Open in Email Client
			</button>

			<button
				type="button"
				onclick={handleGmail}
				class="border-surface0 hover:border-accent/50 focus:ring-accent/50 inline-flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg border px-4 py-3 text-sm font-medium transition-colors focus:ring-2 focus:ring-offset-2 focus:outline-none"
			>
				<IconBrandGmail size={16} class="text-red" />
				Open in Gmail
			</button>
		</div>
	</form>

	<div class="text-subtext1 text-center text-sm">
		<p>
			Or reach me directly at
			<a href="mailto:{recipient}" class="text-accent hover:underline">{recipient}</a>
		</p>
	</div>
</div>

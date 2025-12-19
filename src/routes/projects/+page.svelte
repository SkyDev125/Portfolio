<script lang="ts">
	import { onMount } from 'svelte';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import '@fortawesome/fontawesome-free/css/all.min.css';

	type Repo = {
		id: number;
		name: string;
		description: string | null;
		language: string | null;
		topics?: string[];
		stargazers_count: number;
		forks_count: number;
		html_url: string;
		homepage: string | null;
		pushed_at: string;
		archived?: boolean;
		has_pages?: boolean;
		owner?: { login: string };
	};

	const GITHUB_USERNAME = 'SkyDev125';
	const featuredNames = ['Portfolio'];
	const hiddenNames = ['SkyDev125'];

	let repos: Repo[] = $state([]);
	let search = $state('');
	let selectedLanguages = $state(new Set<string>());
	let showFeaturedOnly = $state(false);
	let isLoading = $state(true);
	let error: string | null = $state(null);
	let totalCommits: number | null = $state(null);

	const isFeatured = (repo: Repo) => featuredNames.includes(repo.name);
	const isHidden = (repo: Repo) => hiddenNames.includes(repo.name);

	const fetchRepos = async () => {
		try {
			const res = await fetch(
				`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`,
				{
					headers: {
						Accept: 'application/vnd.github+json',
						'X-GitHub-Api-Version': '2022-11-28'
					}
				}
			);

			if (!res.ok) {
				throw new Error(`GitHub responded with ${res.status}`);
			}

			const data: Repo[] = await res.json();
			repos = data
				.filter((repo) => !isHidden(repo))
				.sort((a, b) => new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime());
		} catch (err) {
			error = err instanceof Error ? err.message : 'Something went wrong.';
		} finally {
			isLoading = false;
		}
	};

	const fetchTotalCommits = async () => {
		try {
			const res = await fetch(`https://api.github.com/search/commits?q=author:${GITHUB_USERNAME}`, {
				headers: {
					Accept: 'application/vnd.github+json',
					'X-GitHub-Api-Version': '2022-11-28'
				}
			});
			if (res.ok) {
				const data = await res.json();
				totalCommits = data.total_count ?? null;
			}
		} catch {
			// Silently fail - commits stat is optional
		}
	};

	onMount(() => {
		fetchRepos();
		fetchTotalCommits();
	});

	const toggleLanguage = (language: string) => {
		const next = new Set(selectedLanguages);
		if (next.has(language)) {
			next.delete(language);
		} else {
			next.add(language);
		}
		selectedLanguages = next;
	};

	const resetFilters = () => {
		search = '';
		selectedLanguages = new Set();
		showFeaturedOnly = false;
	};

	const fuzzyIncludes = (value: string, query: string) =>
		value.toLowerCase().includes(query.trim().toLowerCase());

	const getGitHubPagesUrl = (repo: Repo): string | null => {
		if (!repo.has_pages || !repo.owner) return null;
		return `https://${repo.owner.login}.github.io/${repo.name}`;
	};

	const getLanguages = () => {
		const langs = new Set<string>();
		repos.forEach((repo) => {
			const displayLang = repo.language ?? 'Unknown';
			langs.add(displayLang);
			if (repo.topics?.length) {
				repo.topics.forEach((topic) => langs.add(topic));
			}
		});
		return Array.from(langs).sort();
	};

	const languageCount = (lang: string) => {
		return repos.filter(
			(repo) => (repo.language ?? 'Unknown') === lang || repo.topics?.includes(lang)
		).length;
	};

	const filtered = () => {
		return repos
			.filter((repo) => (showFeaturedOnly ? isFeatured(repo) : true))
			.filter((repo) =>
				search
					? fuzzyIncludes(repo.name, search) || fuzzyIncludes(repo.description ?? '', search)
					: true
			)
			.filter((repo) => {
				if (!selectedLanguages.size) return true;
				const repoDisplayLang = repo.language ?? 'Unknown';
				if (selectedLanguages.has(repoDisplayLang)) return true;
				if (repo.topics?.some((topic) => selectedLanguages.has(topic))) return true;
				return false;
			});
	};

	const allSummary = () => {
		const totalStars = repos.reduce((sum, repo) => sum + (repo.stargazers_count ?? 0), 0);
		const totalForks = repos.reduce((sum, repo) => sum + (repo.forks_count ?? 0), 0);
		return { total: repos.length, stars: totalStars, forks: totalForks };
	};

	const getLanguageColor = (language: string | null): string => {
		const colors: Record<string, string> = {
			TypeScript: 'bg-blue-500',
			JavaScript: 'bg-yellow-400',
			Python: 'bg-green-500',
			Rust: 'bg-orange-500',
			Go: 'bg-cyan-500',
			Java: 'bg-red-500',
			'C++': 'bg-pink-500',
			C: 'bg-gray-500',
			Svelte: 'bg-orange-600',
			Dart: 'bg-blue-400'
		};
		return colors[language ?? ''] ?? 'bg-muted-foreground';
	};
</script>

<svelte:head>
	<title>Projects | Diogo Santos</title>
	<meta
		name="description"
		content="Explore my GitHub projects — from robotics to web development"
	/>
</svelte:head>

<div class="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
	<!-- Hero Section -->
	<section class="mb-12 text-center">
		<h1
			class="mb-4 bg-gradient-to-r from-primary via-chart-1 to-chart-2 bg-clip-text pb-1 text-4xl font-bold tracking-tight text-transparent sm:text-5xl"
		>
			My Projects
		</h1>
		<p class="mx-auto max-w-2xl text-lg text-muted-foreground">
			A live collection of my work, pulled straight from GitHub
		</p>
	</section>

	<!-- Stats Card -->
	<section class="mb-8">
		<Card.Root class="border-border/50 bg-card/50 backdrop-blur-sm">
			<Card.Content>
				<div class="flex flex-col gap-4">
					<!-- Stats and Button Row -->
					<div class="flex flex-wrap items-center justify-between gap-3">
						<!-- Stats Grid/Flex -->
						<div class="grid flex-1 grid-cols-2 gap-2 sm:flex sm:flex-1 sm:flex-wrap sm:gap-3">
							<div
								class="flex items-center gap-2 rounded-lg border border-chart-1/30 bg-chart-1/10 px-3 py-2 text-sm sm:rounded-full sm:px-4 sm:text-base"
							>
								<i class="fa-solid fa-folder text-chart-1"></i>
								<span class="font-semibold">{isLoading ? '...' : allSummary().total}</span>
								<span class="text-muted-foreground">projects</span>
							</div>
							<div
								class="flex items-center gap-2 rounded-lg border border-chart-2/30 bg-chart-2/10 px-3 py-2 text-sm sm:rounded-full sm:px-4 sm:text-base"
							>
								<i class="fa-solid fa-star text-chart-2"></i>
								<span class="font-semibold">{isLoading ? '...' : allSummary().stars}</span>
								<span class="text-muted-foreground">stars</span>
							</div>
							<div
								class="flex items-center gap-2 rounded-lg border border-chart-3/30 bg-chart-3/10 px-3 py-2 text-sm sm:rounded-full sm:px-4 sm:text-base"
							>
								<i class="fa-solid fa-code-fork text-chart-3"></i>
								<span class="font-semibold">{isLoading ? '...' : allSummary().forks}</span>
								<span class="text-muted-foreground">forks</span>
							</div>
							{#if totalCommits !== null}
								<div
									class="flex items-center gap-2 rounded-lg border border-chart-4/30 bg-chart-4/10 px-3 py-2 text-sm sm:rounded-full sm:px-4 sm:text-base"
								>
									<i class="fa-solid fa-code-commit text-chart-4"></i>
									<span class="font-semibold">{totalCommits.toLocaleString()}</span>
									<span class="text-muted-foreground">commits</span>
								</div>
							{/if}
						</div>
						<!-- GitHub Button -->
						<Button
							href={`https://github.com/${GITHUB_USERNAME}`}
							target="_blank"
							rel="noreferrer"
							class="w-full gap-2 sm:w-auto"
						>
							<i class="fa-brands fa-github"></i>
							View GitHub Profile
						</Button>
					</div>
					{#if error}
						<div
							class="flex items-center gap-2 rounded-lg border border-amber-500/30 bg-amber-500/10 px-3 py-2 text-amber-500"
						>
							<i class="fa-solid fa-triangle-exclamation"></i>
							<span class="text-sm">API: {error}</span>
						</div>
					{/if}
				</div>
			</Card.Content>
		</Card.Root>
	</section>

	<!-- Filters Section -->
	<section>
		<Card.Root class="overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm">
			<Card.Content>
				<div class="grid gap-6 lg:grid-cols-[280px_1fr] lg:gap-8">
					<!-- Left: Title + Search & Options -->
					<div class="flex flex-col justify-between gap-6 lg:pr-2">
						<div>
							<h2 class="flex items-center gap-2 text-xl font-semibold">
								<i class="fa-solid fa-filter text-chart-1"></i>
								Filter Projects
							</h2>
							<p class="mt-1 text-sm text-muted-foreground">Narrow down by search or tags</p>
						</div>
						<div class="space-y-4">
							<Input
								id="search-input"
								placeholder="Search projects..."
								bind:value={search}
								type="search"
								class="border-border/50 bg-background/50"
							/>
							<div class="flex items-center gap-2">
								<button
									type="button"
									onclick={() => (showFeaturedOnly = !showFeaturedOnly)}
									class="flex flex-1 items-center justify-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 {showFeaturedOnly
										? 'bg-chart-2 text-white shadow-md'
										: 'border border-border/50 bg-secondary/30 text-secondary-foreground hover:bg-secondary/50'}"
								>
									<i class="fa-solid fa-star {showFeaturedOnly ? '' : 'text-chart-2'}"></i>
									Featured
								</button>
								<button
									type="button"
									onclick={resetFilters}
									aria-label="Reset filters"
									class="flex items-center justify-center gap-2 rounded-lg border border-border/50 bg-secondary/30 px-3 py-2.5 text-sm font-medium text-secondary-foreground transition-all duration-200 hover:bg-secondary/50"
								>
									<i class="fa-solid fa-rotate-left"></i>
								</button>
							</div>
						</div>
					</div>

					<!-- Right: Languages & Tags (full height) -->
					<div class="">
						{#if !isLoading && getLanguages().length}
							<div
								class="flex max-h-64 flex-col overflow-hidden rounded-xl border border-border/50 bg-gradient-to-br from-background/60 to-background/30 lg:h-full lg:max-h-none"
							>
								<div
									class="flex shrink-0 items-center gap-2 border-b border-border/50 bg-background/40 px-4 py-3"
								>
									<i class="fa-solid fa-tags text-chart-2"></i>
									<span class="text-sm font-medium">Languages & Tags</span>
									<span
										class="ml-auto rounded-full bg-chart-2/20 px-2 py-0.5 text-xs font-medium text-chart-2"
									>
										{getLanguages().length}
									</span>
								</div>
								<div
									class="flex flex-1 flex-wrap content-start items-start gap-2 overflow-y-auto p-4"
								>
									{#each getLanguages() as language}
										<button
											type="button"
											onclick={() => toggleLanguage(language)}
											class="rounded-full px-3 py-1.5 text-sm font-medium transition-all duration-200 {selectedLanguages.has(
												language
											)
												? 'bg-chart-1 text-white shadow-md'
												: 'bg-secondary/40 text-secondary-foreground hover:bg-secondary/70'}"
										>
											{language}
											<span class="ml-1.5 opacity-60">{languageCount(language)}</span>
										</button>
									{/each}
								</div>
							</div>
						{:else if isLoading}
							<div
								class="flex h-full flex-col overflow-hidden rounded-xl border border-border/50 bg-gradient-to-br from-background/60 to-background/30"
							>
								<div
									class="flex items-center gap-2 border-b border-border/50 bg-background/40 px-4 py-3"
								>
									<i class="fa-solid fa-tags text-chart-2"></i>
									<span class="text-sm font-medium">Languages & Tags</span>
								</div>
								<div class="flex flex-1 flex-wrap content-start gap-2 p-4">
									{#each Array(12) as _}
										<div class="h-8 w-20 animate-pulse rounded-full bg-muted-foreground/20"></div>
									{/each}
								</div>
							</div>
						{:else}
							<div
								class="flex h-full items-center justify-center rounded-xl border border-border/50 bg-gradient-to-br from-background/60 to-background/30 p-8"
							>
								<p class="text-sm text-muted-foreground">No tags available</p>
							</div>
						{/if}
					</div>
				</div>
			</Card.Content>
		</Card.Root>
	</section>

	<!-- Separator -->
	<div class="mt-8 mb-8 flex items-center gap-4">
		<div class="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent"></div>
		<span class="text-sm text-muted-foreground"
			>{isLoading ? '...' : filtered().length} results</span
		>
		<div class="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent"></div>
	</div>

	<!-- Projects Grid -->
	<section>
		<div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
			{#if isLoading}
				{#each Array(6) as _}
					<Card.Root class="border-border/50 bg-card/50 backdrop-blur-sm">
						<Card.Content class="space-y-3 pt-6">
							<div class="h-4 w-2/3 animate-pulse rounded bg-muted-foreground/20"></div>
							<div class="h-4 w-5/6 animate-pulse rounded bg-muted-foreground/20"></div>
							<div class="h-4 w-1/2 animate-pulse rounded bg-muted-foreground/20"></div>
						</Card.Content>
					</Card.Root>
				{/each}
			{:else if !filtered().length}
				<Card.Root
					class="border-dashed border-border/50 bg-card/50 backdrop-blur-sm md:col-span-2 lg:col-span-3"
				>
					<Card.Content class="flex flex-col items-center justify-center gap-4 py-12 text-center">
						<div class="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
							<i class="fa-solid fa-folder-open text-2xl text-muted-foreground"></i>
						</div>
						<div>
							<p class="font-medium">No projects match these filters</p>
							<p class="text-sm text-muted-foreground">Try adjusting your search or filters</p>
						</div>
						<Button variant="outline" onclick={resetFilters} class="gap-2">
							<i class="fa-solid fa-rotate-left"></i>
							Clear Filters
						</Button>
					</Card.Content>
				</Card.Root>
			{:else}
				{#each filtered() as repo}
					<Card.Root
						class="group flex h-full flex-col border-border/50 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:border-primary/50 {isFeatured(
							repo
						)
							? 'ring-1 ring-chart-2/30'
							: ''}"
					>
						<Card.Header class="">
							<div class="flex items-start justify-between gap-2">
								<div class="flex items-center gap-2">
									<span class="h-3 w-3 rounded-full {getLanguageColor(repo.language)}"></span>
									<span class="text-xs text-muted-foreground">
										{repo.language ?? 'Unknown'}
									</span>
								</div>
								{#if isFeatured(repo)}
									<span
										class="flex items-center gap-1 rounded-full bg-chart-2/20 px-2 py-0.5 text-xs font-medium text-chart-2"
									>
										<i class="fa-solid fa-star text-[10px]"></i>
										Featured
									</span>
								{/if}
							</div>
							<Card.Title class="text-lg transition-colors group-hover:text-primary">
								{repo.name}
							</Card.Title>
							{#if repo.description}
								<Card.Description class="line-clamp-2">{repo.description}</Card.Description>
							{/if}
						</Card.Header>

						<Card.Content class="flex flex-1 flex-col">
							<!-- Topics -->
							{#if repo.topics?.length}
								<div class="mt-auto flex flex-wrap gap-1.5">
									{#each repo.topics.slice(0, 4) as topic}
										<span
											class="rounded-full bg-secondary/50 px-2 py-0.5 text-xs text-secondary-foreground"
										>
											{topic}
										</span>
									{/each}
									{#if repo.topics.length > 4}
										<span
											class="rounded-full bg-secondary/50 px-2 py-0.5 text-xs text-muted-foreground"
										>
											+{repo.topics.length - 4}
										</span>
									{/if}
								</div>
							{/if}

							<!-- Stats -->
							<div class="{repo.topics?.length ? '' : 'mt-auto'} flex flex-wrap gap-2 pt-3 text-sm">
								<span class="flex items-center gap-1 text-muted-foreground">
									<i class="fa-solid fa-star text-xs"></i>
									{repo.stargazers_count}
								</span>
								<span class="flex items-center gap-1 text-muted-foreground">
									<i class="fa-solid fa-code-fork text-xs"></i>
									{repo.forks_count}
								</span>
								<span class="flex items-center gap-1 text-muted-foreground">
									<i class="fa-solid fa-clock text-xs"></i>
									{new Date(repo.pushed_at).toLocaleDateString()}
								</span>
							</div>
						</Card.Content>

						<Card.Footer class="mt-auto gap-2">
							<Button
								variant="outline"
								href={repo.html_url}
								target="_blank"
								rel="noreferrer"
								class="flex-1 gap-2"
							>
								<i class="fa-brands fa-github"></i>
								Source
							</Button>
							{@const pagesUrl = getGitHubPagesUrl(repo)}
							{#if repo.homepage}
								<Button href={repo.homepage} target="_blank" rel="noreferrer" class="flex-1 gap-2">
									<i class="fa-solid fa-arrow-up-right-from-square"></i>
									Live
								</Button>
							{:else if pagesUrl}
								<Button href={pagesUrl} target="_blank" rel="noreferrer" class="flex-1 gap-2">
									<i class="fa-solid fa-globe"></i>
									Demo
								</Button>
							{/if}
						</Card.Footer>
					</Card.Root>
				{/each}
			{/if}
		</div>
	</section>
</div>

<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';

  import { onMount } from 'svelte';
  import { initializeTheme } from '$lib/global/theme.svelte';

  import Header from '$lib/components/ui/header/header.svelte'
	
	let { children } = $props();

  let theme = initializeTheme();

  onMount(() => {
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)") ? 'dark' : 'light';
    theme.set(systemTheme);
  });
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<Header />

{@render children?.()}
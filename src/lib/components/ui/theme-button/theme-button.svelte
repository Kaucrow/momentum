<script lang="ts">
  import Button from "$lib/components/ui/button/button.svelte";

  import { getTheme } from "$lib/global/theme.svelte";

  import {
    IconMoonFilled,
    IconSunFilled,
  } from "@tabler/icons-svelte";

  type ThemeButtonProps = {
    class?: string;
  };

	let {
		class: className,
		...restProps
	}: ThemeButtonProps = $props();

  let theme = getTheme();
</script>

<div class={`${className}`}>
  <Button
    onclick={theme.toggle}
    variant="outline"
    class="group bg-transparent dark:bg-transparent hover:bg-border dark:hover:bg-border p-6"
  >
    {#if theme.current === 'dark'}
      <IconMoonFilled class="transition-colors size-6 text-border group-hover:text-foreground m-0 p-0" />
    {:else}
      <IconSunFilled class="transition-colors size-6 text-border group-hover:text-foreground m-0 p-0" />
    {/if}
  </Button>
</div>
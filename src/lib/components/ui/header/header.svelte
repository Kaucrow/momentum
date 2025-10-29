<script lang="ts">
  import ThemeButton from "../theme-button/theme-button.svelte";
  import Note from "@tabler/icons-svelte/icons/note";

</script>

<div class="flex items-center sticky top-0 w-full p-6">
  <div class="flex w-3/5">
    <div class="flex items-center gap-4">
      <Note size=40/>
      <div class="font-[Comfortaa] font-bold text-4xl">Momentum</div>
    </div>
  </div>
  <div class="flex w-2/5 justify-end">
    <ThemeButton />
  </div>
</div>
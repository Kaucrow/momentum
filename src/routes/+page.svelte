<script lang="ts">
  import Button from "$lib/components/ui/button/button.svelte";
  import * as Accordion from "$lib/components/ui/accordion/index.js";
  import { Checkbox } from "$lib/components/ui/checkbox/index.js";
  import { Label } from "$lib/components/ui/label/index.js";
</script>

<Button>Elatla</Button>

<Accordion.Root type="single" class="w-full sm:max-w-[70%] ml-3" value="item-1">
  <Accordion.Item value="item-1" class="border-2 border-gray">
    <div class="flex items-center gap-3 ml-3"> 
      <Checkbox id="terms" />
      <Accordion.Trigger id="trigger">
        <Label for="trigger">Accept terms and conditions</Label>
      </Accordion.Trigger>
    </div>
    <Accordion.Content class="flex flex-col gap-4 text-balance">
      <p>
        Our flagship product combines cutting-edge technology with sleek design.
        Built with premium materials, it offers unparalleled performance and
        reliability.
      </p>
      <p>
        Key features include advanced processing capabilities, and an intuitive
        user interface designed for both beginners and experts.
      </p>
    </Accordion.Content>
  </Accordion.Item>

  <Accordion.Item></Accordion.Item>
  
</Accordion.Root>
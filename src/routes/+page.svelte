<script lang="ts">
  import Button from "$lib/components/ui/button/button.svelte";
  import { onMount } from "svelte";
  import * as Accordion from "$lib/components/ui/accordion/index.js";
  import { Checkbox } from "$lib/components/ui/checkbox/index.js";
  import { Label } from "$lib/components/ui/label/index.js";

  type AccordionItem = {
    label: string;
    description: string;
    date: string;
  };

  let items : AccordionItem[] = []

  function getItems(){
    let tempItems = [{label: "Terminar el proyecto de componentes",
      description: "Exposición y Proyecto",
      date: "2025/10/30" 
      },
      {label: "Enfrentar mi vida",
      description: "Evitar la automuerte",
      date: "Everyday" 
    }]
    items=tempItems;
  }

  function deleteItem(index:number){
    //items[index]
  }

  onMount(() => {
    getItems();
  });
</script>

<h1 class="text-center text-7xl m-10">Task Manager</h1>

<div class="flex items-center h-screen flex-col">
  <Accordion.Root type="multiple" class="w-full sm:max-w-[21%] ml-3">
    {#each items as item, index}
      <Accordion.Item value={`item-${index}`} class="border-gray">
        <div class="flex items-center gap-3 ml-3"> 
          <Checkbox id="terms"  onCheckedChange="{() => deleteItem(index)}"/>
          <Accordion.Trigger id="trigger-{index}">
            <Label for="trigger-{index}">{item.label}</Label>
          </Accordion.Trigger>
        </div>
        <Accordion.Content class="flex flex-col gap-4 text-balance ml-3">
          <p>{item.description}</p>
          <p>
            Limit date: {item.date}
          </p>
        </Accordion.Content>
      </Accordion.Item>
    {/each} 
  </Accordion.Root>
</div>
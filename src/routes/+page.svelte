<script lang="ts">
  import * as Dialog from "$lib/components/ui/dialog";
  import * as Popover from "$lib/components/ui/popover";
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

  let items = $state<AccordionItem[]>([])

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

  //Javier code
  import Input from "$lib/components/ui/input/input.svelte";
  import Calendar from "$lib/components/ui/calendar/calendar.svelte";
  import { IconCalendarWeekFilled as CalendarIcon } from "@tabler/icons-svelte";

  import { cn } from "$lib/utils.js";
  import { buttonVariants } from "$lib/components/ui/button/button.svelte";
  import {
    DateFormatter,
    type DateValue,
    getLocalTimeZone
  } from "@internationalized/date";
  import { enhance } from '$app/forms';

  const df = new DateFormatter("en-US", {
    dateStyle: "long"
  });

  let createTaskDialogOpen = $state<boolean>(false);
  let createTaskDialogErr = $state<string | undefined>(undefined);

  let newTask: {
    name: string | undefined,
    description: string | undefined,
    dueDate: DateValue | undefined,
  } = $state({
    name: undefined,
    description: undefined,
    dueDate: undefined
  });

  const onCreateTaskDialogOpenChange = () => {
    newTask = {
      name: undefined,
      description: undefined,
      dueDate: undefined
    };
    createTaskDialogErr = undefined;
  };
</script>

<h1 class="text-center text-7xl m-10">Task Manager</h1>

<div class="flex items-center h-screen flex-col">
  <Accordion.Root type="multiple" class="w-full sm:max-w-[21%] ml-3">
    {#each items as item, index}
      <Accordion.Item value={`item-${index}`} class="border-gray">
        <div class="flex items-center gap-3 ml-3"> 
          <Checkbox id="terms"  onCheckedChange={() => deleteItem(index)}/>
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

<section class="px-8 py-4">
  <Dialog.Root 
    bind:open={createTaskDialogOpen}
    onOpenChangeComplete={onCreateTaskDialogOpenChange}
  >
    <Dialog.Trigger>
      <div class={cn(buttonVariants())}>Create a task</div>
    </Dialog.Trigger>
    <Dialog.Content class="sm:max-w-[425px]">
      <Dialog.Header>
        <Dialog.Title>Create a task</Dialog.Title>
        <Dialog.Description>
          Create a new task so hopefully you get it done!
        </Dialog.Description>
      </Dialog.Header>
      <form onsubmit={() => { createTaskDialogOpen=false }} method="POST" action="?/createTask" use:enhance>
        <div class="grid gap-4 py-4">
          <!-- Name input -->
          <div class="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
            <Label for="name" class="text-right sm:col-span-1">Name</Label>
            <Input bind:value={newTask.name} id="name" class="col-span-3" />
          </div>

          <!-- Description input -->
          <div class="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
            <Label for="description" class="text-right sm:col-span-1">Description</Label>
            <Input bind:value={newTask.description} id="description" class="col-span-3" />
          </div>

          <!-- Due date selection -->
          <div class="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
            <Label class="text-right sm:col-span-1">Due date</Label>
            <Popover.Root>
              <Popover.Trigger
                class={cn(
                  buttonVariants({
                    variant: "outline",
                    class: "col-span-3 justify-start text-left"
                  }),
                  !newTask.dueDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon />
                { newTask.dueDate ? df.format(newTask.dueDate.toDate(getLocalTimeZone())) : "" }
              </Popover.Trigger>
              <Popover.Content class="w-auto p-0">
                <Calendar type="single" bind:value={newTask.dueDate} />
              </Popover.Content>
            </Popover.Root>
          </div>
        </div>
        <Dialog.Footer>
          <Button type="submit">Save</Button>
          {#if createTaskDialogErr}
            <div class="text-destructive">{createTaskDialogErr}</div>
          {/if}
        </Dialog.Footer>
      </form>
    </Dialog.Content>
  </Dialog.Root>
</section>
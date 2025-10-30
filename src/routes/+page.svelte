<script lang="ts">
  import * as Dialog from "$lib/components/ui/dialog";
  import * as Popover from "$lib/components/ui/popover";
  import Button from "$lib/components/ui/button/button.svelte";
  import Label from "$lib/components/ui/label/label.svelte";
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

  const df = new DateFormatter("en-US", {
    dateStyle: "long"
  });

  let createTaskDialogOpen = $state<boolean>(false);

  let newTask: {
    name: string | undefined,
    description: string | undefined,
    dueDate: DateValue | undefined,
  } = $state({
    name: undefined,
    description: undefined,
    dueDate: undefined
  });

  const createTask = () => {
    console.log(`Creating new task with name '${newTask.name}', description '${newTask.description}', and due date '${newTask.dueDate}'...`);
    console.log('Task created!');
    createTaskDialogOpen = false;
  };

  const onCreateTaskDialogOpenChange = () => {
    newTask = {
      name: undefined,
      description: undefined,
      dueDate: undefined
    };
  };
</script>

<section class="px-8 py-4">
  <Dialog.Root 
    bind:open={createTaskDialogOpen}
    onOpenChangeComplete={onCreateTaskDialogOpenChange}
  >
    <Dialog.Trigger>
      <Button>Create a task</Button>
    </Dialog.Trigger>
    <Dialog.Content class="sm:max-w-[425px]">
      <Dialog.Header>
        <Dialog.Title>Create a task</Dialog.Title>
        <Dialog.Description>
          Create a new task so hopefully you get it done!
        </Dialog.Description>
      </Dialog.Header>
      <form onsubmit={createTask}>
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
        </Dialog.Footer>
      </form>
    </Dialog.Content>
  </Dialog.Root>
</section>
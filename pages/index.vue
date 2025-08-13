<script setup lang="ts">
import { vAutoAnimate } from "@formkit/auto-animate/vue";
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
// import { h } from "vue";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "vue-sonner";
import { Toaster } from "@/components/ui/sonner";
import "vue-sonner/style.css";

const formSchema = toTypedSchema(
  z.object({
    username: z.string().min(2).max(50),
    email: z.string().email().min(2).max(50),
  })
);

const { handleSubmit } = useForm({
  validationSchema: formSchema,
});

const onSubmit = handleSubmit((values) => {
  // toast("You submitted the following values:", {
  //   description: values,
  //   action: {
  //     label: "Undo",
  //     onClick: () => console.log("Undo"),
  //   },
  // });
  console.log(values);
  // toast({
  //   title: "You submitted the following values:",
  //   description: h(
  //     "pre",
  //     { class: "mt-2 w-[340px] rounded-md bg-slate-950 p-4" },
  //     h("code", { class: "text-white" }, JSON.stringify(values, null, 2))
  //   ),
  // });
});
</script>

<template>
  <div>
    <div class="h-screen flex">
      <!-- sidebar -->
      <div class="bg-zinc-900 w-[518px] p-8 flex flex-col justify-center">
        <h1 class="font-semibold text-xl text-white">
          Notes<span class="text-yellow-500">App</span>
        </h1>
        <h1 class="font-bold text-lg mt-8">Sign up for a free account</h1>
        <p class="text-sm">
          Already registered?
          <span class="font-bold text-yellow-500 underline mt-0.5">Log in</span>
          to your account
        </p>

        <form class="w-2/3 space-y-6" @submit="onSubmit">
          <FormField v-slot="{ componentField }" name="username">
            <FormItem v-auto-animate>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="shadcn"
                  v-bind="componentField"
                />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          </FormField>
          <FormField v-slot="{ componentField }" name="email">
            <FormItem v-auto-animate>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="shadcn@g.c"
                  v-bind="componentField"
                />
              </FormControl>
              <FormDescription> </FormDescription>
              <FormMessage />
            </FormItem>
          </FormField>
          <Button type="submit"> Submit </Button>
          <Toaster
            closeButton
            rich-colors
            theme="dark"
            position="top-center"
            :expand="true"
          />
        </form>
      </div>

      <div>Main</div>
    </div>
  </div>
</template>

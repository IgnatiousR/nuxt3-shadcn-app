<template>
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

      <form @submit.prevent="submit">
        <div class="mt-10">
          <label class="block text-sm text-zinc-300 mb-1">Full Name</label>
          <input
            v-model="name"
            type="text"
            placeholder="Full name"
            class="block w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded placeholder:text-zinc-500"
          />
        </div>
        <div class="mt-5">
          <label class="block text-sm text-zinc-300 mb-1">Email Address</label>
          <input
            v-model="email"
            type="email"
            placeholder="Email"
            class="block w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded placeholder:text-zinc-500"
          />
        </div>
        <div class="mt-5">
          <label class="block text-sm text-zinc-300 mb-1">Password</label>
          <input
            v-model="password"
            type="password"
            placeholder="Password"
            class="block w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded placeholder:text-zinc-500"
          />
        </div>
        <div class="mt-5">
          <label class="block text-sm text-zinc-300 mb-1"
            >Confirm Password</label
          >
          <input
            v-model="password_confirmation"
            type="password"
            placeholder="Confirm Password"
            class="block w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded placeholder:text-zinc-500"
          />
          <!-- <label v-if="pass_err" class="block text-sm text-red-400 mt-1"
            >Password doesnot match</label
          > -->
        </div>

        <!-- sign up button -->
        <div class="">
          <Button
            :disabled="loading"
            class="mt-4 bg-yellow-500 rounded-full w-full px-4 py-2 text-black text-sm font-bold cursor-pointer hover:bg-yellow-600"
            ><Loader2 v-if="loading" class="w-4 h-4 mr-2 animate-spin" />
            Sign Up
          </Button>
          <Toaster
            rich-colors
            theme="dark"
            position="top-center"
            :expand="true"
          />
        </div>
        <!-- /sign up button -->
      </form>
    </div>
    <!-- /sidebar -->
    <!-- note introduction -->
    <div>Main</div>
    <!-- /note introduction -->
  </div>
</template>

<script setup lang="ts">
import { Loader2 } from "lucide-vue-next";
// import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "vue-sonner";
import "vue-sonner/style.css";

const name = ref("");
const email = ref("");
const password = ref("");
const password_confirmation = ref("");
// const pass_err = ref(false);
const loading = ref(false);
// const openTo = ref(true);

// function changeTo() {
//   toast.error("Event has been created", {
//     description: "Sunday, December 03, 2023 at 9:00 AM",
//     action: {
//       label: "X",
//       onClick: () => console.log("Undo"),
//     },
//   });
//   // openTo.value = false;
// }

async function submit() {
  loading.value = true;
  console.log("Email: ", email.value == null);
  console.log("Password: ", password.value);
  //if (password.value !== password_confirmation.value) pass_err.value = true;
  try {
    const response = await $fetch("/api/user", {
      method: "POST",
      body: {
        name: name.value,
        email: email.value,
        password: password.value,
      },
    });

    toast.success("Account registered successfully.", {
      action: {
        label: "X",
        onClick: () => console.log("Undo"),
      },
    });
  } catch (error) {
    console.log(error.response?._data?.message);
    toast.error(error.response?._data?.message, {
      action: {
        label: "X",
        onClick: () => console.log("Undo"),
      },
    });
  } finally {
    loading.value = false;
  }
}
</script>

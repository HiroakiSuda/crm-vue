<template>
  <div class="">
    <div class="flex text-4xl bg-black text-white">
      <router-link to="/">
        CRM
      </router-link>
      
      <div>
        <router-link to="/dashboard/leads">Leads</router-link>
        <router-link to="/dashboard/team">Team</router-link>

        <template v-if="!$store.state.isAuthenticated">
          <router-link to="/signup">
            <button class="bg-blue-500">Sign Up</button>
          </router-link>
          <router-link to="/login">
            <button class="bg-green-500">Log in</button>
          </router-link>
        </template>

        <template v-else>
          <router-link to="/dashboard/my-account">My Account</router-link>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>

</style>
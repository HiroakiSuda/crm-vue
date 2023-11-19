<template>
  <div>
    My Account
  </div>

  <div>
    <router-link to="/dashboard/leads">leads</router-link>
  </div>

  <div>
    <button @click="logout()">Log out</button>
  </div>
</template>

<script setup>
import axios from 'axios'
import { useStore } from 'vuex';
import router from '@/router'

const store = useStore();

const logout = async () => {
  try {
    await axios.post(`/api/v1/token/logout/`);
    console.log('log out');
    axios.defaults.headers.common['Authorization'] = '';
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('username');
    localStorage.removeItem('teamId');
    localStorage.removeItem('name');
    store.commit('removeToken');
    router.push(`/`);
  } catch(error) {
    console.log(JSON.stringify(error));
  }
}

</script>

<style lang="scss" scoped>

</style>
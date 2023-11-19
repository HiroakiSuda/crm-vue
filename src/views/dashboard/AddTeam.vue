<template>
  <div>
    Add Team
  </div>

  <div>
    <form @submit.prevent="submitForm">
      <div>
        <label>Team name</label>
        <div>
          <input type="text" name="name" class="input" v-model="name">
        </div>
      </div>

      <div>
        <button>Submit</button>
      </div>

    </form>
  </div>    
</template>

<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex';
import axios from 'axios'
import router from '@/router'

const store = useStore();

const name = ref('');

const submitForm = async () => {
  store.commit('setIsLoading', true)

  try {
    const team = {
      name: name.value,
    }

    const response = await axios.post(`/api/v1/teams/`, team)
    console.log(response)

      store.commit('setTeam', { 'id': response.data.id, 'name': response.data.name })
      router.push(`/dashboard/`)
    } catch (e) {
      console.error(e);
      }

    store.commit('setIsLoading', false)
  }

</script>

<style lang="scss" scoped>

</style>
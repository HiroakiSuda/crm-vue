<template>
  <div>
    team
  </div>

  <div>
    <h2>Members</h2>
  </div>

    <router-link to="/dashboard/team/add-member/">Add Member</router-link>

  <div>
    <table>
      <thead>
        <tr>
          <th>Name</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="member in members" :key="member.id">
          <td>{{ member.username }}</td>
        </tr>  
      </tbody>
    </table>
  </div>
</template>

<script setup>
import axios from 'axios'
import { ref, onMounted } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const members = ref([]);

const getTeam = async() => {
  store.commit('setIsLoading', true)

  try {
    const response = await axios.get(`/api/v1/teams/get_my_team/`);
    members.value = response.data;
    console.log(response.data)
  } catch (e) {
    console.error(e.message)
  }

  store.commit('setIsLoading', false)
}

onMounted(getTeam);

</script>

<style lang="scss" scoped>

</style>
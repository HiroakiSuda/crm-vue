<template>
  <div>
    Leads
  </div>

  <div>
    <router-link to="/dashboard/leads/add">Add lead</router-link>
  </div>
  <div>
    <table class="mx-auto">
      <thead>
        <tr>
          <th>Company</th>
          <th>Contact person</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="lead in leads" :key="lead.id">
          <td>{{ lead.id }}</td>
          <td>{{ lead.company }}</td>
          <td>{{ lead.contact_person }}</td>
          <td>{{ lead.status }}</td>
          <td>
            <router-link :to="`/dashboard/leads/` + parseInt(lead.id)">detail</router-link>
          </td>
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
const leads = ref([]);

const getLeads = async() => {
  store.commit('setIsLoading', true)

  try {
    const response = await axios.get(`/api/v1/leads/`);
    leads.value = response.data;
  } catch (e) {
    console.error(e.message)
  }

  store.commit('setIsLoading', false)
}

onMounted(getLeads);

</script>

<style lang="scss" scoped>

</style>
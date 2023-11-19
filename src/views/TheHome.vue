<template>
  <div>
    Leads
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
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import axios from 'axios'
import { ref, onMounted } from 'vue';

const leads = ref([]);

const getLeads = async() => {

  try {
    const response = await axios.get(`/api/v1/leads/`);
    leads.value = response.data;
  } catch (e) {
    console.error(e.message)
  }

}

onMounted(getLeads);

</script>

<style lang="scss" scoped>

</style>
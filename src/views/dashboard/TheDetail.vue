<template>
  <div>
    detail
  </div>

  <div>
    <h1>{{ lead.company }}</h1>

    <router-link :to="`/dashboard/leads/edit/` + parseInt(lead.id)">Edit</router-link>
  </div>

  <div>
    <h2>Detail</h2>
    <p><strong>Status:</strong>{{ lead.status }}</p>
    <p><strong>Priority:</strong>{{ lead.priority }}</p>
    <p><strong>Confidence:</strong>{{ lead.confidence }}</p>
    <p><strong>Estimated_value:</strong>{{ lead.estimated_value }}</p>
    <p><strong>Created at:</strong>{{ lead.created_at }}</p>
    <p><strong>Modified at:</strong>{{ lead.modified_at }}</p>
  </div>
</template>

<script setup>
import axios from 'axios';
import { ref, onMounted, defineProps } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const props = defineProps({
  id: {
    type: String,
    required: true,
  },
});

const lead = ref({});

const getLead = async () => {
  try {
    store.commit('setIsLoading', true);

    const response = await axios.get(`/api/v1/leads/${props.id}/`);
    lead.value = response.data;
    console.log(lead.value);
  } catch (e) {
    console.error(e);
  } finally {
    store.commit('setIsLoading', false);
  }
};

onMounted(getLead);
</script>

<style lang="scss" scoped>

</style>
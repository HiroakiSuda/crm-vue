<template>
    <div>
    Edit lead
  </div>

  <div>
    <router-link to="/dashboard/leads">back</router-link>
  </div>

  <div><h1>{{ lead.company }}</h1></div>

  <div>
    <form @submit.prevent="submitForm">
      <div>
        <label>Company</label>
        <div>
          <input type="text" name="company" class="input" v-model="lead.company">
        </div>
      </div>

      <div>
        <label>Contact person</label>
        <div>
          <input type="text" name="contact_person" class="input" v-model="lead.contact_person">
        </div>
      </div>

      <div>
        <label>Email</label>
        <div>
          <input type="email" name="email" class="input" v-model="lead.email">
        </div>
      </div>

      <div>
        <label>Phone</label>
        <div>
          <input type="text" name="phone" class="input" v-model="lead.phone">
        </div>
      </div>

      <div>
        <label>Website</label>
        <div>
          <input type="text" name="website" class="input" v-model="lead.website">
        </div>
      </div>

      <div>
        <label>Confidence</label>
        <div>
          <input type="number" name="confidence" class="input" v-model="lead.confidence">
        </div>
      </div>

      <div>
        <label>Estimated value</label>
        <div>
          <input type="text" name="estimated_value" class="input" v-model="lead.estimated_value">
        </div>
      </div>

      <div>
        <label>Status</label>
        <div>
          <select class="select" v-model="lead.status">
            <option value="new">New</option>
            <option value="contacted">Contacted</option>
            <option value="inprogress">Inprogress</option>
            <option value="lost">Lost</option>
            <option value="won">Won</option>
          </select>  
        </div>
      </div>

      <div>
        <label>Priority</label>
        <div>
          <select class="select" v-model="lead.priority">
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>  
        </div>
      </div>

      <div>
        <button>Update</button>
      </div>
    </form>
  </div>

</template>

<script setup>
import axios from 'axios';
import { ref, onMounted, defineProps } from 'vue';
import { useStore } from 'vuex';
import router from '@/router';

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

const submitForm = async () => {
  try {
    store.commit('setIsLoading', true);

    const response2 = await axios.patch(`/api/v1/leads/${props.id}/`, lead.value)
    lead.value = response2.data;

    router.push(`/dashboard/leads/${props.id}/`);
  } catch (e) {
    console.error(e)
  }
}

onMounted(getLead);
</script>

<style lang="scss" scoped>

</style>
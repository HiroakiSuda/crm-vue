<template>
  <div>
    Add lead
  </div>

  <div>
    <router-link to="/dashboard/leads">back</router-link>
  </div>

  <div>
    <form @submit.prevent="submitForm">
      <div>
        <label>Company</label>
        <div>
          <input type="text" name="company" class="input" v-model="company">
        </div>
      </div>

      <div>
        <label>Contact person</label>
        <div>
          <input type="text" name="contact_person" class="input" v-model="contact_person">
        </div>
      </div>

      <div>
        <label>Email</label>
        <div>
          <input type="email" name="email" class="input" v-model="email">
        </div>
      </div>

      <div>
        <label>Phone</label>
        <div>
          <input type="text" name="phone" class="input" v-model="phone">
        </div>
      </div>

      <div>
        <label>Website</label>
        <div>
          <input type="text" name="website" class="input" v-model="website">
        </div>
      </div>

      <div>
        <label>Confidence</label>
        <div>
          <input type="number" name="confidence" class="input" v-model="confidence">
        </div>
      </div>

      <div>
        <label>Estimated value</label>
        <div>
          <input type="text" name="estimated_value" class="input" v-model="estimated_value">
        </div>
      </div>

      <div>
        <label>Status</label>
        <div>
          <select class="select" v-model="status">
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
          <select class="select" v-model="priority">
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>  
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

const company = ref('');
const contact_person = ref('');
const email = ref('');
const phone = ref('');
const website = ref('');
const confidence = ref(0);
const estimated_value = ref(0);
const status = ref('new');
const priority = ref('medium');

const submitForm = async () => {
  store.commit('setIsLoading', true)

  try {
    const lead = {
    company: company.value,
    contact_person: contact_person.value,
    email: email.value,
    phone: phone.value,
    website: website.value,
    estimated_value: estimated_value.value,
    confidence: confidence.value,
    status: status.value,
    priority: priority.value
  }

  const response = await axios.post(`/api/v1/leads/`, lead);
    console.log(response)
  router.push(`/dashboard/leads`)
} catch (e) {
  console.error(e);
  }

  store.commit('setIsLoading', false)
}  
</script>

<style lang="scss" scoped>

</style>
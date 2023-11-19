<template>
  <div>
    Add Member
  </div>

  <div>
    <form @submit.prevent="submitForm">
      <div>
        <label>Email</label>
        <div>
          <input type="email" name="email" class=input v-model="username">
        </div>
      </div>

      <div v-if="emailErrors.length">
        <p v-for="error in emailErrors" :key="error">
        {{ error }}
        </p>
      </div>
      <div>
      <label>Password</label>
      <div>
        <input type="password" name="password1" class=input v-model="password1">
        </div>
      </div>

       <div v-if="password1Errors.length">
         <p v-for="error in password1Errors" :key="error">
         {{ error }}
         </p>
       </div>

       <div>
         <label>Re Password</label>
         <div>
           <input type="password" name="password2" class=input v-model="password2">
         </div>
       </div>

      <div v-if="password2Errors.length">
        <p v-for="error in password2Errors" :key="error">
        {{ error }}
        </p>
      </div>

      <div>
        <button>Submit</button>
      </div>

    </form>
  </div>

</template>

<script setup>
  import { ref } from 'vue'
  import axios from 'axios'
  import router from '@/router'
  import { useStore } from 'vuex'

  const username = ref('');
  const password1 = ref('');
  const password2 = ref('');

  const emailErrors = ref([]);
  const password1Errors = ref([]);
  const password2Errors = ref([]);

  const store = useStore();

  const submitForm = async() => {
    try {
      emailErrors.value = [];
      password1Errors.value = [];
      password2Errors.value = [];

      if (username.value === '') {
        emailErrors.value.push('miss')
      }
      if (password1.value === '') {
        password1Errors.value.push('short')
      }
      if (password2.value !== password1.value) {
        password2Errors.value.push('not mutch')
      }

      if (emailErrors.value.length === 0 && password1Errors.value.length === 0 && password2Errors.value.length === 0) {
        store.commit('setIsLoading', true)

        const formData = {
          username: username.value,
          password: password1.value,
        }

        await axios.post('/api/v1/users/', formData)

        const emailData = {
          email: username.value
        }  

        axios
          .post('/api/v1/teams/add_member/', emailData)
          .then(() => {
            console.log('success')
           
            router.push(`/dashboard/team`)
          })
      } 
    } catch(error) {
          if (error) {
            for (const property in error.response.data) {
              emailErrors.value && password1Errors.value.push(`${property}: ${error.response.data[property]}`)
            }
          } else if (error.message) {
            password1Errors.value.push('Pleasse try again')
          }
        }
      store.commit('setIsLoading', false)  
    }
</script>

<style lang="scss" scoped>

</style>
<template>
  <div class="container">
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
          <button>Log In</button>
        </div>

      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'
import axios from 'axios'
import router from '@/router'

const username = ref('');
const password1 = ref('');
const emailErrors = ref([]);
const password1Errors = ref([]);
const store = useStore();

const submitForm = async() => {
  store.commit('setIsLoading', true)

  try {
    axios.defaults.headers.common['Authorization'] = ''
    localStorage.removeItem('token')

    const formData = {
      username: username.value,
      password: password1.value,
    }

    await axios
      .post(`/api/v1/token/login/`, formData)
      .then((response) => {
        const token = response.data.auth_token

        store.commit('setToken', token)

        axios.defaults.headers.common['Authorization'] = 'Token ' + token
        localStorage.setItem('token', token)
        console.log(response.data.auth_token)
        router.push('/dashboard/my-account')
      })
   } catch(error) {
     if (error.response && error.response.data) {
       for (const property in error.response.data) {
         emailErrors.value && password1Errors.value.push(`${property}: ${error.response.data[property]}`)
       }
       
     } else if (error.message) {
        password1Errors.value.push('Pleasse try again')
      }
    }

    await axios.get(`/api/v1/users/me`)
      .then(response => {
        store.commit('setUser', { 'id': response.data.id, 'username': response.data.username })

        localStorage.setItem('userId', response.data.id)
        localStorage.setItem('username', response.data.username)

        router.push(`/dashboard/my-account/`)
      })
      .catch(error => {
        console.log(error)
      })

    await axios.get(`/api/v1/teams/get_my_team/`)
    .then(response => {
      store.commit('setTeam', { 'id': response.data.id, 'name': response.data.name })
      
      router.push(`/dashboard/my-account/`)
    })
    .catch(error => {
      console.log(error)
    })


    store.commit('setIsLoading', false)
}
</script>

<style lang="scss" scoped>

</style>
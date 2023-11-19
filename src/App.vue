<template>
  <TheNavbar />

  <!-- Loading設定 storeでisLoadingを指定している -->
  <div class="bg-red-500 w-10 h-10" :class="{ 'is-loading': $store.state.isLoading }">
    <div class="bg-bule w-10 h-10"></div>
  </div>
  <section>
    <router-view />
  </section>
</template>

<script>
import axios from 'axios'
import TheNavbar from '@/components/layout/TheNavbar'

export default {
  name: 'App',
  components: {
    TheNavbar
  },
  beforeCreate() {
    this.$store.commit('initializeStore')

    console.log(this.$store.state.user)
    console.log(this.$store.state.team)

    if (this.$store.state.token) {
      axios.defaults.headers.common['Authorization'] = 'Token ' + this.$store.state.token
    } else {
      axios.defaults.headers.common['Authorization'] = ""
    }

    if (!this.$store.state.team.id) {
      this.$router.push(`/dashboard/add-team`)
    }
  }
}
</script>

<style scoped>
</style>

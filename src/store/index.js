import { createStore } from 'vuex'

export default createStore({
  state: {
    isLoading: false,
    isAuthenticated: false,
    token: '',
    user: {
      id: 0,
      username: '',
    },
    team: {
      id: 0,
      name: '',
    }
  },
  mutations: {
    initializeStore(state) {
      if (localStorage.getItem('token')) {
        state.token = localStorage.getItem('token')
        state.isAuthenticated = true
        state.user.id = localStorage.getItem('userId')
        state.user.username = localStorage.getItem('username')
        state.team.id = localStorage.getItem('teamId')
        state.team.name = localStorage.getItem('name')
      } else {
        state.token = ''
        state.isAuthenticated = false
        state.user.id = 0
        state.user.username = ''
        state.team.id = 0
        state.team.name = ''
      }
    },
    setIsLoading(state, status) {
      state.isLoading = status
    },
    setToken(state, token) {
      state.token = token
      state.isAuthenticated = true
    },
    removeToken(state) {
      state.token = ''
      state.isAuthenticated = false
    },
    setUser(state, user) {
      state.user = user
    },
    setTeam(state, team) {
      state.team = team

      localStorage.setItem('teamId', team.id)
      localStorage.setItem('name', team.name)
    },
  },
  actions: {

  },
  modules: {

  },
})
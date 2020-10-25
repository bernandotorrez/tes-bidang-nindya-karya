<template>
  <nav class="navbar navbar-dark sticky-top bg-success flex-md-nowrap p-0 shadow">
    <a class="navbar-brand col-md-3 col-lg-2 mr-0 px-3" href="#">{{ title }}</a>
    <button
      class="navbar-toggler position-absolute d-md-none collapsed"
      type="button"
      data-toggle="collapse"
      data-target="#sidebarMenu"
      aria-controls="sidebarMenu"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon" />
    </button>
    <ul class="navbar-nav px-3">
      <li class="nav-item text-nowrap">
        <a class="nav-link text-white" href="#" @click="logout">
          Sign out
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  data () {
    return {
      title: 'PT. Nindya Karya'
    }
  },
  methods: {
    ...mapMutations(['SET_IS_AUTH']),
    logout () {
      this.SET_IS_AUTH(false)
      console.log(this.$router)
      this.$router.redirect('/login')
    }
  }
}
</script>

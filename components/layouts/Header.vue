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
    <ul class="nav nav-pills">
      <li class="nav-item dropdown">
        <a
          class="nav-link text-white dropdown-toggle"
          data-toggle="dropdown"
          href="#"
          role="button"
          aria-haspopup="true"
          aria-expanded="false"
        >Welcome, {{ user.nama }}</a>
        <div class="dropdown-menu">
          <a class="dropdown-item" href="#" @click="logout">Logout</a>
        </div>
      </li>
    </ul>
  </nav>
</template>

<script>

export default {
  data () {
    return {
      title: 'PT. Nindya Karya',
      user: null
    }
  },
  created () {
    this.user = this.$store.state.user
  },
  methods: {
    logout () {
      this.$router.push('/login')
    }
  }
}
</script>

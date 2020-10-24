<template>
  <div id="wrapper">
    <app-sidebar v-if="isAuth" />
    <div id="content-wrapper" class="d-flex flex-column">
      <div id="content">
        <app-navbar v-if="isAuth" />
        <nuxt />
      </div>
    </div>
  </div>
</template>

<script>
import Header from '@/components/layouts/Header'
import Sidebar from '@/components/layouts/Sidebar'

import { mapState } from 'vuex'

export default {
  middleware: 'authentication',
  components: {
    'app-navbar': Header,
    'app-sidebar': Sidebar
  },
  computed: {
    ...mapState(['isAuth']) // JADI ISAUTH KITA AMBIL DARI STATE INDEX.JSS
  }
}
</script>

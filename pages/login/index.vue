<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-xl-10 col-lg-12 col-md-9">
        <div class="card o-hidden border-0 shadow-lg my-5">
          <div class="card-body p-0">
            <div class="row">
              <div class="col-lg-6 offset-3">
                <div class="p-5">
                  <div class="text-center">
                    <h1 class="h4 text-gray-900 mb-4">
                      Login
                    </h1>
                  </div>

                  <p />
                  <div v-if="loginFailed" class="text-center alert alert-danger">
                    Email or Password is Wrong!
                  </div>

                  <form class="user">
                    <div class="form-group">
                      <input
                        id="exampleInputEmail"
                        v-model="auth.email"
                        type="email"
                        aria-describedby="emailHelp"
                        placeholder="Enter Email Address..."
                        class="form-control form-control-user"
                      >
                    </div>
                    <div class="form-group">
                      <input
                        id="exampleInputPassword"
                        v-model="auth.password"
                        type="password"
                        placeholder="Password"
                        class="form-control form-control-user"
                      >
                    </div>
                    <button class="btn btn-primary btn-user btn-block" type="button" @click="userLoggin">
                      Login
                    </button>
                    <hr>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  data () {
    return {
      auth: {
        email: null,
        password: null
      },
      loginFailed: false
    }
  },
  mounted () {
    this.SET_IS_AUTH(false)
  },
  methods: {
    ...mapMutations(['SET_IS_AUTH', 'SET_USER']),
    userLoggin () {
      if (this.auth.email === 'bernandotorrez4@gmail.com' && this.auth.password === 'B3rnando') {
        this.SET_IS_AUTH(true)
        this.SET_USER({ email: this.auth.email, nama: 'Bernand Dayamuntari Hermawan' })
        this.$router.push('/dashboard')
      } else {
        this.loginFailed = true
      }
    }
  }
}
</script>

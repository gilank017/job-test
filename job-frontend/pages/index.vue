<template lang="pug">
  .container.my-5
    .title-page.text-center.mb-5 Login Page
    .row.justify-content-center
      .col-md-8
        .card
          .card-body
            div.form-group
              label(for="email") Email
              input#email.form-control(v-model="loginForm.email",:class="loginValidation.email.status",type="text",placeholder="Enter your email")
              div.invalid-feedback {{ loginValidation.email.message }}
            div.form-group
              label(for="password") Password
              input#password.form-control(v-model="loginForm.password",:class="loginValidation.password.status",type="password",placeholder="Enter your password")
              div.invalid-feedback {{ loginValidation.password.message }}
            div.mt-3.text-right
              button.btn.btn-warning.text-white.waves-effect.waves-light.w-sm(@click="submitLogin()") Log In
            div.mt-4.text-center
              p.mb-0 Belum mempunyai akun ?&nbsp;
                n-link(to="register" class="text-primary title") Daftar disini
</template>
<script>
export default {
  data() {
    return {
      loginForm: {},
      loginValidation: {
        email: {
          status: '',
          message: ''
        },
        password: {
          status: '',
          message: ''
        },
      }
    }
  },
  methods: {
    async submitLogin() {
      const { status, data } = await this.$axios.post('/login', this.loginForm)
      .then((res) => {
        return res.data
      })
      if (status) {
        this.$store.commit('saveCredential',data)
        // eslint-disable-next-line
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          showConfirmButton: false,
          text: 'Anda Berhasil Login',
          timer: 2000,
          timerProgressBar: true,
        })
        this.$router.push({
          path: '/jobs',
        })
      } else {
        this.loginValidation = {
          email: {
            status: 'is-valid',
            message: ''
          },
          password: {
            status: 'is-valid',
            message: ''
          },
        }
        Object.entries(data).forEach((error) => {
          this.loginValidation[error[0]].status =
            error[1][0] !== undefined ? 'is-invalid' : 'is-valid'
          this.loginValidation[error[0]].message = error[1][0]
        })
      }
    }
  }
}
</script>
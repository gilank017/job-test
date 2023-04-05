<template lang="pug">
  .container.my-5
    .title-page.text-center.mb-5 Register Page
    .row.justify-content-center
      .col-md-8
        .card
          .card-body
            div.form-group
              label(for="name") Name
              input#name.form-control(v-model="registerForm.name",:class="registerValidation.name.status",type="text",placeholder="Enter your name")
              div.invalid-feedback {{ registerValidation.name.message }}
            div.form-group
              label(for="email") Email
              input#email.form-control(v-model="registerForm.email",:class="registerValidation.email.status",type="text",placeholder="Enter your email")
              div.invalid-feedback {{ registerValidation.email.message }}
            div.form-group
              label(for="password") Password
              input#password.form-control(v-model="registerForm.password",:class="registerValidation.password.status",type="password",placeholder="Enter your password")
              div.invalid-feedback {{ registerValidation.password.message }}
            div.mt-3.text-right
              button.btn.btn-warning.text-white.waves-effect.waves-light.w-sm(@click="submitRegister()") Register
</template>
<script>
export default {
  data() {
    return {
      registerForm: {},
      registerValidation: {
        name: {
          status: '',
          message: '',
        },
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
    async submitRegister() {
      const { status, data } = await this.$axios.post('/register', this.registerForm)
      .then((res) => {
        return res.data
      })
      if (status) {
        // eslint-disable-next-line
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          showConfirmButton: false,
          text: 'Silahkan Login Untuk Melanjutkan',
          timer: 2000,
          timerProgressBar: true,
        })
        this.$router.push({
          path: '/',
        })
      } else {
        this.registerValidation = {
          name: {
            status: 'is-valid',
            message: ''
          },
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
          this.registerValidation[error[0]].status =
            error[1][0] !== undefined ? 'is-invalid' : 'is-valid'
          this.registerValidation[error[0]].message = error[1][0]
        })
      }
    }
  }
}
</script>
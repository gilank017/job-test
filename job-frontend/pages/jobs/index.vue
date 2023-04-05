<template lang="pug">
  .job-list-page-wrapper.m-5.p-5
    h5.mb-3 List Job
    .text-right
      button.btn.btn-success.btn-sm.text-white.waves-effect.waves-light.w-sm(@click="openModalJob()") Buat Pekerjaan
    .table-responsive.mt-3
      table.table
        thead
          tr
            th No
            th Nama Pekerjaan
            th Deskripsi
            th Pendidikan Minimal
            th Dibuat
            th Berakhir
            th Quota
            th Aksi
        tbody
          tr(v-for="(val, index) in listJob" :key="index")
            td {{ index + 1 }}
            td {{ val.name }}
            td {{ val.description }}
            td {{ val.min_education }}
            td {{ parseDate(val.created_date) }}
            td {{ parseDate(val.expired_date) }}
            td {{ val.quota }}
            td
              button.btn.btn-primary.mr-2(@click="openModalJob(val)") update
              button.btn.btn-danger(@click="deleteJob(val.id)") hapus
    #adjust-job.modal.fade(role="dialog" aria-labelledby="adjustjob" aria-hidden="true" data-backdrop="static" data-keyboard="false")
      .modal-dialog.modal-dialog-centered(role="document")
        .modal-content
          .modal-header
            h5#adjustjob.modal-title {{ state }} Pekerjaan
            button.close(aria-label="Close" @click="closeModal()")
              span(aria-hidden="true") &times;
          .modal-body
            .form-group
              label(for="name") Name
              input#name.form-control(v-model="jobForm.name" :class="jobValidation.name.status" type="text" placeholder="Enter name job")
              div.invalid-feedback {{ jobValidation.name.message }}
            .form-group
              label(for="description") Description
              textarea#description.form-control(v-model="jobForm.description" :class="jobValidation.description.status" type="text" placeholder="Enter Description")
              div.invalid-feedback {{ jobValidation.description.message }}
            .form-group
              label(for="min-education") Minimal Education
              select#min-education.form-control(v-model="jobForm.min_education" :class="jobValidation.min_education.status")
                option(value="SD") SD
                option(value="SMP") SMP
                option(value="SMA") SMA
                option(value="S1") S1
              div.invalid-feedback {{ jobValidation.min_education.message }}
            .form-group
              label(for="created-date") Created Date
              input#created-date.form-control(:class="jobValidation.created_date.status")
              div.invalid-feedback {{ jobValidation.created_date.message }}
            .form-group
              label(for="expired-date") Expired Date
              input#expired-date.form-control(:class="jobValidation.expired_date.status")
              div.invalid-feedback {{ jobValidation.expired_date.message }}
            .form-group
              label(for="quota") Quota
              input#quota.form-control(v-model="jobForm.quota" :class="jobValidation.quota.status" type="number" placeholder="Enter quota")
              div.invalid-feedback {{ jobValidation.quota.message }}
            .text-right
              button.btn.btn-warning.text-white.waves-effect.waves-light.w-sm(@click="submitJob()") Simpan
</template>
<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      listJob: [],
      state: "Tambah",
      selectedId: null,
      jobForm: {},
      jobValidation: {
        name: {
          status: '',
          message: ''
        },
        description: {
          status: '',
          message: ''
        },
        min_education: {
          status: '',
          message: ''
        },
        created_date: {
          status: '',
          message: ''
        },
        expired_date: {
          status: '',
          message: ''
        },
        quota: {
          status: '',
          message: ''
        },
      }
    }
  },
  computed: {
    ...mapState({
      token: (state) => state.user.token
    })
  },
  mounted() {
    this.getListJob()
    const vm = this
    const intervalInitDate = setInterval(() => {
      // eslint-disable-next-line
      if ($.isFunction($.fn.datetimepicker)) {
        console.log($.fn.datetimepicker)
        clearInterval(intervalInitDate)
        vm.initDate()
      }
    }, 50)
  },
  methods: {
    initDate() {
      const vm = this
      // eslint-disable-next-line
      $("#created-date").datetimepicker({
          defaultDate:
            this.jobForm.created_date ||
            vm.$moment().format('YYYY-MM-DD'),
          format: `YYYY-MM-DD`,
        })
        .on('dp.change', (e) => {
          vm.jobForm.created_date = e.date.format(e.date._f)
        })
      // eslint-disable-next-line
      $('#expired-date').datetimepicker({
          defaultDate:
            this.jobForm.expired_date || vm.$moment().format('YYYY-MM-DD'),
          format: `YYYY-MM-DD`,
        })
        .on('dp.change', (e) => {
          vm.jobForm.expired_date = e.date.format(e.date._f)
        })
    },
    async getListJob() {
      const config = {
        headers: {
          'Authorization': `Bearer ` + this.token
        }
      }
      const { status, data } = await this.$axios.get('job', config)
      .then((res) => {
        return res.data
      })
      if (status) {
        this.listJob = data
      }
    },
    parseDate(date) {
      return this.$moment(date).format("DD-MM-YYYY")
    },
    openModalJob(val) {
      if (val !== undefined) {
        this.state = "Update"
        this.selectedId = val.id
        this.jobForm = {
          name: val.name,
          description: val.description,
          min_education: val.min_education,
          created_date: val.created_date,
          expired_date: val.expired_date,
          quota: val.quota
        }
      } else {
        this.state = "Tambah"
        this.jobForm = {}
        this.selectedId = null
      }
      // eslint-disable-next-line
      $('#adjust-job').modal('show')
    },
    closeModal() {
      // eslint-disable-next-line
      $('#adjust-job').modal('hide')
    },
    resetValidation() {
      this.jobValidation = {
        name: {
          status: '',
          message: ''
        },
        description: {
          status: '',
          message: ''
        },
        min_education: {
          status: '',
          message: ''
        },
        created_date: {
          status: '',
          message: ''
        },
        expired_date: {
          status: '',
          message: ''
        },
        quota: {
          status: '',
          message: ''
        },
      }
    },
    async submitJob() {
      let method = ''
      let url = ''
      let message = ''
      const config = {
        'Authorization': `Bearer ` + this.token
      }
      if (this.state === 'Tambah') {
        method = 'POST'
        url = '/job/create'
        message = 'Pekerjaan berhasil ditambah'
      } else {
        method = 'PATCH'
        url = `/job/update?job_id=${this.selectedId}`
        message = 'Pekerjaan berhasil diupdate'
      }
      const { status, data } = await this.$axios({
        method,
        url,
        data: this.jobForm,
        headers: config
      })
      .then((res) => {
        return res.data
      })
      if (status) {
        // eslint-disable-next-line
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          showConfirmButton: false,
          text: message,
          timer: 2000,
          timerProgressBar: true,
        })
        this.closeModal()
        this.resetValidation()
        this.getListJob() 
      } else {
        this.jobValidation = {
          name: {
            status: 'is-valid',
            message: ''
          },
          description: {
            status: 'is-valid',
            message: ''
          },
          min_education: {
            status: 'is-valid',
            message: ''
          },
          created_date: {
            status: 'is-valid',
            message: ''
          },
          expired_date: {
            status: 'is-valid',
            message: ''
          },
          quota: {
            status: 'is-valid',
            message: ''
          },
        }
        Object.entries(data).forEach((error) => {
          this.jobValidation[error[0]].status =
            error[1][0] !== undefined ? 'is-invalid' : 'is-valid'
          this.jobValidation[error[0]].message = error[1][0]
        })
      }
    },
    deleteJob(id) {
      // eslint-disable-next-line
      Swal.fire({
        title: 'Apakah kamu yakin ingin menghapus pekerjaan ini?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes',
      }).then(async (result) => {
        if (result.isConfirmed) {
          const config = {
            headers: {
              'Authorization': `Bearer ` + this.token
            }
          }
          const { status, message } = await this.$axios
            .delete(`job/delete/${id}`, config)
            .then((result) => {
              return result.data
            })
          if (status) {
            // eslint-disable-next-line
              Swal.fire({
              icon: 'success',
              title: 'Success!',
              showConfirmButton: false,
              text: message,
              timer: 2000,
              timerProgressBar: true,
            })
            this.getListJob()
          }
        }
      })
    },
  }
}
</script>

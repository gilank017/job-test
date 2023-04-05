<template lang="pug">
  .job-list-page-wrapper.m-5.p-5
    h5.mb-3 List Job
    .text-right
      button.btn.btn-success.btn-sm.text-white.waves-effect.waves-light.w-sm Buat Pekerjaan
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
              button.btn.btn-primary.mr-2 update
              button.btn.btn-danger hapus
</template>
<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      listJob: []
    }
  },
  computed: {
    ...mapState({
      token: (state) => state.user.token
    })
  },
  mounted() {
    this.getListJob()
  },
  methods: {
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
    }
  }
}
</script>

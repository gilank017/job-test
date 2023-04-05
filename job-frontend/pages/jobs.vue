<template lang="pug">
  nuxt-child
</template>
<script>
export default {
  middleware: 'login',
  head() {
    return {
      link: [
        {
          rel: 'stylesheet',
          type: 'text/css',
          href: '/css/bootstrap-datetimepicker.css',
        },
      ],
      script: [
        { src: '/js/moment.min.js' },
        { src: '/js/bootstrap-datetimepicker.min.js', defer: true },
      ]
    }
    
  }
}
</script>
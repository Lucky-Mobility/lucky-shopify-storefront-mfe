<template>
  <div>
    <h1>About page</h1>
    <nuxt-link to="/">Home</nuxt-link>
    <LuckyLocalApp />
  </div>
</template>

<script>
import LuckyLocalApp from '~/components/LuckyLocalApp.vue'

// export default defineComponent({
//   components: { LuckyLocalApp },
//   ssr: false,
// })
export default {
  components: { LuckyLocalApp }
}
</script>

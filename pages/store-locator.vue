<template>
  <div>
    <h1>Store Locator Page</h1>
    <nuxt-link to="/">Home</nuxt-link>
    <LuckyStoreLocatorApp />
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue-demi'
import LuckyStoreLocatorApp from '~/components/LuckyStoreLocatorApp.vue'

// export default defineComponent({
//   components: { LuckyStoreLocatorApp },
//   ssr: false,
// })

export default {
  components: { LuckyStoreLocatorApp }
}
</script>

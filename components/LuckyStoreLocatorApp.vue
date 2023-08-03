<template>
  <div>
    <div ref="luckyStoreLocatorApp"></div>
  </div>
</template>

<script>
export default {
  name: 'LuckyStoreLocatorApp',

  methods: {
   
  },
  mounted() {
    const ele = this.$refs.luckyStoreLocatorApp
    const luckyBaseProxyUrl = this.$config.luckyBaseProxyUrl

    async function fetchImport() {
      return new Promise(async (resolve, reject) => {
        try {
          //@ts-ignore
          const res = (await import('luckyStoreLocator/MainPage')).default // Note: luckyLocal is the name you define in MF in your nuxt.config.js. And MainPage is the our fixed name
           
          res.mount(ele, {
            baseURL: luckyBaseProxyUrl, // or can be your proxy base url. e.g. http://caliray-lucky.com/shopify/some-path
          })
          resolve(true)
        } catch (err) {
          reject(err)
        }
      })
    }

    if (typeof window !== 'undefined') {
      fetchImport()
    }
  },
}
</script>

<template>
  <div>
    <div ref="luckyApp" id="lucky-affiliating"></div>
    <div id="aff-lucky-plugin-modal"></div>
    <button @click="changeSelectedVariant">Change variant</button>
  </div>
</template>

<script>
export default {
  name: 'LuckyLocalApp',
  data: () => {
    return {
      productData: {
        productId: '8205136658735',
        defaultSelectedVariantId: '44778158784815',
      },
    }
  },
  methods: {
    changeSelectedVariant() {
      this.dispatchChangeSelectedVariant('45130294231343')
    },
    dispatchChangeSelectedVariant(variantId) {
      const event = new CustomEvent('lsp_change_selected_variant', {
        detail: { variantId },
      })
      window.dispatchEvent(event)
    },
  },
  mounted() {
    const ele = this.$refs.luckyApp
    const { productId, defaultSelectedVariantId } = this.productData
    const proxyPath = this.$config.luckyProxyPath

    async function fetchImport() {
      return new Promise(async (resolve, reject) => {
        try {
          //@ts-ignore
          const res = (await import('luckyLocal/LuckyPickupButton')).default
          res.mount(ele, {
            productId,
            selectedVariantId: defaultSelectedVariantId,
            baseURL: proxyPath,
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

// export default defineComponent({
//   ssr: false,
//   async setup() {
//     const luckyApp = ref(null)

//     async function fetchImport() {
//       return new Promise(async (resolve, reject) => {
//         try {
//           //@ts-ignore
//           const res = (await import('luckyLocal/LuckyPickupButton')).default

//           console.log(luckyApp.value, res)

//           res.mount(luckyApp, {
//             productId: '12412312312',
//             selectedVariantId: '123123123123',
//             baseURL: '/api/lucky',
//           })
//           resolve(true)
//         } catch (err) {
//           reject(err)
//         }
//       })
//     }

//     onMounted(() => {
//       if (typeof window !== 'undefined') {
//         fetchImport()
//       }
//     })

//     return { luckyApp }
//   },
// })
</script>

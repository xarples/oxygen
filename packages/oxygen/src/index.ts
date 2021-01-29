import { Plugin } from 'vue'
import { OButton } from '@xarples/oxygen-button'

import '@xarples/oxygen-button/dist/index.min.css'


const plugin: Plugin = {
  install (app, options) {
    app.component('OButton', OButton)
  }
}

export default plugin
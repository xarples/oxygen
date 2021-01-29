import DefaultTheme from 'vitepress/dist/client/theme-default'
import Oxygen from '@xarples/oxygen'

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.use(Oxygen)
  }
}
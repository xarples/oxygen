import fs from "fs"
import path from "path"
import babel from "rollup-plugin-babel"
import vue from 'rollup-plugin-vue'
import minimist from "minimist"
import commonjs from "@rollup/plugin-commonjs"
import { terser } from "rollup-plugin-terser"
import { getPackagesSync } from '@lerna/project'
import css from "rollup-plugin-css-only"
// import alias from "@rollup/plugin-alias"

const argv = minimist(process.argv.slice(2))
const workDirectory = process.cwd()
const packages = getPackagesSync(workDirectory)
const esbrowserslist = fs
  .readFileSync("./.browserslistrc")
  .toString()
  .split("\n")
  .filter(entry => entry && entry.substring(0, 2) !== "ie")

const external = [
  "vue",
  "@vue/server-renderer",
  "@xarples/oxygen-button",
  '@xarples/oxygen-button/dist/index.min.css'
]

const globals = {
  vue: "vue",
  "@vue/server-renderer": "serverRenderer",
  "@xarples/oxygen-button": "oxygenButton"
}

const configs = packages.map(lernaPackage => {
  const localOxygenOptions = lernaPackage.get('@xarples/oxygen')
  const packageName = lernaPackage.name

  if (!argv.format || argv.format === "es") {
    return {
      input: path.join(lernaPackage.location, 'src', 'index.ts'),
      output: {
        file: path.join(lernaPackage.location, 'dist', 'index.esm.js'),
        format: 'esm',
        exports: "named"
      },
      external,
      plugins: [
        css({
          output: path.join(lernaPackage.location, 'dist', 'index.min.css')
        }),
        vue(),
        babel({
          exclude: "node_modules/**",
          extensions: [".js", ".jsx", ".ts", ".tsx", ".vue"]
        }),
        commonjs()
      ]
    }
  }

  if (!argv.format || argv.format === "cjs") {
    return {
      input: path.join(lernaPackage.location, 'src', 'index.ts'),
      output: {
        compact: true,
        file: path.join(lernaPackage.location, 'dist', 'index.ssr.js'),
        format: 'esm',
        name: localOxygenOptions.componentName,
        exports: "named",
        globals,
      },
      external,
      plugins: [
        css({
          output: path.join(lernaPackage.location, 'dist', 'index.min.css')
        }),
        vue({ target: 'node' }),
        babel({
          exclude: "node_modules/**",
          extensions: [".js", ".jsx", ".ts", ".tsx", ".vue"],
          presets: [
            [
              "@babel/preset-env",
              {
                targets: esbrowserslist
              }
            ]
          ]
        }),
        commonjs(),
      ]
    }
  } 

  if (!argv.format || argv.format === "iife") {
    return {
      input: path.join(lernaPackage.location, 'src', 'index.ts'),
      output: {
        compact: true,
        file: path.join(lernaPackage.location, 'dist', 'index.min.js'),
        format: 'esm',
        name: localOxygenOptions.componentName,
        exports: "named",
        globals,
      },
      external,
      plugins: [
        css({
          output: path.join(lernaPackage.location, 'dist', 'index.min.css')
        }),
        vue({ target: 'node' }),
        babel({
          exclude: "node_modules/**",
          extensions: [".js", ".jsx", ".ts", ".tsx", ".vue"]
        }),
        commonjs(),
        terser({
          output: {
            ecma: 5
          }
        })
      ]
    }
  } 
})

export default configs
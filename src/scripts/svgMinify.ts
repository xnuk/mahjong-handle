#!/usr/bin/env node

const { readFile, writeFile } = require('fs/promises')
const glob = require('fast-glob')
const { optimize } = require('svgo')

const main = async (verbose: boolean) => {
  const paths = await glob(['../../build/tiles/**/*.svg'], {
    cwd: __dirname,
    absolute: true,
    extglob: false,
  })

  console.log('Minifing SVG tiles...')

  const tasks = Promise.all(
    paths.map(async (path: string) => {
      const source = await readFile(path, 'utf8')
      const result = optimize(source, { multipass: true })

      if ('data' in result) {
        const data = result.data

        if (verbose) {
          const percentage = Math.round((data.length / source.length) * 100)
          setTimeout(() =>
            console.log(`optimized ${path}: ${percentage}% of original`)
          )
        }

        return writeFile(path, data)
      }
    })
  )

  await tasks
}

main(process.argv.includes('--verbose') || process.argv.includes('-v'))

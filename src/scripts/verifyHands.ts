#!/usr/bin/env node

const Riichi = require('riichi')
const { readFile, writeFile } = require('fs/promises')
const path = require('path')

const main = async () => {
  const source = await readFile(
    path.resolve(__dirname, '../constants/hands.ts'),
    'utf8'
  )
  const regex: RegExp = /([1-9][mpsz]){13}\+?[1-9][mpsz]\+\d\d/g
  for (const hand of source.match(regex)) {
    const riichiCalc = new Riichi(hand).calc()
    if (riichiCalc.isAgari && Object.keys(riichiCalc.yaku).length > 0) {
      continue
    }
    console.log(hand)
  }
}

main()

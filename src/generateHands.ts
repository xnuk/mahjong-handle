#!/usr/bin/env node

const Riichi = require('riichi')

const shuffle = <T>(array: Array<T>) => {
  array.sort(() => Math.random() - 0.5)
}

const tileCategoriesWithoutZ: Array<string> = ['m', 'p', 's']
const tileCategoryOrder: { [id: string]: number } = {
  m: 0,
  p: 1,
  s: 2,
  z: 3,
}

const generateThirteenOrphans = () => {
  var hand = [
    '1m',
    '9m',
    '1p',
    '9p',
    '1s',
    '9s',
    '1z',
    '2z',
    '3z',
    '4z',
    '5z',
    '6z',
    '7z',
  ]
  hand.push(hand[Math.floor(Math.random() * hand.length)])
  shuffle(hand)
  const last = hand.pop()
  return `${hand.join('')}${Math.random() < 0.25 ? '' : '+'}${last}+${
    Math.floor(Math.random() * 2) + 1
  }${Math.floor(Math.random() * 4) + 1}`
}

const generateSevenPairs = () => {
  var tiles = [
    '1m',
    '2m',
    '3m',
    '4m',
    '5m',
    '6m',
    '7m',
    '8m',
    '9m',
    '1p',
    '2p',
    '3p',
    '4p',
    '5p',
    '6p',
    '7p',
    '8p',
    '9p',
    '1s',
    '2s',
    '3s',
    '4s',
    '5s',
    '6s',
    '7s',
    '8s',
    '9s',
    '1z',
    '2z',
    '3z',
    '4z',
    '5z',
    '6z',
    '7z',
  ]
  var hand: Array<string> = []
  shuffle(tiles)
  for (let i = 0; i < 7; i++) {
    const tile = tiles.pop()
    if (tile !== undefined) {
      hand.push(tile)
      hand.push(tile)
    }
  }
  const last = hand.pop()
  return `${hand.join('')}${Math.random() < 0.25 ? '' : '+'}${last}+${
    Math.floor(Math.random() * 2) + 1
  }${Math.floor(Math.random() * 4) + 1}`
}

const generateNormalHand = () => {
  const tiles = [
    '1m',
    '2m',
    '3m',
    '4m',
    '5m',
    '6m',
    '7m',
    '8m',
    '9m',
    '1p',
    '2p',
    '3p',
    '4p',
    '5p',
    '6p',
    '7p',
    '8p',
    '9p',
    '1s',
    '2s',
    '3s',
    '4s',
    '5s',
    '6s',
    '7s',
    '8s',
    '9s',
    '1z',
    '2z',
    '3z',
    '4z',
    '5z',
    '6z',
    '7z',
  ]
  var tileMap: { [id: string]: number } = {
    '1m': 0,
    '2m': 0,
    '3m': 0,
    '4m': 0,
    '5m': 0,
    '6m': 0,
    '7m': 0,
    '8m': 0,
    '9m': 0,
    '1p': 0,
    '2p': 0,
    '3p': 0,
    '4p': 0,
    '5p': 0,
    '6p': 0,
    '7p': 0,
    '8p': 0,
    '9p': 0,
    '1s': 0,
    '2s': 0,
    '3s': 0,
    '4s': 0,
    '5s': 0,
    '6s': 0,
    '7s': 0,
    '8s': 0,
    '9s': 0,
    '1z': 0,
    '2z': 0,
    '3z': 0,
    '4z': 0,
    '5z': 0,
    '6z': 0,
    '7z': 0,
  }

  for (let i = 0; i < 4; i++) {
    while (true) {
      const p = Math.random()
      if (p < 0.8) {
        // straight
        const initNum = Math.floor(Math.random() * 7 + 1)
        const category =
          tileCategoriesWithoutZ[
            Math.floor(Math.random() * tileCategoriesWithoutZ.length)
          ]
        var clonedTileMap: { [id: string]: number } = JSON.parse(
          JSON.stringify(tileMap)
        )
        for (let j = 0; j < 3; j++) {
          const num = initNum + j
          const tile = `${num}${category}`
          if (clonedTileMap[tile] >= 3) {
            continue
          } else {
            clonedTileMap[tile] += 1
          }
        }
        tileMap = clonedTileMap
        break
      } else {
        // triplet
        const tile = tiles[Math.floor(Math.random() * tiles.length)]
        if (tileMap[tile] >= 2) {
          continue
        } else {
          tileMap[tile] += 3
        }
        break
      }
    }
  }
  // head
  while (true) {
    const tile = tiles[Math.floor(Math.random() * tiles.length)]
    if (tileMap[tile] >= 3) {
      continue
    } else {
      tileMap[tile] += 2
    }
    break
  }

  var hand: Array<string> = []
  for (const tile in tileMap) {
    if (Object.prototype.hasOwnProperty.call(tileMap, tile)) {
      const count = tileMap[tile]
      for (let i = 0; i < count; i++) {
        hand.push(tile)
      }
    }
  }
  hand.push(hand[Math.floor(Math.random() * hand.length)])
  shuffle(hand)
  const last = hand.pop()
  return `${hand.join('')}${Math.random() < 0.25 ? '' : '+'}${last}+${
    Math.floor(Math.random() * 2) + 1
  }${Math.floor(Math.random() * 4) + 1}`
}

const generateHand = () => {
  const p = Math.random()
  if (p < 0.0003) {
    return sortedHand(generateThirteenOrphans())
  } else if (p < 0.03) {
    return sortedHand(generateSevenPairs())
  } else {
    while (true) {
      const hand = generateNormalHand()
      const riichiCalc = new Riichi(hand).calc()
      if (riichiCalc.isAgari && Object.keys(riichiCalc.yaku).length > 0) {
        // console.log(riichiCalc)
        return sortedHand(hand)
      }
    }
  }
}

const sortedHand = (hand: string) => {
  var tiles = hand.slice(0, 26).match(/.{1,2}/g)
  tiles?.sort((a, b) => {
    if (tileCategoryOrder[a[1]] < tileCategoryOrder[b[1]]) {
      return -1
    } else if (tileCategoryOrder[a[1]] > tileCategoryOrder[b[1]]) {
      return 1
    } else {
      if (a[0] < b[0]) {
        return -1
      } else if (a[0] > b[0]) {
        return 1
      } else {
        return 0
      }
    }
  })
  return tiles?.join('') + hand.slice(26)
}

for (let i = 0; i < 10000; i++) {
  console.log(generateHand())
}

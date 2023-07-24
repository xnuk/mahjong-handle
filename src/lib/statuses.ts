import GraphemeSplitter from 'grapheme-splitter'
import { solution } from './words'

const graphemeSplitter = new GraphemeSplitter()

export type CharStatus = 'absent' | 'present' | 'correct'

export type CharValue =
  | '🀇'
  | '🀈'
  | '🀉'
  | '🀊'
  | '🀋'
  | '🀌'
  | '🀍'
  | '🀎'
  | '🀏'
  | '🀙'
  | '🀚'
  | '🀛'
  | '🀜'
  | '🀝'
  | '🀞'
  | '🀟'
  | '🀠'
  | '🀡'
  | '🀐'
  | '🀑'
  | '🀒'
  | '🀓'
  | '🀔'
  | '🀕'
  | '🀖'
  | '🀗'
  | '🀘'
  | '🀀'
  | '🀁'
  | '🀂'
  | '🀃'
  | '🀆'
  | '🀅'
  | '🀄'

export const getStatuses = (
  guesses: string[]
): { [key: string]: CharStatus } => {
  const charObj: { [key: string]: CharStatus } = {}

  guesses.forEach((word) => {
    graphemeSplitter.splitGraphemes(word).forEach((letter, i) => {
      const splitSolution = graphemeSplitter.splitGraphemes(solution)
      if (!splitSolution.includes(letter)) {
        // make status absent
        return (charObj[letter] = 'absent')
      }

      if (letter === splitSolution[i]) {
        //make status correct
        return (charObj[letter] = 'correct')
      }

      if (charObj[letter] !== 'correct') {
        //make status present
        return (charObj[letter] = 'present')
      }
    })
  })

  return charObj
}

export const getGuessStatuses = (guess: string): CharStatus[] => {
  const splitSolution = graphemeSplitter.splitGraphemes(solution)
  const splitGuess = graphemeSplitter.splitGraphemes(guess)

  const solutionCharsTaken = splitSolution.map((_) => false)

  const statuses: CharStatus[] = Array.from(Array(splitGuess.length))

  // handle all correct cases first
  splitGuess.forEach((letter, i) => {
    if (letter === splitSolution[i]) {
      statuses[i] = 'correct'
      solutionCharsTaken[i] = true
      return
    }
  })

  splitGuess.forEach((letter, i) => {
    if (statuses[i]) return

    if (!splitSolution.includes(letter)) {
      // handles the absent case
      statuses[i] = 'absent'
      return
    }

    // now we are left with "present"s
    const indexOfPresentChar = splitSolution.findIndex(
      (x, index) => x === letter && !solutionCharsTaken[index]
    )

    if (indexOfPresentChar > -1) {
      statuses[i] = 'present'
      solutionCharsTaken[indexOfPresentChar] = true
      return
    } else {
      statuses[i] = 'absent'
      return
    }
  })

  return statuses
}

export const getHardModeError = (
  history: string[],
  currentGuess: string
): [CharStatus, string, number] | null => {
  const countBoundary = {} as {
    [key in CharValue]: { min: number; max: number }
  }
  const corrects = [] as (CharValue | undefined)[]
  const wrongPositions = [] as (CharValue[] | undefined)[]

  for (const guess of history) {
    const splitGuess = graphemeSplitter.splitGraphemes(guess) as CharValue[]
    const statuses = getGuessStatuses(guess)

    const stats = {} as {
      [key in CharValue]: { appears: number; isMaximum: boolean }
    }

    statuses.forEach((status, i) => {
      const letter = splitGuess[i]
      stats[letter] ||= { appears: 0, isMaximum: false }

      if (status === 'absent') {
        // Too many letters are appeared
        stats[letter].isMaximum = true
        return
      }

      // Answer has this letter anyway
      stats[letter].appears += 1

      if (status === 'correct') {
        corrects[i] = letter
        return
      }

      // status === 'present'
      const wrongPos = (wrongPositions[i] ||= [])
      wrongPos.push(letter)
    })

    // Update countBoundary
    for (const [letter, { appears, isMaximum }] of Object.entries(stats)) {
      const count = (countBoundary[letter as CharValue] ||= { min: 0, max: 4 })
      count.min = Math.max(count.min, appears)
      if (isMaximum) {
        count.max = Math.min(count.max, appears)
      }
    }
  }

  const appears = {} as { [key in CharValue]: number }

  // to also check countBoundary later
  Object.keys(countBoundary).forEach((letter) => {
    appears[letter as CharValue] = 0
  })

  const splitGuess = graphemeSplitter.splitGraphemes(
    currentGuess
  ) as CharValue[]

  for (let i = 0; i < splitGuess.length; ++i) {
    const letter = splitGuess[i]
    appears[letter] ||= 0
    appears[letter] += 1

    const boundary = countBoundary[letter] || { min: 0, max: 4 }
    if (appears[letter] > boundary.max) {
      // If letter is too much
      return ['absent', letter, i]
    }

    const correct = corrects[i]
    if (correct != null && correct !== letter) {
      // If letter does not appear in correct position
      return ['correct', correct, i]
    }

    const wrongPos = wrongPositions[i]
    if (wrongPos != null && wrongPos.includes(letter)) {
      // If letter is known not to be here
      return ['present', letter, i]
    }
  }

  // minimum check
  for (const [letter, count] of Object.entries(appears)) {
    const boundary = countBoundary[letter as CharValue] || { min: 0, max: 4 }
    if (count < boundary.min) {
      // If letter is insufficient
      return ['absent', letter, -1]
    }
  }

  return null
}

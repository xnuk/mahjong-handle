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

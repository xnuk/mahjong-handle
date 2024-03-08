import GraphemeSplitter from 'grapheme-splitter'
import { getGuessStatuses } from './statuses'
import { solutionIndex } from './words'
import { GAME_TITLE } from '../constants/strings'
import { GUESS_MAX } from '../constants/settings'

const graphemeSplitter = new GraphemeSplitter()

export const shareStatus = (
  guesses: string[],
  lost: boolean,
  hardMode: boolean
) => {
  navigator.clipboard.writeText(
    `${GAME_TITLE}${hardMode ? '*' : ''} ${solutionIndex} ${
      lost ? 'X' : guesses.length
    }/${GUESS_MAX}\n${window.location.href}\n\n` + generateEmojiGrid(guesses)
  )
}

export const generateEmojiGrid = (guesses: string[]) => {
  return guesses
    .map((guess) => {
      const status = getGuessStatuses(guess)
      return graphemeSplitter
        .splitGraphemes(guess)
        .map((letter, i) => {
          switch (status[i]) {
            case 'correct':
              return '🟩'
            case 'present':
              return '🟨'
            default:
              return '⬜'
          }
        })
        .join('')
    })
    .join('\n')
}

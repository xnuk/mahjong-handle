export const GAME_TITLE = 'Mahjong Handle'
export const GAME_URL = 'https://mahjong-handle.update.sh/'

export const WIN_MESSAGES = ['Great Job!', 'Awesome', 'Well done!']
export const GAME_COPIED_MESSAGE = 'Game copied to clipboard'
export const ABOUT_GAME_MESSAGE = 'About this game'
export const NOT_ENOUGH_LETTERS_MESSAGE = 'Not enough tiles'
export const KEYBOARD_SHORTCUT_REMINDER_MESSAGE = ' (type m, p, s, or z)'
export const WORD_NOT_FOUND_MESSAGE = 'Hand must include at least one yaku'
export const INVALID_HAND_MESSAGE = 'Invalid hand'
export const CORRECT_WORD_MESSAGE = (solution: string) =>
  `The hand was ${solution}`
export const ENTER_TEXT = 'Enter'
export const DELETE_TEXT = 'Delete'
export const STATISTICS_TITLE = 'Statistics'
export const GUESS_DISTRIBUTION_TEXT = 'Guess Distribution'
export const NEW_WORD_TEXT = 'New hand in'
export const SHARE_TEXT = 'Share'
export const TOTAL_TRIES_TEXT = 'Total tries'
export const SUCCESS_RATE_TEXT = 'Success rate'
export const CURRENT_STREAK_TEXT = 'Current streak'
export const BEST_STREAK_TEXT = 'Best streak'

export const CANNOT_ENTER_HARD_MODE_MESSAGE =
  'Hard mode can be enabled only at start!'
export const ENTER_HARD_MODE_MESSAGE = 'Hard mode turned on.'
export const HARD_MODE_POSITON_SHOULD_BE = (letter: string, position: number) =>
  `Hard mode: ${letter} should be at position ${position}.`
export const HARD_MODE_POSITON_SHOULD_NOT_BE = (
  letter: string,
  position: number
) => `Hard mode: ${letter} should not be at position ${position}.`
export const HARD_MODE_WRONG_COUNT = (letter: string) =>
  `Hard mode: Count of ${letter} is wrong.`

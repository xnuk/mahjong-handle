import {
  InformationCircleIcon,
  ChartBarIcon,
  SunIcon,
  FireIcon,
} from '@heroicons/react/outline'
import { FireIcon as FireIconSolid } from '@heroicons/react/solid'
import { useState, useEffect } from 'react'
import GraphemeSplitter from 'grapheme-splitter'
import { Alert } from './components/alerts/Alert'
import { Grid } from './components/grid/Grid'
import { Keyboard } from './components/keyboard/Keyboard'
import { AboutModal } from './components/modals/AboutModal'
import { InfoModal } from './components/modals/InfoModal'
import { StatsModal } from './components/modals/StatsModal'
import {
  GAME_TITLE,
  WIN_MESSAGES,
  GAME_COPIED_MESSAGE,
  ABOUT_GAME_MESSAGE,
  NOT_ENOUGH_LETTERS_MESSAGE,
  WORD_NOT_FOUND_MESSAGE,
  INVALID_HAND_MESSAGE,
  CORRECT_WORD_MESSAGE,
  KEYBOARD_SHORTCUT_REMINDER_MESSAGE,
  HARD_MODE_POSITON_SHOULD_BE,
  HARD_MODE_POSITON_SHOULD_NOT_BE,
  HARD_MODE_WRONG_COUNT,
  ENTER_HARD_MODE_MESSAGE,
  CANNOT_ENTER_HARD_MODE_MESSAGE,
} from './constants/strings'
import {
  isWordInWordList,
  isInvalidHand,
  isWinningWord,
  solution,
  isTsumo,
  wind,
} from './lib/words'
import { addStatsForCompletedGame, loadStats } from './lib/stats'
import {
  loadGameStateFromLocalStorage,
  saveGameStateToLocalStorage,
} from './lib/localStorage'
import { HAND_SIZE, GUESS_MAX } from './constants/settings'

import './App.css'
import { getHardModeError } from './lib/statuses'

const ALERT_TIME_MS = 2000
const graphemeSplitter = new GraphemeSplitter()

const windMap: { [id: number]: string } = {
  1: '東',
  2: '南',
  3: '西',
  4: '北',
}

const useDelayedOpen = (delay: number): readonly [boolean, () => void] => {
  const [isOpen, setIsOpen] = useState(false)
  const [timeout, storeTimeout] = useState(0)

  const open = () => {
    clearTimeout(timeout)
    setIsOpen(true)
    storeTimeout(setTimeout(() => setIsOpen(false), delay) as unknown as number)
  }

  return [isOpen, open]
}

function App() {
  const prefersDarkMode = window.matchMedia(
    '(prefers-color-scheme: dark)'
  ).matches

  const [currentGuess, setCurrentGuess] = useState('')
  const [isGameWon, setIsGameWon] = useState(false)
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false)
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false)
  const [isNotEnoughLetters, setIsNotEnoughLetters] = useState(false)
  const [isStatsModalOpen, setIsStatsModalOpen] = useState(false)
  const [isWordNotFoundAlertOpen, setIsWordNotFoundAlertOpen] = useState(false)
  const [isInvalidHandAlertOpen, setIsInvalidHandAlertOpen] = useState(false)
  const [isGameLost, setIsGameLost] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem('theme')
      ? localStorage.getItem('theme') === 'dark'
      : prefersDarkMode
      ? true
      : false
  )
  const [isHardMode, setIsHardMode] = useState(
    localStorage.getItem('mode') === 'hard' ? true : false
  )
  const [hardModeAlertMessage, setHardModeAlertMessage] = useState('')
  const [isHardModeAlertOpen, openHardModeAlert] = useDelayedOpen(ALERT_TIME_MS)
  const [successAlert, setSuccessAlert] = useState('')
  const [guesses, setGuesses] = useState<string[]>(() => {
    const loaded = loadGameStateFromLocalStorage()
    if (loaded?.solution !== solution) {
      return []
    }
    const gameWasWon = loaded.guesses.includes(solution)
    if (gameWasWon) {
      setIsGameWon(true)
    }
    if (loaded.guesses.length === GUESS_MAX && !gameWasWon) {
      setIsGameLost(true)
    }
    return loaded.guesses
  })

  const [stats, setStats] = useState(() => loadStats())

  useEffect(() => {
    const classList = document.documentElement.classList

    if (isDarkMode) {
      classList.remove('light')
      classList.add('dark')
    } else {
      classList.remove('dark')
      classList.add('light')
    }
  }, [isDarkMode])

  const handleDarkMode = (isDark: boolean) => {
    setIsDarkMode(isDark)
    localStorage.setItem('theme', isDark ? 'dark' : 'light')
  }

  useEffect(() => {
    saveGameStateToLocalStorage({ guesses, solution })
  }, [guesses])

  useEffect(() => {
    if (isGameWon) {
      setSuccessAlert(
        WIN_MESSAGES[Math.floor(Math.random() * WIN_MESSAGES.length)]
      )
      setTimeout(() => {
        setSuccessAlert('')
        setIsStatsModalOpen(true)
      }, ALERT_TIME_MS)
    }
    if (isGameLost) {
      setTimeout(() => {
        setIsStatsModalOpen(true)
      }, ALERT_TIME_MS)
    }
  }, [isGameWon, isGameLost])

  const onChar = (value: string) => {
    if (value === 'm' || value === 'p' || value === 's' || value === 'z') {
      let lookupTable = {
        m: ['🀇', '🀈', '🀉', '🀊', '🀋', '🀌', '🀍', '🀎', '🀏'],
        p: ['🀙', '🀚', '🀛', '🀜', '🀝', '🀞', '🀟', '🀠', '🀡'],
        s: ['🀐', '🀑', '🀒', '🀓', '🀔', '🀕', '🀖', '🀗', '🀘'],
        z: ['🀀', '🀁', '🀂', '🀃', '🀆', '🀅', '🀄', '', ''],
      }
      setCurrentGuess(
        currentGuess.replace(
          /[1-9]/g,
          (match) => lookupTable[value][parseInt(match) - 1]
        )
      )
    } else if (guesses.length < GUESS_MAX && !isGameWon) {
      let trimmedGuess = currentGuess.replaceAll(/[1-9]/g, '')

      if (
        '1' <= value &&
        value <= '9' &&
        graphemeSplitter.splitGraphemes(currentGuess).length < HAND_SIZE
      ) {
        setCurrentGuess(`${currentGuess}${value}`)
      } else if (
        value > '9' &&
        graphemeSplitter.splitGraphemes(trimmedGuess).length < HAND_SIZE
      ) {
        setCurrentGuess(`${trimmedGuess}${value}`)
      }
    }
  }

  const onDelete = () => {
    setCurrentGuess(
      graphemeSplitter.splitGraphemes(currentGuess).slice(0, -1).join('')
    )
  }

  const onEnter = () => {
    if (isGameWon || isGameLost) {
      return
    }
    if (
      !(
        graphemeSplitter.splitGraphemes(currentGuess.replace(/[1-9]/g, ''))
          .length === HAND_SIZE
      )
    ) {
      setIsNotEnoughLetters(true)
      return setTimeout(() => {
        setIsNotEnoughLetters(false)
      }, ALERT_TIME_MS)
    }

    if (!isInvalidHand(currentGuess)) {
      setIsInvalidHandAlertOpen(true)
      return setTimeout(() => {
        setIsInvalidHandAlertOpen(false)
      }, ALERT_TIME_MS)
    }

    if (!isWordInWordList(currentGuess)) {
      setIsWordNotFoundAlertOpen(true)
      return setTimeout(() => {
        setIsWordNotFoundAlertOpen(false)
      }, ALERT_TIME_MS)
    }

    if (isHardMode) {
      const hardModeError = getHardModeError(guesses, currentGuess)
      if (hardModeError != null) {
        const [status, letter, index] = hardModeError

        let message = {
          absent: HARD_MODE_WRONG_COUNT(letter),
          correct: HARD_MODE_POSITON_SHOULD_BE(letter, index + 1),
          present: HARD_MODE_POSITON_SHOULD_NOT_BE(letter, index + 1),
        }[status]

        setHardModeAlertMessage(message)
        openHardModeAlert()
        return
      }
    }

    const winningWord = isWinningWord(currentGuess)

    if (
      graphemeSplitter.splitGraphemes(currentGuess).length === HAND_SIZE &&
      guesses.length < GUESS_MAX &&
      !isGameWon
    ) {
      setGuesses([...guesses, currentGuess])
      setCurrentGuess('')

      if (winningWord) {
        setStats(addStatsForCompletedGame(stats, guesses.length))
        return setIsGameWon(true)
      }

      if (guesses.length === GUESS_MAX - 1) {
        setStats(addStatsForCompletedGame(stats, guesses.length + 1))
        setIsGameLost(true)
      }
    }
  }

  const toggleHardMode = () => {
    if (isHardMode) {
      localStorage.setItem('mode', 'normal')
      return setIsHardMode(false)
    }

    if (guesses.length > 1) {
      localStorage.setItem('mode', 'normal')
      setIsHardMode(false)
      setHardModeAlertMessage(CANNOT_ENTER_HARD_MODE_MESSAGE)
    } else {
      localStorage.setItem('mode', 'hard')
      setIsHardMode(true)
      setHardModeAlertMessage(ENTER_HARD_MODE_MESSAGE)
    }
    openHardModeAlert()
  }

  return (
    <div className="py-8 max-w-7xl mx-auto sm:px-6 lg:px-8">
      <div className="flex w-80 mx-auto items-center mb-8 mt-12">
        <h1 className="text-xl grow font-bold dark:text-white">
          {GAME_TITLE}
          {isHardMode ? '*' : ''}
        </h1>
        <button
          type="button"
          className="h-6 w-6 cursor-pointer"
          title={isHardMode ? 'Turn off hard mode' : 'Turn on hard mode'}
          onClick={toggleHardMode}
        >
          {isHardMode ? (
            <FireIconSolid className="dark:fill-white" />
          ) : (
            <FireIcon className="dark:stroke-white" />
          )}
        </button>
        <SunIcon
          className="h-6 w-6 cursor-pointer dark:stroke-white"
          onClick={() => handleDarkMode(!isDarkMode)}
        />
        <InformationCircleIcon
          className="h-6 w-6 cursor-pointer dark:stroke-white"
          onClick={() => setIsInfoModalOpen(true)}
        />
        <ChartBarIcon
          className="h-6 w-6 cursor-pointer dark:stroke-white"
          onClick={() => setIsStatsModalOpen(true)}
        />
      </div>
      <div className="flex w-full mx-auto items-center mb-8 mt-12">
        <h2 className="text-lg w-full text-center font-bold dark:text-white">
          Round wind: {windMap[Math.floor(wind / 10)]} / Seat wind:{' '}
          {windMap[wind % 10]} / {isTsumo ? 'Tsumo' : 'Ron'}
        </h2>
      </div>
      <Grid guesses={guesses} currentGuess={currentGuess} />
      <Keyboard
        onChar={onChar}
        onDelete={onDelete}
        onEnter={onEnter}
        guesses={guesses}
      />
      <InfoModal
        isOpen={isInfoModalOpen}
        handleClose={() => setIsInfoModalOpen(false)}
      />
      <StatsModal
        isOpen={isStatsModalOpen}
        handleClose={() => setIsStatsModalOpen(false)}
        guesses={guesses}
        gameStats={stats}
        isGameLost={isGameLost}
        isGameWon={isGameWon}
        isHardMode={isHardMode}
        handleShare={() => {
          setSuccessAlert(GAME_COPIED_MESSAGE)
          return setTimeout(() => setSuccessAlert(''), ALERT_TIME_MS)
        }}
      />
      <AboutModal
        isOpen={isAboutModalOpen}
        handleClose={() => setIsAboutModalOpen(false)}
      />

      <button
        type="button"
        className="mx-auto mt-8 flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 select-none"
        onClick={() => setIsAboutModalOpen(true)}
      >
        {ABOUT_GAME_MESSAGE}
      </button>

      <Alert
        message={`${
          NOT_ENOUGH_LETTERS_MESSAGE +
          (currentGuess.match(/[1-9]/g)
            ? KEYBOARD_SHORTCUT_REMINDER_MESSAGE
            : '')
        }`}
        isOpen={isNotEnoughLetters}
      />
      <Alert
        message={WORD_NOT_FOUND_MESSAGE}
        isOpen={isWordNotFoundAlertOpen}
      />
      <Alert message={INVALID_HAND_MESSAGE} isOpen={isInvalidHandAlertOpen} />
      <Alert message={CORRECT_WORD_MESSAGE(solution)} isOpen={isGameLost} />
      <Alert message={hardModeAlertMessage} isOpen={isHardModeAlertOpen} />
      <Alert
        message={successAlert}
        isOpen={successAlert !== ''}
        variant="success"
      />
    </div>
  )
}

export default App

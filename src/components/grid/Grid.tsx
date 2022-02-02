import { CompletedRow } from './CompletedRow'
import { CurrentRow } from './CurrentRow'
import { EmptyRow } from './EmptyRow'
import { GUESS_MAX } from '../../constants/settings'

type Props = {
  guesses: string[]
  currentGuess: string
}

export const Grid = ({ guesses, currentGuess }: Props) => {
  const empties =
    guesses.length < GUESS_MAX - 1
      ? Array.from(Array(GUESS_MAX - 1 - guesses.length))
      : []

  return (
    <div className="pb-6">
      {guesses.map((guess, i) => (
        <CompletedRow key={i} guess={guess} />
      ))}
      {guesses.length < GUESS_MAX && <CurrentRow guess={currentGuess} />}
      {empties.map((_, i) => (
        <EmptyRow key={i} />
      ))}
    </div>
  )
}

import GraphemeSplitter from 'grapheme-splitter'
import { Cell } from './Cell'
import { HAND_SIZE } from '../../constants/settings'

const graphemeSplitter = new GraphemeSplitter()

type Props = {
  guess: string
}

export const CurrentRow = ({ guess }: Props) => {
  const splitGuess = graphemeSplitter.splitGraphemes(guess)
  const emptyCells = Array.from(Array(HAND_SIZE - splitGuess.length))

  return (
    <div className="flex justify-center mb-1">
      {splitGuess.map((letter, i) => (
        <Cell key={i} value={letter} />
      ))}
      {emptyCells.map((_, i) => (
        <Cell key={i} />
      ))}
    </div>
  )
}

import GraphemeSplitter from 'grapheme-splitter'
import { getGuessStatuses } from '../../lib/statuses'
import { Cell } from './Cell'

const graphemeSplitter = new GraphemeSplitter()

type Props = {
  guess: string
}

export const CompletedRow = ({ guess }: Props) => {
  const statuses = getGuessStatuses(guess)

  return (
    <div className="flex justify-center mb-1">
      {graphemeSplitter.splitGraphemes(guess).map((letter, i) => (
        <Cell key={i} value={letter} status={statuses[i]} />
      ))}
    </div>
  )
}

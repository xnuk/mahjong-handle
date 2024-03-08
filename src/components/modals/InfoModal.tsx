import { Cell } from '../grid/Cell'
import { BaseModal } from './BaseModal'

type Props = {
  isOpen: boolean
  handleClose: () => void
}

export const InfoModal = ({ isOpen, handleClose }: Props) => {
  return (
    <BaseModal title="How to play" isOpen={isOpen} handleClose={handleClose}>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        Guess the riichi mahjong hand in 6 tries.
        <br />
        After each guess, the color of the tiles will change to show how close
        your guess was to the hand.
      </p>

      <p className="text-sm text-green-700 dark:text-green-500">
        The hand should have one or more yaku and all tiles are sorted in order
        of numbers and categories(m, p, s, z).
        <br />
        Please note that the last tile is a winning tile, so it is not sorted.
      </p>

      <div className="flex justify-center mb-1 mt-4">
        <Cell value="🀇" />
        <Cell value="🀈" />
        <Cell value="🀉" />
        <Cell value="🀜" />
        <Cell value="🀝" />
        <Cell value="🀞" />
        <Cell value="🀔" />
        <Cell value="🀖" />
        <Cell value="🀗" status="correct" />
        <Cell value="🀘" />
        <Cell value="🀅" />
        <Cell value="🀅" />
        <Cell value="🀅" />
        <Cell value="🀔" />
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        The tile 8s is in the hand and in the correct spot.
      </p>

      <div className="flex justify-center mb-1 mt-4">
        <Cell value="🀇" />
        <Cell value="🀈" />
        <Cell value="🀉" />
        <Cell value="🀜" />
        <Cell value="🀝" status="present" />
        <Cell value="🀞" />
        <Cell value="🀔" />
        <Cell value="🀖" />
        <Cell value="🀗" />
        <Cell value="🀘" />
        <Cell value="🀅" />
        <Cell value="🀅" />
        <Cell value="🀅" />
        <Cell value="🀔" />
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        The tile 5p is in the hand but in the wrong spot.
      </p>

      <div className="flex justify-center mb-1 mt-4">
        <Cell value="🀇" />
        <Cell value="🀈" />
        <Cell value="🀉" />
        <Cell value="🀜" />
        <Cell value="🀝" />
        <Cell value="🀞" />
        <Cell value="🀔" />
        <Cell value="🀖" />
        <Cell value="🀗" />
        <Cell value="🀘" />
        <Cell value="🀅" status="absent" />
        <Cell value="🀅" status="absent" />
        <Cell value="🀅" status="absent" />
        <Cell value="🀔" />
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        The tile 6z is not in the hand in any spot.
      </p>

      <p className="text-sm text-gray-500 dark:text-gray-300">
        You can also use keyboard shortcuts to enter tiles. For example, you can
        enter the tiles above by typing{' '}
        <span className="font-mono">123m456p5789s666z5s</span> on your keyboard.
      </p>
    </BaseModal>
  )
}

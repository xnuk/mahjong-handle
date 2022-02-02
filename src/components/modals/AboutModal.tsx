import { BaseModal } from './BaseModal'

type Props = {
  isOpen: boolean
  handleClose: () => void
}

export const AboutModal = ({ isOpen, handleClose }: Props) => {
  return (
    <BaseModal title="About" isOpen={isOpen} handleClose={handleClose}>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        This is an open source mahjong hand guessing game, inspired by{' '}
        <a
          href="https://www.powerlanguage.co.uk/wordle/"
          className="underline font-bold"
        >
          Wordle
        </a>{' '}
        -{' '}
        <a
          href="https://github.com/yf-dev/mahjong-hand-guessing-game"
          className="underline font-bold"
        >
          check out the code here
        </a>
      </p>
    </BaseModal>
  )
}

import { KeyValue } from '../../lib/keyboard'
import { getStatuses } from '../../lib/statuses'
import { Key } from './Key'
import { useEffect } from 'react'
import { ENTER_TEXT, DELETE_TEXT } from '../../constants/strings'

type Props = {
  onChar: (value: string) => void
  onDelete: () => void
  onEnter: () => void
  guesses: string[]
}

export const Keyboard = ({ onChar, onDelete, onEnter, guesses }: Props) => {
  const charStatuses = getStatuses(guesses)

  const onClick = (value: KeyValue) => {
    if (value === 'ENTER') {
      onEnter()
    } else if (value === 'DELETE') {
      onDelete()
    } else {
      onChar(value)
    }
  }

  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      if (e.code === 'Enter') {
        onEnter()
      } else if (e.code === 'Backspace') {
        onDelete()
      }
    }
    window.addEventListener('keyup', listener)
    return () => {
      window.removeEventListener('keyup', listener)
    }
  }, [onEnter, onDelete, onChar])

  return (
    <div>
      <div className="flex justify-center mb-1 sm:text-3xl text-2xl">
        <Key value="🀇" onClick={onClick} status={charStatuses['🀇']} />
        <Key value="🀈" onClick={onClick} status={charStatuses['🀈']} />
        <Key value="🀉" onClick={onClick} status={charStatuses['🀉']} />
        <Key value="🀊" onClick={onClick} status={charStatuses['🀊']} />
        <Key value="🀋" onClick={onClick} status={charStatuses['🀋']} />
        <Key value="🀌" onClick={onClick} status={charStatuses['🀌']} />
        <Key value="🀍" onClick={onClick} status={charStatuses['🀍']} />
        <Key value="🀎" onClick={onClick} status={charStatuses['🀎']} />
        <Key value="🀏" onClick={onClick} status={charStatuses['🀏']} />
      </div>
      <div className="flex justify-center mb-1 sm:text-3xl text-2xl">
        <Key value="🀙" onClick={onClick} status={charStatuses['🀙']} />
        <Key value="🀚" onClick={onClick} status={charStatuses['🀚']} />
        <Key value="🀛" onClick={onClick} status={charStatuses['🀛']} />
        <Key value="🀜" onClick={onClick} status={charStatuses['🀜']} />
        <Key value="🀝" onClick={onClick} status={charStatuses['🀝']} />
        <Key value="🀞" onClick={onClick} status={charStatuses['🀞']} />
        <Key value="🀟" onClick={onClick} status={charStatuses['🀟']} />
        <Key value="🀠" onClick={onClick} status={charStatuses['🀠']} />
        <Key value="🀡" onClick={onClick} status={charStatuses['🀡']} />
      </div>
      <div className="flex justify-center mb-1 sm:text-3xl text-2xl">
        <Key value="🀐" onClick={onClick} status={charStatuses['🀐']} />
        <Key value="🀑" onClick={onClick} status={charStatuses['🀑']} />
        <Key value="🀒" onClick={onClick} status={charStatuses['🀒']} />
        <Key value="🀓" onClick={onClick} status={charStatuses['🀓']} />
        <Key value="🀔" onClick={onClick} status={charStatuses['🀔']} />
        <Key value="🀕" onClick={onClick} status={charStatuses['🀕']} />
        <Key value="🀖" onClick={onClick} status={charStatuses['🀖']} />
        <Key value="🀗" onClick={onClick} status={charStatuses['🀗']} />
        <Key value="🀘" onClick={onClick} status={charStatuses['🀘']} />
      </div>
      <div className="flex justify-center sm:text-3xl text-2xl">
        <div className="text-xs">
          <Key width={50} value="ENTER" onClick={onClick}>
            {ENTER_TEXT}
          </Key>
        </div>
        <Key value="🀀" onClick={onClick} status={charStatuses['🀀']} />
        <Key value="🀁" onClick={onClick} status={charStatuses['🀁']} />
        <Key value="🀂" onClick={onClick} status={charStatuses['🀂']} />
        <Key value="🀃" onClick={onClick} status={charStatuses['🀃']} />
        <Key value="🀆" onClick={onClick} status={charStatuses['🀆']} />
        <Key value="🀅" onClick={onClick} status={charStatuses['🀅']} />
        <Key value="🀄" onClick={onClick} status={charStatuses['🀄']} />
        <div className="text-xs">
          <Key width={50} value="DELETE" onClick={onClick}>
            {DELETE_TEXT}
          </Key>
        </div>
      </div>
    </div>
  )
}

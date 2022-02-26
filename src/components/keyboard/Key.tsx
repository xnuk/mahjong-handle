import { ReactNode } from 'react'
import classnames from 'classnames'
import { KeyValue } from '../../lib/keyboard'
import { CharStatus } from '../../lib/statuses'
import { RenderTile } from '../render/Render'

type Props = {
  children?: ReactNode
  value: KeyValue
  width?: number
  status?: CharStatus
  onClick: (value: KeyValue) => void
}

export const Key = ({
  children,
  status,
  width = 40,
  value,
  onClick,
}: Props) => {
  const classes = classnames(
    'flex items-center justify-center rounded mx-0.5 cursor-pointer select-none dark:text-white',
    {
      ['light:bg-slate-200 light:hover:bg-slate-300 light:active:bg-slate-400' +
      '  dark:bg-slate-600  dark:hover:bg-slate-700  dark:active:bg-slate-800']:
        !status,
      'bg-slate-400 text-white': status === 'absent',
      'bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white':
        status === 'correct',
      ['light:bg-orange-500 light:hover:bg-orange-600 light:active:bg-orange-700' +
      '  dark:bg-orange-700  dark:hover:bg-orange-800  dark:active:bg-orange-900 text-white']:
        status === 'present',
    }
  )

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    onClick(value)
    event.currentTarget.blur()
  }

  return (
    <button
      style={{ width: `${width}px`, height: '58px' }}
      className={classes}
      onClick={handleClick}
    >
      {children || <RenderTile tile={value} />}
    </button>
  )
}

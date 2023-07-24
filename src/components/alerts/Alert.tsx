import { Fragment } from 'react'
import { Transition } from '@headlessui/react'
import classNames from 'classnames'
import { RenderTile } from '../render/Render'

type Props = {
  isOpen: boolean
  message: string
  variant?: 'success' | 'warning'
}

export const Alert = ({ isOpen, message, variant = 'warning' }: Props) => {
  const classes = classNames(
    'fixed top-5 left-1/2 transform -translate-x-1/2 max-w-sm w-full shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden whitespace-pre-line',
    {
      'bg-rose-200': variant === 'warning',
      'bg-blue-200 z-20': variant === 'success',
    }
  )

  return (
    <Transition
      show={isOpen}
      as={Fragment}
      enter="ease-out duration-300 transition"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition ease-in duration-100"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div className={classes}>
        <div className="p-4">
          <p className="text-sm text-center font-medium text-gray-900">
            {message.split(/([\u{1F000}-\u{1F030}])/u).map((v, i) =>
              i % 2 === 0 ? (
                v
              ) : (
                <span
                  key={i}
                  className="inline-block w-6 align-middle rounded bg-white dark:bg-slate-900"
                >
                  <RenderTile tile={v} />
                </span>
              )
            )}
          </p>
        </div>
      </div>
    </Transition>
  )
}

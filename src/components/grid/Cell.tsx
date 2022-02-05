import { CharStatus } from '../../lib/statuses'
import classnames from 'classnames'

type Props = {
  value?: string
  status?: CharStatus
}

export const Cell = ({ value, status }: Props) => {
  const classes = classnames(
    'last:md:ml-2 last:ml-1 md:w-12 sm:w-9 w-6 md:h-16 sm:h-12 h-8 border-solid md:border-2 border flex items-center justify-center sm:mx-0.5 md:text-4xl sm:text-2xl text-xl rounded dark:text-white',
    {
      'bg-white dark:bg-slate-900 last:border-lime-300 border-slate-200 last:dark:border-lime-600 dark:border-slate-600':
        !status,
      'border-black dark:border-slate-100': value && !status,
      'bg-slate-400 dark:bg-slate-700 text-white border-slate-400 dark:border-slate-700':
        status === 'absent',
      'bg-blue-500 text-white border-blue-500': status === 'correct',
      'bg-orange-500 dark:bg-orange-700 text-white border-orange-500 dark:border-orange-700':
        status === 'present',
      'cell-animation': !!value,
    }
  )

  return <div className={classes}>{value}</div>
}

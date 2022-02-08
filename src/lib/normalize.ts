import { KeyValue } from './keyboard'

export const normalize = (value: KeyValue | string | undefined) =>
  value === '🀄' ? `${value}\uFE0E` : value

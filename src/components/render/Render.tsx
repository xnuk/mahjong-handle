import { KeyValue } from '../../lib/keyboard'

type Props = {
  tile: KeyValue | string | undefined,
}

export const RenderTile = ({ tile }: Props) => {
  if (tile === undefined) return null
  return (
    <>
      <img
        className="p-1 light:block dark:hidden drop-shadow-tile-light"
        src={`/tiles/light/${tileToSVGMap[tile]}`}
        alt={tileToNameMap[tile]}
      />
      <img
        className="p-1 light:hidden dark:block drop-shadow-tile-dark"
        src={`/tiles/dark/${tileToSVGMap[tile]}`}
        alt={tileToNameMap[tile]}
      />
    </>
  )
}

const tileToSVGMap: { [id: string]: string } = {
  '🀇': 'Man1.svg',
  '🀈': 'Man2.svg',
  '🀉': 'Man3.svg',
  '🀊': 'Man4.svg',
  '🀋': 'Man5.svg',
  '🀌': 'Man6.svg',
  '🀍': 'Man7.svg',
  '🀎': 'Man8.svg',
  '🀏': 'Man9.svg',
  '🀙': 'Pin1.svg',
  '🀚': 'Pin2.svg',
  '🀛': 'Pin3.svg',
  '🀜': 'Pin4.svg',
  '🀝': 'Pin5.svg',
  '🀞': 'Pin6.svg',
  '🀟': 'Pin7.svg',
  '🀠': 'Pin8.svg',
  '🀡': 'Pin9.svg',
  '🀐': 'Sou1.svg',
  '🀑': 'Sou2.svg',
  '🀒': 'Sou3.svg',
  '🀓': 'Sou4.svg',
  '🀔': 'Sou5.svg',
  '🀕': 'Sou6.svg',
  '🀖': 'Sou7.svg',
  '🀗': 'Sou8.svg',
  '🀘': 'Sou9.svg',
  '🀀': 'Ton.svg',
  '🀁': 'Nan.svg',
  '🀂': 'Shaa.svg',
  '🀃': 'Pei.svg',
  '🀆': 'Haku.svg',
  '🀅': 'Hatsu.svg',
  '🀄': 'Chun.svg',
}

const tileToNameMap: { [id: string]: string } = {
  '🀇': 'Man 1',
  '🀈': 'Man 2',
  '🀉': 'Man 3',
  '🀊': 'Man 4',
  '🀋': 'Man 5',
  '🀌': 'Man 6',
  '🀍': 'Man 7',
  '🀎': 'Man 8',
  '🀏': 'Man 9',
  '🀙': 'Pin 1',
  '🀚': 'Pin 2',
  '🀛': 'Pin 3',
  '🀜': 'Pin 4',
  '🀝': 'Pin 5',
  '🀞': 'Pin 6',
  '🀟': 'Pin 7',
  '🀠': 'Pin 8',
  '🀡': 'Pin 9',
  '🀐': 'Sou 1',
  '🀑': 'Sou 2',
  '🀒': 'Sou 3',
  '🀓': 'Sou 4',
  '🀔': 'Sou 5',
  '🀕': 'Sou 6',
  '🀖': 'Sou 7',
  '🀗': 'Sou 8',
  '🀘': 'Sou 9',
  '🀀': 'Ton (East)',
  '🀁': 'Nan (South)',
  '🀂': 'Shaa (West)',
  '🀃': 'Pei (North)',
  '🀆': 'Haku (White)',
  '🀅': 'Hatsu (Green)',
  '🀄': 'Chun (Red)',
}
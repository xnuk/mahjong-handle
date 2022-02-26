import bz2
import sqlite3
from random import shuffle
import xml.etree.ElementTree as ET
from tenhou_log_utils.parser import parse_mjlog

# download db: python main.py --year 2020 --action id && python main.py --year 2020 --action content --thread 4

TILES = [
    '1m',
    '2m',
    '3m',
    '4m',
    '5m',
    '6m',
    '7m',
    '8m',
    '9m',
    '1p',
    '2p',
    '3p',
    '4p',
    '5p',
    '6p',
    '7p',
    '8p',
    '9p',
    '1s',
    '2s',
    '3s',
    '4s',
    '5s',
    '6s',
    '7s',
    '8s',
    '9s',
    '1z',
    '2z',
    '3z',
    '4z',
    '5z',
    '6z',
    '7z',
]

IGNORE_YAKUS = {
    0, # Tsumo
    1, # Riichi
    2, # Ippatsu
    3, # Chankan
    4, # Rinshan-kaihou
    5, # Hai-tei-rao-yue
    6, # Hou-tei-rao-yui
    21, # Double riichi
    27, # San-kan-tsu
    36, # Ren-hou
    37, # Ten-hou
    38, # Chi-hou
    51, # Su-kantsu
    52, # Dora
    53, # Ura-dora
    54, # Aka-dora
}

def convert_hand(raw_hand):
    return ''.join(TILES[x//4] for x in raw_hand)

def extract_hands():
    extracted_count = 0
    extracted_hands = []
    conn = sqlite3.connect('./db/2020.db')
    with conn:
        cur = conn.cursor()
        games = cur.execute(r'SELECT log_content FROM logs')
        for gamedata in games:
            xml = ET.fromstring(bz2.decompress(gamedata[0]).decode('utf-8'))
            if parse_mjlog(xml, tags=['GO'])[0]['data']['config']['sanma']:
                continue
            items = parse_mjlog(xml, tags=['INIT', 'AGARI'])
            round = 0
            oya = 0
            for item in items:
                if item['tag'] == 'INIT':
                    round = item['data']['round'] // 4 
                    oya = int(item['data']['oya'])
                elif item['tag'] == 'AGARI':
                    raw_hand = item['data']['hand']
                    if len(raw_hand) != 14:
                        continue
                    yakus = [x[0] for x in item['data']['yaku']] + item['data']['yakuman']
                    valid_yakus = [x for x in yakus if x not in IGNORE_YAKUS]
                    if valid_yakus:
                        hand = convert_hand(sorted(raw_hand)) 
                        machi = convert_hand(item['data']['machi'])
                        hand = hand.replace(machi, '', 1)
                        is_tsumo = 'loser' not in item['data']
                        winner = item['data']['winner']
                        hand_string = f'{hand}{"" if is_tsumo else "+"}{machi}+{round + 1}{((4 + winner - oya) % 4) + 1}'
                        extracted_hands.append(hand_string)
                        extracted_count += 1
                        print(f'{extracted_count:5d}: {hand_string}')
                        if extracted_count >= 10000:
                            return extracted_hands

def main():
    extracted_hands = extract_hands()
    shuffle(extracted_hands)
    with open('./result/hands.ts', 'w') as f:
        f.write('export const HANDS = [\n')
        f.writelines([f"  '{x}',\n" for x in extracted_hands])
        f.write(']\n')

if __name__ == '__main__':
    main()


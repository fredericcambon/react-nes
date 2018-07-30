#!/usr/bin/env python3

import os
import sys
import argparse
import shutil
import json


from slugify import slugify


def parse_roms(files):
    roms = {}

    for f in filter(lambda x: x.endswith('.nes'), files):
        clean_name = f.split('(')[0].replace('.nes', '')
        simpl_name =  slugify(clean_name)
        roms[simpl_name] = {
            'clean_name': clean_name,
            'file_name': f
        }

    return roms

def parse_covers(files):
    covers = {}

    for f in filter(lambda x: x.endswith('.jpg'), files):
        covers[slugify(f.replace('.jpg', ''))] = f

    return covers

def main(args):
    data = []
    roms = parse_roms(os.listdir(args.roms))
    covers = parse_covers(os.listdir(args.covers))
    i = 1

    if not os.path.exists(args.output):
        os.mkdir(args.output)

    for key in roms.keys():
        if key in covers.keys():
            rom = roms[key]
            cover = covers[key]

            data.append({
                'label': rom['clean_name'],
                'slug': key,
                'value': i
            })

            shutil.copyfile(os.path.join(args.roms, rom['file_name']), os.path.join(args.output, '{}.nes'.format(key)))
            shutil.copyfile(os.path.join(args.covers, cover), os.path.join(args.output, '{}.jpg'.format(key)))
            i += 1
        else:
            print('No cover found for {}: {}'.format(key, roms[key]))

    with open(os.path.join(args.output, 'roms.js'), 'w') as fd:
        fd.write('export default {}'.format(json.dumps(data)))


if __name__ == '__main__':
    parser = argparse.ArgumentParser(
        description="Parses ROM & covers folder, renames files and return json"
    )

    parser.add_argument(
        "-r",
        "--roms",
        help="ROMs folder path"
    )
    parser.add_argument(
        "-c",
        "--covers",
        help="Covers folder path"
    )
    parser.add_argument(
        "-o",
        "--output",
        help="Output folder path"
    )

    args = parser.parse_args()

    main(args)

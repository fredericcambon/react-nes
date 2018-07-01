# react-nes

React UI for https://github.com/fredericcambon/nes

![Example 1](https://i.imgur.com/xUfQ0dTl.png)
![Example 2](https://i.imgur.com/zm9bjGNl.png)

## Installing

```shell
npm install
```

## Quick Start

If you want to run the project locally you'll need to put your ROMs into the `./data` folder and add a `./src/utils/constants.js` file containing the info of these files to load.

No ROMs are provided to this project for obvious legal reasons.

```
export var ROMS = [ {
    value: 1,
    label: 'A game',
    slug: 'game-slug',
    cover: 'http://cover.png',
    filepath: 'rom-name.nes'
}]
```

## TODO

This repo is still a WIP and its main purpose is to give me a UI to implement the [NES Emulator](https://github.com/fredericcambon/nes)

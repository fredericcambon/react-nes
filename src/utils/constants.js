import _ from "lodash";

export var TOP_ROMS = [1, 2, 3, 4, 5];

// Still more reliable than MongoDB
export var ROMS = [
  {
    value: 1,
    label: "Super Mario Bros",
    slug: "super-mario-bros",
    cover:
      "https://upload.wikimedia.org/wikipedia/en/0/03/Super_Mario_Bros._box.png",
    filepath: "super-mario-bros.nes"
  },
  {
    value: 2,
    label: "The Legend Of Zelda",
    slug: "the-legend-of-zelda",
    cover:
      "https://upload.wikimedia.org/wikipedia/en/4/41/Legend_of_zelda_cover_%28with_cartridge%29_gold.png",
    filepath: "zelda-eur.nes"
  },
  {
    value: 3,
    label: "Final Fantasy",
    slug: "final-fantasy",
    cover: "https://upload.wikimedia.org/wikipedia/en/d/d8/FF1_USA_boxart.jpg",
    filepath: "final-fantasy.nes"
  },
  {
    value: 4,
    label: "Mega Man",
    slug: "mega-man",
    cover: "https://upload.wikimedia.org/wikipedia/en/a/a7/Megaman_nes_pal.jpg",
    filepath: "mega-man.nes"
  },
  {
    value: 5,
    label: "Castlevania",
    slug: "castlevania",
    cover:
      "https://upload.wikimedia.org/wikipedia/en/2/24/Castlevania_NES_box_art.jpg",
    filepath: "castlevania.nes"
  },
  {
    value: 6,
    label: "Ice Climber",
    slug: "ice-climber",
    cover:
      "https://upload.wikimedia.org/wikipedia/en/d/df/IceClimberboxartnes.jpg",
    filepath: "ice-climber.nes"
  },
  {
    value: 7,
    label: "Bomberman",
    slug: "bomberman",
    cover: "https://upload.wikimedia.org/wikipedia/en/7/72/BombermanCover.jpg",
    filepath: "bomberman.nes"
  },
  {
    value: 8,
    label: "Zelda 2",
    slug: "zelda-2",
    cover: "",
    filepath: "zelda-2.nes"
  },
  {
    value: 9,
    label: "Duck Tales",
    slug: "duck-tales",
    cover: "",
    filepath: "duck-tales.nes"
  },
  {
    value: 10,
    label: "Metroid",
    slug: "metroid",
    cover: "",
    filepath: "metroid.nes"
  },
  {
    value: 10,
    label: "Ninja Gaiden",
    slug: "ninja-gaiden",
    cover: "",
    filepath: "ninja-gaiden.nes"
  },
  {
    value: 11,
    label: "Contra",
    slug: "contra",
    cover: "",
    filepath: "contra.nes"
  },
  {
    value: 12,
    label: "Mega Man 2",
    slug: "mega-man-2",
    cover: "",
    filepath: "mega-man-2.nes"
  }
];

export var CHEATS = {
  "super-mario-bros": [
    {
      title: "Moar lives",
      addr: 0x075a,
      value: 0x08
    },
    {
      title: "Invicinbility",
      addr: 0x079f,
      value: 0x10
    },
    {
      title: "Shrooms",
      addr: 0x0754,
      value: 0x00
    },
    {
      title: "FIRE!",
      addr: 0x0756,
      value: 0x02
    }
  ]
};

export var INFOS = {
  "super-mario-bros": [
    {
      title: "Remaining Lives",
      value: c => {
        return c.cpu.memory.read8(0x075a) + 1;
      }
    },
    {
      title: "Coins",
      value: 0x075e
    },
    {
      title: "Time",
      value: c => {
        return _.map([0x07f8, 0x07f9, 0x07fa], a => {
          return c.cpu.memory.read8(a);
        });
      }
    },
    {
      title: "Visible monsters",
      value: c => {
        return _.map([0x0016, 0x0017, 0x0018, 0x0019, 0x001a], a => {
          return c.cpu.memory.read8(a);
        });
      }
    }
  ]
};

export var DEBUG_ROMS = [
  {
    value: "1",
    label: "Basics",
    filepath: "debug/ppu/sprite_0_hit/01.basics.nes"
  },
  {
    value: "2",
    label: "0 Hit Alignment",
    filepath: "debug/ppu/sprite_0_hit/02.alignment.nes"
  },
  {
    value: "3",
    label: "0 Hit Corners",
    filepath: "debug/ppu/sprite_0_hit/03.corners.nes"
  },
  {
    value: "4",
    label: "0 Hit Flip",
    filepath: "debug/ppu/sprite_0_hit/04.flip.nes"
  },
  {
    value: "5",
    label: "0 Hit Left Clip",
    filepath: "debug/ppu/sprite_0_hit/05.left_clip.nes"
  },
  {
    value: "6",
    label: "0 Hit Right Edge",
    filepath: "debug/ppu/sprite_0_hit/06.right_edge.nes"
  },
  {
    value: "7",
    label: "0 Hit Screen Bottom",
    filepath: "debug/ppu/sprite_0_hit/07.screen_bottom.nes"
  },
  {
    value: "8",
    label: "0 Hit Double Height",
    filepath: "debug/ppu/sprite_0_hit/08.double_height.nes"
  },
  {
    value: "9",
    label: "0 Hit Timing Basics",
    filepath: "debug/ppu/sprite_0_hit/09.timing_basics.nes"
  },
  {
    value: "10",
    label: "0 Hit Timing Order",
    filepath: "debug/ppu/sprite_0_hit/10.timing_order.nes"
  },
  {
    value: "11",
    label: "0 Hit Edge Timing",
    filepath: "debug/ppu/sprite_0_hit/11.edge_timing.nes"
  },
  {
    value: "12",
    label: "NES Test",
    filepath: "debug/cpu/nestest.nes"
  },
  {
    value: "13",
    label: "SO Basics",
    filepath: "debug/ppu/sprite_overflow_tests/1.Basics.nes"
  },
  {
    value: "14",
    label: "SO Details",
    filepath: "debug/ppu/sprite_overflow_tests/2.Details.nes"
  },
  {
    value: "15",
    label: "SO Timing",
    filepath: "debug/ppu/sprite_overflow_tests/3.Timing.nes"
  },
  {
    value: "16",
    label: "SO Obscure",
    filepath: "debug/ppu/sprite_overflow_tests/4.Obscure.nes"
  },
  {
    value: "17",
    label: "SO Emulator",
    filepath: "debug/ppu/sprite_overflow_tests/5.Emulator.nes"
  },
  {
    value: "18",
    label: "PPU VBL NMI",
    filepath: "debug/ppu/ppu_vbl_nmi/ppu_vbl_nmi.nes"
  },
  {
    value: "19",
    label: "CPU Instructions Intensive Tests MMC1",
    filepath: "debug/cpu/instr_test-v5/official_only.nes"
  },
  {
    value: "20",
    label: "CPU Instructions Misc Tests",
    filepath: "debug/cpu/instr_misc/rom_singles/03-dummy_reads.nes"
  },
  {
    value: "21",
    label: "CPU Interrupts",
    filepath: "debug/cpu/cpu_interrupts_v2/cpu_interrupts.nes"
  },
  {
    value: "22",
    label: "CPU Instructions Timings",
    filepath: "debug/cpu/instr_timing/instr_timing.nes"
  },
  {
    value: "23",
    label: "NEStress",
    filepath: "debug/cpu/NEStress.nes"
  },
  {
    value: "24",
    label: "CPU Instructions Intensive Tests NROM",
    filepath: "debug/cpu/instr_test-v4/official_only.nes"
  },
  {
    value: "25",
    label: "Scroll Tests",
    filepath: "debug/ppu/scroll.nes"
  },
  {
    value: "26",
    label: "CPU Timing Tests",
    filepath: "debug/cpu/cpu_timing_test6/cpu_timing_test.nes"
  },
  {
    value: "27",
    label: "CPU Branch Timing Tests (1)",
    filepath: "debug/cpu/branch_timing_tests/1.Branch_Basics.nes"
  },
  {
    value: "28",
    label: "CPU Branch Timing Tests (2)",
    filepath: "debug/cpu/branch_timing_tests/2.Backward_Branch.nes"
  },
  {
    value: "29",
    label: "CPU Branch Timing Tests (3)",
    filepath: "debug/cpu/branch_timing_tests/3.Forward_Branch.nes"
  },
  {
    value: "30",
    label: "Test MMC1",
    filepath: "debug/ppu/mmc1_a12.nes"
  },
  {
    value: "31",
    label: "Blargg CPU Tests 5",
    filepath: "debug/cpu/blargg_nes_cpu_test5/official.nes"
  },
  {
    value: "32",
    label: "Blargg PPU Tests Palette Ram",
    filepath: "debug/ppu/blargg_ppu_tests/palette_ram.nes"
  },
  {
    value: "33",
    label: "Blargg PPU Tests Sprite Ram",
    filepath: "debug/ppu/blargg_ppu_tests/sprite_ram.nes"
  },
  {
    value: "34",
    label: "Blargg PPU Tests VBL Clear Time",
    filepath: "debug/ppu/blargg_ppu_tests/vbl_clear_time.nes"
  },
  {
    value: "35",
    label: "VBL Timings Basics",
    filepath: "debug/ppu/vbl_nmi_timing/1.frame_basics.nes"
  },
  {
    value: "36",
    label: "VBL Timings",
    filepath: "debug/ppu/vbl_nmi_timing/2.vbl_timing.nes"
  },
  {
    value: "37",
    label: "VBL Timings Odd Frames",
    filepath: "debug/ppu/vbl_nmi_timing/3.even_odd_frames.nes"
  },
  {
    value: "38",
    label: "VBL Timings Clear Timing",
    filepath: "debug/ppu/vbl_nmi_timing/4.vbl_clear_timing.nes"
  },
  {
    value: "39",
    label: "VBL Timings NMI Suppression",
    filepath: "debug/ppu/vbl_nmi_timing/5.nmi_suppression.nes"
  },
  {
    value: "40",
    label: "VBL Timings NMI Disable",
    filepath: "debug/ppu/vbl_nmi_timing/6.nmi_disable.nes"
  },
  {
    value: "41",
    label: "VBL Timings NMI Timing",
    filepath: "debug/ppu/vbl_nmi_timing/7.nmi_timing.nes"
  }
];

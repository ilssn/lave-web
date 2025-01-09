export type OptionProps = {
  id: number;
  label: string;
  value: string;
};

export const APP_THEME_OPTION: OptionProps[] = [
  { id: 1, label: "global:theme.light", value: "light" },
  { id: 2, label: "global:theme.dark", value: "dark" },
  { id: 3, label: "global:theme.system", value: "system" },
];

export const DEFAULT_RATIO_OPTION: OptionProps[] = [
  { id: 1, label: "1:1", value: "1:1" },
];

export const KLING_RATIO_OPTION: OptionProps[] = [
  { id: 1, label: "1:1", value: "1:1" },
  { id: 2, label: "16:9", value: "16:9" },
  { id: 3, label: "9:16", value: "9:16" },
];

export const MINIMAX_RATIO_OPTION: OptionProps[] = [
  { id: 1, label: "1:1", value: "1:1" },
  { id: 2, label: "16:9", value: "16:9" },
  { id: 3, label: "9:16", value: "9:16" },
];

export const PIKA_RATIO_OPTION: OptionProps[] = [
  { id: 1, label: "1:1", value: "1:1" },
  { id: 2, label: "16:9", value: "16:9" },
  { id: 3, label: "9:16", value: "9:16" },
];

export const RUNWAY_RATIO_OPTION: OptionProps[] = [
  { id: 1, label: "1280:768", value: "1280:768" },
  { id: 2, label: "768:1280", value: "768:1280" },
];

export const COG_RATIO_OPTION: OptionProps[] = [
  { id: 1, label: "3:2", value: "3:2" },
];

export const LIGHTRICKS_RATIO_OPTION: OptionProps[] = [
  { id: 1, label: "3:2", value: "3:2" },
];

export const VIDU_RATIO_OPTION: OptionProps[] = [
  { id: 1, label: "1:1", value: "1:1" },
  { id: 2, label: "16:9", value: "16:9" },
  { id: 3, label: "9:16", value: "9:16" },
];

// export const HAIPER_RATIO_OPTION: OptionProps[] = [
//   {
//     id: 1,
//     label: "自定义",
//     value: "0",
//   },
// ];

// export const LUMA_RATIO_OPTION: OptionProps[] = [
//   {
//     id: 1,
//     label: "自定义",
//     value: "0",
//   },
// ];

// export const PIXVERSE_RATIO_OPTION: OptionProps[] = [
//   {
//     id: 1,
//     label: "自定义",
//     value: "0",
//   },
// ];

export const CUSTOMER_RATIO_OPTION: OptionProps[] = [
  {
    id: 1,
    label: "自定义",
    value: "0",
  },
];

export const VIDEO_MODEL_OPTION: OptionProps[] = [
  { id: 1, label: "v-gen:form.model.option.luma", value: "luma" },
  { id: 2, label: "v-gen:form.model.option.kling", value: "kling" },
  { id: 3, label: "v-gen:form.model.option.runway", value: "runway" },
  { id: 4, label: "v-gen:form.model.option.cog", value: "cog" },
  { id: 5, label: "v-gen:form.model.option.minimax", value: "minimax" },
  // { id: 6, label: "v-gen:form.model.option.pika", value: "pika" },
  { id: 7, label: "v-gen:form.model.option.genmo", value: "genmo" },
  { id: 7, label: "v-gen:form.model.option.haiper", value: "haiper" },
  { id: 8, label: "v-gen:form.model.option.pixverse", value: "pixverse" },
  { id: 9, label: "v-gen:form.model.option.lightricks", value: "lightricks" },
  { id: 10, label: "v-gen:form.model.option.hunyuan", value: "hunyuan" },
  { id: 11, label: "v-gen:form.model.option.vidu", value: "vidu" },
];

export const VIDEO_TYPE_OPTION: OptionProps[] = [
  { id: 1, label: "v-gen:form.type.option.fast", value: "fast" },
  { id: 2, label: "v-gen:form.type.option.hq", value: "hq" },
];

export const VIDEO_TIME_OPTION: OptionProps[] = [
  { id: 1, label: "v-gen:form.time.option.short", value: "5s" },
  { id: 2, label: "v-gen:form.time.option.long", value: "10s" },
];

export const VIDEO_LOOP_OPTION: OptionProps[] = [
  { id: 1, label: "v-gen:form.loop.option.open", value: "true" },
  { id: 2, label: "v-gen:form.loop.option.close", value: "false" },
];

export const VIDEO_AUDIO_OPTION: OptionProps[] = [
  { id: 1, label: "v-gen:form.audio.option.open", value: "true" },
  { id: 2, label: "v-gen:form.audio.option.close", value: "false" },
];

export const VIDEO_CAMERA_OPTION: OptionProps[] = [
  { id: 1, label: "v-gen:form.camera.option.none", value: "none" },
  {
    id: 2,
    label: "v-gen:form.camera.option.move_left",
    value: "camera move left ",
  },
  {
    id: 3,
    label: "v-gen:form.camera.option.move_right",
    value: "camera move right ",
  },
  {
    id: 4,
    label: "v-gen:form.camera.option.move_up",
    value: "camera move up ",
  },
  {
    id: 5,
    label: "v-gen:form.camera.option.move_down",
    value: "camera move down ",
  },
  {
    id: 6,
    label: "v-gen:form.camera.option.push_in",
    value: "camera Push In ",
  },
  {
    id: 7,
    label: "v-gen:form.camera.option.push_out",
    value: "camera move out ",
  },
  {
    id: 8,
    label: "v-gen:form.camera.option.pan_left",
    value: "camera pan left ",
  },
  {
    id: 9,
    label: "v-gen:form.camera.option.pan_right",
    value: "camera pan right ",
  },
  {
    id: 10,
    label: "v-gen:form.camera.option.orbit_left",
    value: "camera orbit left ",
  },
  {
    id: 11,
    label: "v-gen:form.camera.option.orbit_right",
    value: "camera orbit right ",
  },
  {
    id: 12,
    label: "v-gen:form.camera.option.grane_up",
    value: "camera grane up ",
  },
  {
    id: 13,
    label: "v-gen:form.camera.option.grane_down",
    value: "camera grane down ",
  },
];

export const VIDEO_STYLE_OPTION: OptionProps[] = [
  { id: 1, label: "v-gen:form.style.option.none", value: "none" },
  { id: 2, label: "v-gen:form.style.option.inflate", value: "Inflate" },
  { id: 3, label: "v-gen:form.style.option.melt", value: "Melt" },
  { id: 4, label: "v-gen:form.style.option.explode", value: "Explode" },
  { id: 5, label: "v-gen:form.style.option.squish", value: "Squish" },
  { id: 6, label: "v-gen:form.style.option.crush", value: "Crush" },
  { id: 7, label: "v-gen:form.style.option.cake_ify", value: "Cake-ify" },
  { id: 8, label: "v-gen:form.style.option.ta_da", value: "Ta-da" },
  { id: 9, label: "v-gen:form.style.option.deflate", value: "Deflate" },
  { id: 10, label: "v-gen:form.style.option.crumble", value: "Crumble" },
  { id: 11, label: "v-gen:form.style.option.dissolve", value: "Dissolve" },
];

export const VIDEO_TEMPLATE_OPTION: OptionProps[] = [
  {
    id: 1,
    label: "v-gen:form.template.option.hairCurl",
    value: "310371322329472",
  },
  {
    id: 2,
    label: "v-gen:form.template.option.hairKing",
    value: "308552687706496",
  },
  {
    id: 3,
    label: "v-gen:form.template.option.hugYourLove",
    value: "303624424723200",
  },
  {
    id: 4,
    label: "v-gen:form.template.option.wonderWomanTransformation",
    value: "309283958194560",
  },
  {
    id: 5,
    label: "v-gen:form.template.option.catwomanTransformation",
    value: "307489548427968",
  },
  {
    id: 6,
    label: "v-gen:form.template.option.harleyQuinnTransformation",
    value: "307489434436288",
  },
  {
    id: 7,
    label: "v-gen:form.template.option.muscleMan",
    value: "308621408717184",
  },
  {
    id: 8,
    label: "v-gen:form.template.option.summonHulk",
    value: "304826314164992",
  },
  {
    id: 9,
    label: "v-gen:form.template.option.jokerRebirth",
    value: "304826126435072",
  },
  {
    id: 10,
    label: "v-gen:form.template.option.ironmanTransformation",
    value: "304826054394624",
  },
  {
    id: 11,
    label: "v-gen:form.template.option.batmanReturns",
    value: "304826374632192",
  },
  {
    id: 12,
    label: "v-gen:form.template.option.wickedShots",
    value: "303788802773760",
  },
  {
    id: 13,
    label: "v-gen:form.template.option.venomTransformation",
    value: "303624537709312",
  },
  {
    id: 14,
    label: "v-gen:form.template.option.venomColorBox",
    value: "304358279051648",
  },
  {
    id: 15,
    label: "v-gen:form.template.option.zombieMode",
    value: "302325299651648",
  },
  {
    id: 16,
    label: "v-gen:form.template.option.squishIt",
    value: "302325299692608",
  },
  {
    id: 17,
    label: "v-gen:form.template.option.zombieHand",
    value: "302325299672128",
  },
  {
    id: 18,
    label: "v-gen:form.template.option.wizardHat",
    value: "302325299661888",
  },
  {
    id: 19,
    label: "v-gen:form.template.option.leggyRun",
    value: "302325299711040",
  },
  {
    id: 20,
    label: "v-gen:form.template.option.monsterInvades",
    value: "302325299682368",
  },
  {
    id: 21,
    label: "v-gen:form.template.option.legoBlast",
    value: "302325299702848",
  },
];

// VIDU
export const VIDU_TYPE_OPTION: OptionProps[] = [
  { id: 1, label: "v-gen:form.vidu_type.option.general", value: "general" },
  { id: 2, label: "v-gen:form.vidu_type.option.character", value: "character" },
  { id: 3, label: "v-gen:form.vidu_type.option.scene", value: "scene" },
];

export const VIDU_STYLE_OPTION: OptionProps[] = [
  { id: 1, label: "v-gen:form.vidu_style.option.general", value: "general" },
  { id: 2, label: "v-gen:form.vidu_style.option.anime", value: "anime" },
];

export const VIDU_TIME_OPTION: OptionProps[] = [
  { id: 1, label: "v-gen:form.vidu_time.option.short", value: "4" },
  { id: 2, label: "v-gen:form.vidu_time.option.long", value: "8" },
];

export const VIDU_RESOLUTION_OPTION: OptionProps[] = [
  { id: 1, label: "v-gen:form.vidu_resolution.option.sd", value: "512" },
  { id: 2, label: "v-gen:form.vidu_resolution.option.hd", value: "720p" },
  { id: 3, label: "v-gen:form.vidu_resolution.option.fhd", value: "1080p" },
];

export const VIDU_SCENE_OPTION: OptionProps[] = [
  { id: 1, label: "v-gen:form.vidu_scene.option.hug", value: "hug" }, // 拥抱相关
  { id: 2, label: "v-gen:form.vidu_scene.option.kiss", value: "kiss" }, // 亲吻
  {
    id: 3,
    label: "v-gen:form.vidu_scene.option.christmas_effect",
    value: "christmas_effect",
  }, // 圣诞老人变身
  {
    id: 4,
    label: "v-gen:form.vidu_scene.option.santa_gifts",
    value: "christmas_gifts",
  }, // 圣诞老人来送礼
  {
    id: 5,
    label: "v-gen:form.vidu_scene.option.merry_christmas",
    value: "christmas_merry",
  }, // 圣诞节举杯祝贺
  {
    id: 6,
    label: "v-gen:form.vidu_scene.option.santa_hug",
    value: "christmas_hug",
  }, // 圣诞老人来拥抱
  {
    id: 8,
    label: "v-gen:form.vidu_scene.option.inflate",
    value: "morphlab_inflate",
  }, // 膨胀
  {
    id: 9,
    label: "v-gen:form.vidu_scene.option.twist",
    value: "morphlab_twist",
  }, // 扭曲
  {
    id: 10,
    label: "v-gen:form.vidu_scene.option.explode",
    value: "morphlab_explode",
  }, // 爆炸
  {
    id: 10,
    label: "v-gen:form.vidu_scene.option.melt",
    value: "morphlab_melt",
  }, // 融化
];

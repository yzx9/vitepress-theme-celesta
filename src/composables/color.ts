import { computed, unref, type MaybeRef } from "vue"

// Material design colors
export const colors = {
  Red: "244 67 54",
  Pink: "233 30 99",
  Purple: "156 39 176",
  DeepPurple: "103 58 183",
  Indigo: "63 81 181",
  Blue: "33 150 243",
  LightBlue: "3 169 244",
  Cyan: "0 188 212",
  Teal: "0 150 136",
  Green: "76 175 80",
  LightGreen: "139 195 74",
  Lime: "205 220 57",
  Yellow: "255 235 59",
  Amber: "255 193 7",
  Orange: "255 152 0",
  DeepOrange: "255 87 34",
  Brown: "121 85 72",
  Grey: "158 158 158",
  BlueGrey: "96 125 139",
  White: "255 255 255",
  Black: "0 0 0",
}

type Colors = (keyof typeof colors)[]
const colorKeys = Object.keys(colors) as Colors
const colorValues = Object.values(colors)

function subColors(ignoredColors: Colors) {
  return colorValues.filter((_, i) => !ignoredColors.includes(colorKeys[i]))
}

function newGetColorByRandom(ignoredColors: Colors) {
  const sub = subColors(ignoredColors)

  return function () {
    const index = Math.floor(Math.random() * sub.length)
    return sub[index]
  }
}

function newGetColorByHash(ignoredColors: Colors) {
  const array = subColors(ignoredColors)

  return function (id: string) {
    const sum = id
      .split("")
      .map((a) => a.charCodeAt(0))
      .reduce((a, b) => a + b, 0)
    return array[sum % array.length]
  }
}

const uncolorfulColors: Colors = ["White", "Black", "Grey"]
const visiualUnfriendlyColors: Colors = [...uncolorfulColors, "LightGreen"]

function newGetColorfulColor(ignoredColors: Colors) {
  const getColorByRandom = newGetColorByRandom(ignoredColors)
  const getColorByHash = newGetColorByHash(ignoredColors)

  return function (id?: string) {
    return id ? getColorByHash(id) : getColorByRandom()
  }
}

export const getColorfulColor = newGetColorfulColor(uncolorfulColors)
export const getVisiableColor = newGetColorfulColor(visiualUnfriendlyColors)

function newUseColor(ignoredColors: Colors) {
  const getColorByHash = newGetColorByHash(ignoredColors)

  return function (id: MaybeRef<string>) {
    return computed(() => getColorByHash(unref(id)))
  }
}

export const useColorfulColorByHash = newUseColor(uncolorfulColors)

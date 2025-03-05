import { ColorTranslator, HSLObject, RGBObject } from 'colortranslator'
import { checkValidColor } from './checkValidColor'


function isHSLObject(obj: any): obj is HSLObject {
  return obj && typeof obj.H === 'number' && typeof obj.S === 'number' && typeof obj.L === 'number'
}

// Type guard for RGBObject
function isRGBObject(obj: any): obj is RGBObject {
  return obj && typeof obj.R === 'number' && typeof obj.G === 'number' && typeof obj.B === 'number'
}

export function translateColor(
  color: string | HSLObject | RGBObject,
  translateTo: 'HEX' | 'HSLstring' | 'RGBstring',
  decimals?: number,
): string 


export function translateColor(
  color: string | RGBObject | HSLObject,
  translateTo: 'RGB',
  decimals?: number,
): { R: number; G: number; B: number } 


export function translateColor(
  color: string | HSLObject | RGBObject,
  translateTo: 'HSL',
  decimals?: number,
): { H: number; S: number; L: number } 

// Implement the function
export function translateColor(
  color: string | HSLObject | RGBObject,
  translateTo: 'HEX' | 'RGB' | 'HSL' | 'RGBstring' | 'HSLstring',
  decimals?: number,
): string | { R: number; G: number; B: number } | { H: number; S: number; L: number } {
  let __color: string

  if (typeof color === 'string') {
    __color = color
  } else if (isHSLObject(color)) {
    __color = `hsl(${color.H}, ${color.S}%, ${color.L}%)`
  } else if (isRGBObject(color)) {
    __color = `rgb(${color.R}, ${color.G}, ${color.B})`
  } else {
    __color = color
  }

  const isValid = checkValidColor(__color)

  switch (translateTo) {
    case 'HEX':
      return isValid ? ColorTranslator.toHEX(color) : '#000000'
    case 'RGB':
      return isValid
        ? new ColorTranslator(color, { decimals: decimals ?? 4 }).RGBObject
        : { R: 0, G: 0, B: 0 }
    case 'HSL':
      return isValid
        ? new ColorTranslator(color, { decimals: decimals ?? 4 }).HSLObject
        : { H: 0, S: 0, L: 0 }
    case 'HSLstring':
      return isValid
        ? new ColorTranslator(color, { decimals: decimals ?? 4 }).HSL
        : 'hsl(0, 0%, 0%)'
    case 'RGBstring':
      return isValid ? new ColorTranslator(color, { decimals: decimals ?? 4 }).RGB : 'rgb(0, 0, 0)'
  }
}

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React, { useEffect } from 'react'
import { HexColorPicker } from 'react-colorful'
import { translateColor } from '../../utils/translateColor'
import { Button } from '@payloadcms/ui'
import { HslColor, RgbColor } from 'react-colorful'
import { transformKeys } from '../../utils/transformKeys'
import { InputWithIcon } from '@/components/ui/input-icon'

interface Props {
  onFontColorChange: (color: string) => void
  fontColor: string
  onApplyStyles: () => void
}

export const ColorPickerView = ({ fontColor, onFontColorChange, onApplyStyles }: Props) => {
  const [color, setColor] = React.useState<string | undefined>(undefined)
  const defaultColor = '#000000'
  type InputsColorsKeys = 'hex' | 'rgb' | 'hsl'

  type InputsColors = {
    hex: { value: string }
    rgb: { r: number; g: number; b: number }
    hsl: { h: number; s: number; l: number }
  }

  const [inputs, setInputs] = React.useState<InputsColors>({
    hex: { value: defaultColor },
    rgb: { r: 0, g: 0, b: 0 },
    hsl: { h: 0, s: 0, l: 0 },
  })

  const setColorPickerColor = (color: string) => {
    setColor(color)
    onFontColorChange(color)
  }

  const updateInputs = (value: string, name: InputsColorsKeys) => {
    const values = getColorsValues(value, name)
    setInputs(values)
    setColor(values.hex.value)
  }

  const cleanInput = (string: string) => {
    if (typeof string === 'string' && string.includes('#')) {
      return string.split('#')[1]
    }
    return string
  }

  const handleFontColorChange = (color: string) => {
    const HSL = translateColor(color, 'HSL')
    const RGB = translateColor(color, 'RGB')

    setInputs((prev) => ({
      hex: { value: color },
      hsl: { h: HSL.H, s: HSL.S, l: HSL.L },
      rgb: { r: RGB.R, g: RGB.G, b: RGB.B },
    }))
    setColorPickerColor(color)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value
    const name = e.target.name.split('.')[0] as InputsColorsKeys
    const subName = e.target.name.split('.')[1]

    const getValues = getColorsValues(value, name)

    setColorPickerColor(getValues.hex.value)

    // Sets only the value of the input that changed
    setInputs((prev) => ({
      ...prev,
      [name]: {
        ...prev[name as InputsColorsKeys],
        [subName as keyof (typeof prev)[typeof name]]: name === 'hex' ? value : parseInt(value),
      },
    }))
  }

  const getColorsValues = (value: string, name: InputsColorsKeys): InputsColors => {
    // const subName = e.target.name.split('.')[1]
    let HEX: string
    let HSL: HslColor
    let RGB: RgbColor

    if (name === 'hex') {
      HEX = value.includes('#') ? value : `#${value}`
      HSL = transformKeys(translateColor(HEX, 'HSL'), 'toLowerCase')
      RGB = transformKeys(translateColor(HEX, 'RGB'), 'toLowerCase')
    } else if (name === 'hsl') {
      HEX = translateColor(transformKeys(inputs.hsl, 'toUpperCase'), 'HEX')
      RGB = transformKeys(
        translateColor(transformKeys(inputs.hsl, 'toUpperCase'), 'RGB'),
        'toLowerCase',
      )
      HSL = inputs.hsl
    } else if (name === 'rgb') {
      HEX = translateColor(transformKeys(inputs.rgb, 'toUpperCase'), 'HEX')
      HSL = transformKeys(
        translateColor(transformKeys(inputs.rgb, 'toUpperCase'), 'HSL'),
        'toLowerCase',
      )
      RGB = inputs.rgb
    } else {
      HEX = defaultColor
      HSL = { h: 0, s: 0, l: 0 }
      RGB = { b: 0, g: 0, r: 0 }
    }
    return { hex: { value: HEX }, hsl: HSL, rgb: RGB }
  }

  const handleInputBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateInputs(e.target.value, e.target.name.split('.')[0] as InputsColorsKeys)
  }

  useEffect(() => {
    if (fontColor && !fontColor?.includes('--')) {
      updateInputs(fontColor, 'hex')
    } else {
      updateInputs(defaultColor, 'hex')
    }
  }, [])

  return (
    <div className="flex flex-col">
      <div className="flex gap-4">
        <div className="flex flex-col gap-3">
          <HexColorPicker
            id="colorpicker"
            color={color}
            onChange={(color) => {
              handleFontColorChange(color)
            }}
          />
          <div className="flex gap-2 items-center w-full ">
            <div className="flex-grow w-full"></div>
            <Label htmlFor="hex-color-picker-input">HEX</Label>
            <InputWithIcon
              value={cleanInput(inputs.hex.value)}
              name="hex.value"
              id="hex-color-picker-input"
              beforeIcon={<span className="text-lg">#</span>}
              type="text"
              maxLength={7}
              className="tracking-[0.2rem] text-base w-[120px]"
              onChange={handleInputChange}
              onBlur={(e) => {
                handleInputBlur(e)
                cleanInput(e.target.value)
              }}
            />
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <div className="flex gap-2 items-center w-full">
              <Label htmlFor="hex-color-picker-input" className="w-3">
                H
              </Label>
              <Input
                value={inputs.hsl.h}
                id="hex-color-picker-input"
                name="hsl.h"
                type="number"
                min={0}
                max={360}
                maxLength={7}
                className="tracking-[0.2rem] text-base w-24"
                onChange={handleInputChange}
                onBlur={handleInputBlur}
              />
            </div>
            <div className="flex gap-2 items-center w-full">
              <Label htmlFor="hex-color-picker-input" className="w-3">
                S
              </Label>
              <Input
                id="hex-color-picker-input"
                value={inputs.hsl.s}
                name="hsl.s"
                type="number"
                max={100}
                min={0}
                maxLength={7}
                className="tracking-[0.2rem] text-base w-24"
                onChange={handleInputChange}
                onBlur={handleInputBlur}
              />
            </div>
            <div className="flex gap-2 items-center w-full">
              <Label htmlFor="hex-color-picker-input" className="w-3">
                L
              </Label>
              <Input
                value={inputs.hsl.l}
                id="hex-color-picker-input"
                name="hsl.l"
                type="number"
                min={0}
                max={100}
                maxLength={7}
                className="tracking-[0.2rem] text-base w-24"
                onChange={handleInputChange}
                onBlur={handleInputBlur}
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex gap-2 items-center w-full">
              <Label htmlFor="hex-color-picker-input" className="w-3">
                R
              </Label>
              <Input
                value={inputs.rgb.r}
                id="hex-color-picker-input"
                name="rgb.r"
                type="number"
                min={0}
                max={360}
                maxLength={7}
                className="tracking-[0.2rem] text-base w-24"
                onChange={handleInputChange}
                onBlur={handleInputBlur}
              />
            </div>
            <div className="flex gap-2 items-center w-full">
              <Label htmlFor="hex-color-picker-input" className="w-3">
                G
              </Label>
              <Input
                id="hex-color-picker-input"
                value={inputs.rgb.g}
                name="rgb.g"
                type="number"
                max={100}
                min={0}
                maxLength={7}
                className="tracking-[0.2rem] text-base w-24"
                onChange={handleInputChange}
                onBlur={handleInputBlur}
              />
            </div>
            <div className="flex gap-2 items-center w-full">
              <Label htmlFor="hex-color-picker-input" className="w-3">
                B
              </Label>
              <Input
                value={inputs.rgb.b}
                id="hex-color-picker-input"
                name="rgb.b"
                type="number"
                min={0}
                max={100}
                maxLength={7}
                className="tracking-[0.2rem] text-base w-24"
                onChange={handleInputChange}
                onBlur={handleInputBlur}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex w-full justify-between">
        <div></div>
        <Button onClick={onApplyStyles} buttonStyle="primary" size="small" className="w-24">
          Apply
        </Button>
      </div>
    </div>
  )
}

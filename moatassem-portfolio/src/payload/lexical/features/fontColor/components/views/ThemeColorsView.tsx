import React, { useEffect, useRef, useState } from 'react'

import appTheme from '../../utils/colors'
import { ScrollArea } from '@/components/ui/scroll-area'
import { createSentenceFromCamelCase } from '../../utils/createSentenceFromCamelCase'
import { translateColor } from '../../utils/translateColor'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/seperator'
import { ColorSpectrum } from '../ColorPicker'

type Props = {
  onFontColorChange: (color: string, cssVariableColor: string) => void
  onColorSpectrumChange: (colorSpectrum: ColorSpectrum) => void
  colorSpectrum: ColorSpectrum
}

export const ThemeColorsView = ({
  onFontColorChange,
  onColorSpectrumChange,
  colorSpectrum,
}: Props) => {
  return (
    <div>
      <RadioGroupList value={colorSpectrum} onValueChange={onColorSpectrumChange} />
      <Separator className="my-2" />
      <ScrollArea className="h-[265px] overflow-auto">
        <div className="flex flex-col gap-2">
          {Object.entries(appTheme).map(([key, variable]) => {
            return (
              <ThemeColorButton
                colorSpectrum={colorSpectrum}
                variableName={key}
                key={key}
                onFontColorChange={onFontColorChange}
                variable={variable}
              />
            )
          })}
        </div>
      </ScrollArea>
    </div>
  )
}

type BtnProps = {
  variableName: string
  variable: string
  onFontColorChange: (color: string, cssVariableColor: string) => void
  colorSpectrum: ColorSpectrum
}

const ThemeColorButton = ({
  variableName,
  variable,
  onFontColorChange,
  colorSpectrum,
}: BtnProps) => {
  const colorRef = useRef(null)
  const [backgroundColor, setBackgroundColor] = React.useState<string | undefined>(undefined)

  const getTranslateSpectrum = (
    colorSpectrum: ColorSpectrum,
  ): 'HEX' | 'RGBstring' | 'HSLstring' => {
    switch (colorSpectrum) {
      case 'hex':
        return 'HEX'
      case 'hsl':
        return 'HSLstring'
      case 'rgb':
        return 'RGBstring'
      default:
        return 'HEX'
    }
  }

  useEffect(() => {
    if (colorRef.current) {
      const computedStyle = getComputedStyle(colorRef.current)
      setBackgroundColor(
        translateColor(computedStyle.backgroundColor, getTranslateSpectrum(colorSpectrum), 0),
      )
    }
  }, [colorSpectrum])

  return (
    <button
      key={variableName}
      onClick={() => {
        if (!backgroundColor) return
        onFontColorChange(translateColor(backgroundColor, 'HEX'), `hsl(var(${variable}))`)
      }}
      className="border-none outiline-none flex gap-2 items-center cursor-pointer p-1 rounded-md bg-[var(--theme-elevation-0)] hover:bg-[var(--theme-elevation-50)]"
    >
      <div className="flex items-center w-full gap-2">
        <div
          style={{ backgroundColor: `hsl(var(${variable}))` }}
          ref={colorRef}
          className={`h-9 w-9 rounded-full border-white border-[1px] border-solid`}
        ></div>
        <div className="leading-none">{createSentenceFromCamelCase(variableName, 15)}</div>
      </div>
      <div className="leading-none whitespace-nowrap bg-[var(--theme-elevation-150)] mr-2 p-2 rounded-sm">
        {backgroundColor}
      </div>
    </button>
  )
}

type RadioGroupListProps = {
  value: ColorSpectrum
  onValueChange: (value: ColorSpectrum) => void
}
const RadioGroupList = ({ onValueChange, value }: RadioGroupListProps) => {
  return (
    <RadioGroup
      onValueChange={onValueChange}
      value={value}
      className="flex p-2 rounded-md w-fit bg-[var(--theme-elevation-50)]"
    >
      <div className="flex items-center gap-1">
        <RadioGroupItem value="hex" id="hex" />
        <Label htmlFor="hex">HEX</Label>
      </div>
      <div className="flex items-center gap-1">
        <RadioGroupItem value="hsl" id="hsl" />
        <Label htmlFor="hsl">HSL</Label>
      </div>

      <div className="flex items-center gap-1">
        <RadioGroupItem value="rgb" id="rgb" />
        <Label htmlFor="rgb">RGB</Label>
      </div>
    </RadioGroup>
  )
}

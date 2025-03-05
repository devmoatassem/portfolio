'use client'

import '../../../../../app/(frontend)/globals.css'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs-list'
import { ThemeColorsView } from './views/ThemeColorsView'
import { ColorPickerView } from './views/ColorPickerView'
import { useState } from 'react'

type DropdownColorPickerProps = {
  fontColor?: string
  onFontColorChange: (color: string, cssVariableColor?: string) => void
  onApplyStyles: () => void
}

export type ColorSpectrum = 'hex' | 'hsl' | 'rgb'

const defaultColor = '#000000'

export const ColorPicker = ({
  fontColor = defaultColor,
  onFontColorChange,
  onApplyStyles,
}: DropdownColorPickerProps) => {
  const [colorSpectrum, setColorSpectrum] = useState<ColorSpectrum>('hex')

  return (
    <div className="flex">
      <Tabs defaultValue="theme" className="h-[350px] w-[310px]">
        <TabsList className="gap-1 mb-2">
          <TabsTrigger value="theme">Theme</TabsTrigger>
          <TabsTrigger value="color-picker">Color Picker</TabsTrigger>
        </TabsList>
        <TabsContent value="theme">
          <ThemeColorsView
            colorSpectrum={colorSpectrum}
            onColorSpectrumChange={setColorSpectrum}
            onFontColorChange={onFontColorChange}
          />
        </TabsContent>
        <TabsContent value="color-picker">
          <ColorPickerView
            onApplyStyles={onApplyStyles}
            fontColor={fontColor}
            onFontColorChange={onFontColorChange}
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}

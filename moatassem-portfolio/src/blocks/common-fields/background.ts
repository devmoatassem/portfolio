import { Field } from 'payload'

export const backgroundField: Field = {
  name: 'background',
  type: 'select',
  defaultValue: 'bg-background',
  required: true,
  label: 'Select Background',
  options: [
    {
      label: 'Background 1',
      value: 'bg-background',
    },
    {
      label: 'Background 2',
      value: 'bg-background2',
    },
    {
      label: 'Background 3',
      value: 'bg-background3',
    },
  ],
}

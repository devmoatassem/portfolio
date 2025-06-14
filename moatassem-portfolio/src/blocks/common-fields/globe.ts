import { Field } from 'payload'

export const GlobeField: Field = {
  name: 'globe',
  type: 'group',
  fields: [
    {
      type: 'number',
      name: 'coordinates',
      label: 'Longitude, Latitude',
      hasMany: true,
      minRows: 2,
      maxRows: 2,
      unique: true,
    },
    {
      type: 'number',
      name: 'markerSize',
      label: 'Marker Size',
    },
  ],
  admin: {
    condition: (_, { component }) => component === 'globe',
    hideGutter: true,
  },
}

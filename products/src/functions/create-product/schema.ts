export const schema = {
  type: "object",
  properties: {
    title: { type: 'string' },
    description: { type: 'string' },
    price: { type: 'number' },
  },
  required: ['title', 'description', 'price']
} as const

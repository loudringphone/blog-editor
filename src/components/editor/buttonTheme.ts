import { defineStyle, defineStyleConfig } from '@chakra-ui/react'

const primary = defineStyle({
  borderRadius: 10, // remove the border radius
  background: '#0b5d51',
  color: '#fff',
})
const secondary = defineStyle({
  borderRadius: 10, // remove the border radius
  background: '#fff',
  color: '#0b5d51',
  border: '1.5px solid #0b5d51',
})
const saved = defineStyle({
  borderRadius: 10, // remove the border radius
  background: 'green',
  color: '#fff',
  pointerEvents: 'none,',
  cursor: 'default',
})

export const buttonTheme = defineStyleConfig({
  variants: { primary, secondary, saved },
})
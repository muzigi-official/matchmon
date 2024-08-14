import type { Meta, StoryObj } from '@storybook/react'

import FormSelect from './FormSelect'

const meta = {
  title: 'Components/select/FormSelect',
  component: FormSelect,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    options: {
      control: 'object',
      description: 'SelectBox의 Option값들의 배열',
    },
    name: {
      control: 'text',
      description: 'SelectBox의 이름을 결정합니다.',
      defaultValue: '과일',
    },
  },
  args: {},
} satisfies Meta<typeof FormSelect>

export default meta
type TStory = StoryObj<typeof meta>

export const HasGroupSelect: TStory = {
  args: {
    options: [
      { text: '사과', value: '사과', group: '과일' },
      { text: '오렌지', value: '오렌지', group: '과일' },
      { text: '감자', value: '감자', group: '채소' },
      { text: '포도', value: '포도', group: '과일' },
      { text: '토마토', value: '토마토', group: '채소' },
      { text: '오이', value: '오이', group: '채소' },
      { text: '수박', value: '수박', group: '과일' },
    ],
    name: '과일',
    value: '사과',
    onChange: (value: string | number | undefined) => {
      console.log(value)
    },
    onBlur: () => {},
  },
}

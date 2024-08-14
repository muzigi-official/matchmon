import type { Meta, StoryObj } from '@storybook/react'

import Select from './BasicSelect'

const meta = {
  title: 'Components/select/Basic',
  component: Select,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    options: {
      control: 'object',
      description: 'SelectBox의 Option값들의 배열',
    },
    label: {
      control: 'text',
      description: 'SelectBox의 라벨을 결정합니다.',
      defaultValue: '축구선수',
    },
    searchable: {
      control: 'boolean',
      description: '셀렉트 박스에 검색을 허용할지 말지를 선택합니다.',
      defaultValue: 'false',
    },
  },
  args: {},
} satisfies Meta<typeof Select>

export default meta
type TStory = StoryObj<typeof meta>

export const DefaultSelect: TStory = {
  args: {
    options: [
      { text: '모드리치', value: '모드리치' },
      { text: '호드리구', value: '호드리구' },
      { text: '토니 크로스', value: '토니 크로스' },
      { text: '벨링엄', value: '벨링엄' },
    ],
    label: '축구선수',
    name: 'soccerPlayer',
    value: '호드리구',
    defaultValue: '호드리구',
    searchable: false,
    onSelect: () => {},
  },
}

export const SelectInSearch: TStory = {
  args: {
    options: [
      { text: '모드리치', value: '모드리치' },
      { text: '호드리구', value: '호드리구' },
      { text: '토니 크로스', value: '토니 크로스' },
      { text: '벨링엄', value: '벨링엄' },
    ],
    label: '축구선수',
    name: 'soccerPlayer',
    value: '모드리치',
    defaultValue: '모드리치',
    searchable: true,
    onSelect: () => {},
  },
}

import type { Meta, StoryObj } from "@storybook/react";

import Tree from "../components/Tree";

const mockData = [
  {
    id: "1",
    label: "Group 1",
    children: [
      {
        id: "1-1",
        label: "Group 1-1",
        children: [
          { id: "1-1-1", label: "Item 1-1-1" },
          { id: "1-1-2", label: "Item 1-1-2" },
        ],
      },
      { id: "1-2", label: "Item 1-2" },
    ],
  },
  {
    id: "2",
    label: "Group 2",
    children: [
      { id: "2-1", label: "Item 2-1" },
      { id: "2-2", label: "Item 2-2" },
    ],
  },
];

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Example/Tree",
  component: Tree,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
} satisfies Meta<typeof Tree>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args

export const TreeWithData: Story = {
  args: { data: mockData },
};

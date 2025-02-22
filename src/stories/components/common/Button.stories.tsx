import type { Meta, StoryObj } from "@storybook/react";

import Button from "@/components/common/Button/Button";
import Link from "next/link";

const meta = {
  component: Button,
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    variant: "fill",
    children: "Button",
    disabled: false,
  },
};

export const AllButtons: Story = {
  render: () => (
    <div>
      <h2>塗りボタン</h2>
      <div>
        <Button variant="fill">Fill</Button>
        <Button variant="fill" disabled={true}>
          Fill disabled
        </Button>
      </div>
      <h2>アウトラインボタン</h2>
      <div>
        <Button variant="outline">Outline</Button>
        <Button variant="outline" disabled={true}>
          Outline disabled
        </Button>
      </div>
      <h2>テキストボタン</h2>
      <div>
        <Button variant="text">Text</Button>
        <Button variant="text" disabled={true}>
          Text disabled
        </Button>
      </div>
    </div>
  ),
};

export const LinkButton: Story = {
  render: () => (
    <div>
      <h2>リンクボタン</h2>
      <div>
        <Button>
          <a>Link</a>
        </Button>
        <Button disabled={true}>
          <Link href="/">Link</Link>
        </Button>
      </div>
    </div>
  ),
};

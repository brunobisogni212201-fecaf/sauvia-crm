"use client";

import {
  Button,
  Input,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Badge,
  Avatar,
} from "../../components/primitives";
import { Container, Grid, Flex, Stack, Divider } from "../../components/layout";
import {
  Alert,
  Skeleton,
  CardSkeleton,
  Progress,
} from "../../components/feedback";
import { Search, Plus } from "lucide-react";
import React from "react";

function ColorPalette() {
  const colors = [
    { name: "Primary", value: "#006b2c", class: "bg-primary" },
    { name: "Primary Light", value: "#00a847", class: "bg-primary-light" },
    { name: "Primary Dark", value: "#004d1f", class: "bg-primary-dark" },
    { name: "Secondary", value: "#F97316", class: "bg-secondary" },
    { name: "Surface", value: "#e4fff9", class: "bg-surface" },
    {
      name: "Surface Container",
      value: "#c5fff5",
      class: "bg-surface-container",
    },
    { name: "On Surface", value: "#00201d", class: "bg-on-surface" },
    {
      name: "On Surface Variant",
      value: "#3f6b62",
      class: "bg-on-surface-variant",
    },
  ];

  return (
    <Grid cols={4} gap="md">
      {colors.map((color) => (
        <div key={color.name} className="space-y-2">
          <div className={`h-16 rounded-xl ${color.class}`} />
          <div>
            <p className="font-medium text-sm">{color.name}</p>
            <p className="text-xs text-on-surface-variant">{color.value}</p>
          </div>
        </div>
      ))}
    </Grid>
  );
}

function TypographyDemo() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-[40px] font-display font-bold">Heading 1 - 40px</h1>
        <p className="text-sm text-on-surface-variant mt-1">Manrope Bold</p>
      </div>
      <div>
        <h2 className="text-[32px] font-display font-semibold">
          Heading 2 - 32px
        </h2>
        <p className="text-sm text-on-surface-variant mt-1">Manrope Semibold</p>
      </div>
      <div>
        <h3 className="text-[24px] font-display font-semibold">
          Heading 3 - 24px
        </h3>
        <p className="text-sm text-on-surface-variant mt-1">Manrope Semibold</p>
      </div>
      <div>
        <p className="text-[16px]">Body text - 16px - Plus Jakarta Sans</p>
        <p className="text-sm text-on-surface-variant mt-1">Regular</p>
      </div>
      <div>
        <p className="text-[14px]">Small text - 14px - Plus Jakarta Sans</p>
        <p className="text-sm text-on-surface-variant mt-1">Regular</p>
      </div>
    </div>
  );
}

function ButtonShowcase() {
  const variants: Array<"primary" | "secondary" | "ghost" | "danger"> = [
    "primary",
    "secondary",
    "ghost",
    "danger",
  ];
  const sizes: Array<"sm" | "md" | "lg"> = ["sm", "md", "lg"];

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <h4 className="font-medium text-on-surface-variant">Variants</h4>
        <Flex gap="md" wrap>
          {variants.map((v) => (
            <Button key={v} variant={v}>
              {v}
            </Button>
          ))}
        </Flex>
      </div>

      <div className="space-y-3">
        <h4 className="font-medium text-on-surface-variant">Sizes</h4>
        <Flex gap="md" align="center">
          {sizes.map((s) => (
            <Button key={s} size={s} variant="primary">
              {s}
            </Button>
          ))}
        </Flex>
      </div>

      <div className="space-y-3">
        <h4 className="font-medium text-on-surface-variant">States</h4>
        <Flex gap="md" wrap>
          <Button>Default</Button>
          <Button loading>Loading</Button>
          <Button disabled>Disabled</Button>
        </Flex>
      </div>

      <div className="space-y-3">
        <h4 className="font-medium text-on-surface-variant">With Icons</h4>
        <Flex gap="md" wrap>
          <Button icon={<Plus className="w-4 h-4" />}>Add Item</Button>
          <Button icon={<Search className="w-4 h-4" />} iconPosition="right">
            Search
          </Button>
        </Flex>
      </div>
    </div>
  );
}

function InputShowcase() {
  const [value, setValue] = React.useState("");

  return (
    <div className="space-y-6">
      <Grid cols={2} gap="md">
        <Input
          label="Default Input"
          placeholder="Type something..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <Input
          label="With Icon"
          placeholder="Search..."
          icon={<Search className="w-4 h-4" />}
          iconPosition="left"
        />
      </Grid>

      <Grid cols={2} gap="md">
        <Input
          label="With Helper"
          placeholder="Helper text"
          helper="This is a helper message"
        />
        <Input
          label="With Error"
          placeholder="Error state"
          error="This field is required"
        />
      </Grid>

      <Input label="Disabled" placeholder="Disabled input" disabled />
    </div>
  );
}

function CardShowcase() {
  return (
    <Grid cols={3} gap="md">
      <Card>
        <CardHeader>
          <CardTitle>Default Card</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-on-surface-variant">
            Basic card with shadow-md style
          </p>
        </CardContent>
      </Card>

      <Card variant="elevated">
        <CardHeader>
          <CardTitle>Elevated Card</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-on-surface-variant">
            Enhanced shadow for more elevation
          </p>
        </CardContent>
      </Card>

      <Card variant="glass">
        <CardHeader>
          <CardTitle>Glass Card</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-on-surface-variant">Backdrop blur effect</p>
        </CardContent>
      </Card>
    </Grid>
  );
}

function BadgeShowcase() {
  const variants: Array<"default" | "success" | "warning" | "error" | "info"> =
    ["default", "success", "warning", "error", "info"];
  const sizes: Array<"sm" | "md"> = ["sm", "md"];

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <h4 className="font-medium text-on-surface-variant">Variants</h4>
        <Flex gap="md" wrap>
          {variants.map((v) => (
            <Badge key={v} variant={v}>
              {v}
            </Badge>
          ))}
        </Flex>
      </div>

      <div className="space-y-3">
        <h4 className="font-medium text-on-surface-variant">With Dot</h4>
        <Flex gap="md" wrap>
          {variants.map((v) => (
            <Badge key={v} variant={v} dot>
              {v}
            </Badge>
          ))}
        </Flex>
      </div>

      <div className="space-y-3">
        <h4 className="font-medium text-on-surface-variant">Sizes</h4>
        <Flex gap="md" align="center">
          {sizes.map((s) => (
            <Badge key={s} size={s}>
              Label
            </Badge>
          ))}
        </Flex>
      </div>
    </div>
  );
}

function AvatarShowcase() {
  const sizes: Array<"xs" | "sm" | "md" | "lg" | "xl"> = [
    "xs",
    "sm",
    "md",
    "lg",
    "xl",
  ];

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <h4 className="font-medium text-on-surface-variant">Sizes</h4>
        <Flex gap="md" align="center">
          {sizes.map((s) => (
            <Avatar key={s} size={s} fallback="John Doe" />
          ))}
        </Flex>
      </div>

      <div className="space-y-3">
        <h4 className="font-medium text-on-surface-variant">With Image</h4>
        <Flex gap="md" align="center">
          <Avatar
            src="https://i.pravatar.cc/150?img=1"
            alt="Jane"
            fallback="Jane Smith"
            size="lg"
          />
          <Avatar
            src="https://i.pravatar.cc/150?img=2"
            alt="Bob"
            fallback="Bob Wilson"
            size="lg"
          />
        </Flex>
      </div>

      <div className="space-y-3">
        <h4 className="font-medium text-on-surface-variant">Square</h4>
        <Flex gap="md" align="center">
          <Avatar fallback="Test" rounded={false} size="md" />
          <Avatar fallback="User" rounded={false} size="lg" />
        </Flex>
      </div>
    </div>
  );
}

function AlertShowcase() {
  return (
    <div className="space-y-4">
      <Alert
        variant="info"
        title="Information"
        description="This is an informational message"
      />
      <Alert
        variant="success"
        title="Success"
        description="Your action was completed successfully"
      />
      <Alert
        variant="warning"
        title="Warning"
        description="Please review your data before continuing"
      />
      <Alert
        variant="error"
        title="Error"
        description="Something went wrong. Please try again"
      />
    </div>
  );
}

function ProgressShowcase() {
  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <h4 className="font-medium text-on-surface-variant">Linear Progress</h4>
        <div className="space-y-3">
          <Progress value={25} label="Progress" showValue />
          <Progress value={50} color="success" showValue />
          <Progress value={75} color="warning" showValue />
          <Progress value={100} color="error" showValue />
        </div>
      </div>

      <div className="space-y-3">
        <h4 className="font-medium text-on-surface-variant">
          Circular Progress
        </h4>
        <Flex gap="lg" align="center">
          <Progress variant="circular" value={25} />
          <Progress variant="circular" value={50} size="lg" color="success" />
          <Progress
            variant="circular"
            value={75}
            size="lg"
            showValue
            color="warning"
          />
        </Flex>
      </div>
    </div>
  );
}

function SkeletonShowcase() {
  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <h4 className="font-medium text-on-surface-variant">Basic Skeletons</h4>
        <Flex gap="md">
          <Skeleton variant="text" width={200} height={16} />
          <Skeleton variant="circular" width={40} height={40} />
          <Skeleton variant="rectangular" width={120} height={80} />
        </Flex>
      </div>

      <div className="space-y-3">
        <h4 className="font-medium text-on-surface-variant">Card Skeleton</h4>
        <CardSkeleton showImage showContent lines={3} />
      </div>
    </div>
  );
}

function AnimationDemo() {
  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <h4 className="font-medium text-on-surface-variant">Fade In</h4>
        <Flex gap="md">
          <div className="p-4 bg-primary text-white rounded-xl animate-fade-in">
            Fade In
          </div>
          <div className="p-4 bg-primary text-white rounded-xl animate-fade-out">
            Fade Out
          </div>
        </Flex>
      </div>

      <div className="space-y-3">
        <h4 className="font-medium text-on-surface-variant">Slide</h4>
        <Flex gap="md">
          <div className="p-4 bg-primary text-white rounded-xl animate-slide-up">
            Slide Up
          </div>
          <div className="p-4 bg-primary text-white rounded-xl animate-slide-right">
            Slide Right
          </div>
        </Flex>
      </div>

      <div className="space-y-3">
        <h4 className="font-medium text-on-surface-variant">Scale</h4>
        <Flex gap="md">
          <div className="p-4 bg-primary text-white rounded-xl animate-scale-in">
            Scale In
          </div>
          <div className="p-4 bg-primary text-white rounded-xl animate-pulse">
            Pulse
          </div>
        </Flex>
      </div>

      <div className="space-y-3">
        <h4 className="font-medium text-on-surface-variant">
          Shimmer (Loading)
        </h4>
        <Skeleton
          variant="rectangular"
          height={60}
          className="animate-shimmer"
        />
      </div>
    </div>
  );
}

function LayoutDemo() {
  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <h4 className="font-medium text-on-surface-variant">Stack</h4>
        <Stack spacing="md">
          <div className="p-3 bg-surface-container rounded-lg">Item 1</div>
          <div className="p-3 bg-surface-container rounded-lg">Item 2</div>
          <div className="p-3 bg-surface-container rounded-lg">Item 3</div>
        </Stack>
      </div>

      <Divider />

      <div className="space-y-3">
        <h4 className="font-medium text-on-surface-variant">Flex</h4>
        <Flex justify="between" align="center">
          <div className="p-3 bg-surface-container rounded-lg">Left</div>
          <div className="p-3 bg-surface-container rounded-lg">Center</div>
          <div className="p-3 bg-surface-container rounded-lg">Right</div>
        </Flex>
      </div>

      <Divider />

      <div className="space-y-3">
        <h4 className="font-medium text-on-surface-variant">Grid</h4>
        <Grid cols={3} gap="md">
          <div className="p-3 bg-surface-container rounded-lg text-center">
            1
          </div>
          <div className="p-3 bg-surface-container rounded-lg text-center">
            2
          </div>
          <div className="p-3 bg-surface-container rounded-lg text-center">
            3
          </div>
        </Grid>
      </div>
    </div>
  );
}

export default function DesignSystemPage() {
  return (
    <Container maxWidth="2xl" padding>
      <div className="py-8 space-y-12">
        <div>
          <h1 className="text-4xl font-display font-bold mb-2">
            Sauvia Design System
          </h1>
          <p className="text-on-surface-variant">
            Visual component library and design tokens
          </p>
        </div>

        <section>
          <h2 className="text-2xl font-display font-semibold mb-6">Colors</h2>
          <ColorPalette />
        </section>

        <section>
          <h2 className="text-2xl font-display font-semibold mb-6">
            Typography
          </h2>
          <TypographyDemo />
        </section>

        <section>
          <h2 className="text-2xl font-display font-semibold mb-6">Buttons</h2>
          <ButtonShowcase />
        </section>

        <section>
          <h2 className="text-2xl font-display font-semibold mb-6">Inputs</h2>
          <InputShowcase />
        </section>

        <section>
          <h2 className="text-2xl font-display font-semibold mb-6">Cards</h2>
          <CardShowcase />
        </section>

        <section>
          <h2 className="text-2xl font-display font-semibold mb-6">Badges</h2>
          <BadgeShowcase />
        </section>

        <section>
          <h2 className="text-2xl font-display font-semibold mb-6">Avatars</h2>
          <AvatarShowcase />
        </section>

        <section>
          <h2 className="text-2xl font-display font-semibold mb-6">Alerts</h2>
          <AlertShowcase />
        </section>

        <section>
          <h2 className="text-2xl font-display font-semibold mb-6">Progress</h2>
          <ProgressShowcase />
        </section>

        <section>
          <h2 className="text-2xl font-display font-semibold mb-6">
            Skeletons
          </h2>
          <SkeletonShowcase />
        </section>

        <section>
          <h2 className="text-2xl font-display font-semibold mb-6">
            Animations
          </h2>
          <AnimationDemo />
        </section>

        <section>
          <h2 className="text-2xl font-display font-semibold mb-6">Layout</h2>
          <LayoutDemo />
        </section>
      </div>
    </Container>
  );
}

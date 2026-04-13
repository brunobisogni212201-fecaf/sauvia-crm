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
  IconButton,
} from "../../components/primitives";
import { Container, Grid, Flex, Stack, Divider } from "../../components/layout";
import {
  Alert,
  Skeleton,
  CardSkeleton,
  Progress,
  Modal,
  ModalFooter,
  EmptyState,
  Tooltip,
} from "../../components/feedback";
import { ToastProvider, useToast } from "../../components/feedback/Toast";
import {
  Search,
  Plus,
  X,
  Info,
  Users,
  FileText,
  TrendingUp,
  Star,
} from "lucide-react";
import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  RadialLinearScale,
  Title,
  Tooltip as ChartTooltip,
  Legend,
} from "chart.js";
import { Bar, Line, Doughnut, Radar } from "react-chartjs-2";
import { motion, AnimatePresence } from "framer-motion";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  RadialLinearScale,
  Title,
  ChartTooltip,
  Legend,
);

function ColorPalette() {
  const colors = [
    { name: "Primary", value: "#7C3AED", class: "bg-primary" },
    { name: "Primary Light", value: "#8B5CF6", class: "bg-primary-light" },
    { name: "Primary Dark", value: "#5B21B6", class: "bg-primary-dark" },
    { name: "Secondary", value: "#A78BFA", class: "bg-secondary" },
    { name: "Surface", value: "hsl(40, 20%, 98%)", class: "bg-surface" },
    {
      name: "Surface Container",
      value: "hsl(40, 15%, 94%)",
      class: "bg-surface-container",
    },
    { name: "On Surface", value: "hsl(210, 20%, 12%)", class: "bg-on-surface" },
    {
      name: "On Surface Variant",
      value: "hsl(210, 10%, 40%)",
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

function IconButtonShowcase() {
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
            <IconButton
              key={v}
              variant={v}
              icon={<Plus className="w-5 h-5" />}
            />
          ))}
        </Flex>
      </div>

      <div className="space-y-3">
        <h4 className="font-medium text-on-surface-variant">Sizes</h4>
        <Flex gap="md" align="center">
          {sizes.map((s) => (
            <IconButton
              key={s}
              size={s}
              variant="primary"
              icon={<Plus className="w-4 h-4" />}
            />
          ))}
        </Flex>
      </div>

      <div className="space-y-3">
        <h4 className="font-medium text-on-surface-variant">
          Square (rounded=false)
        </h4>
        <Flex gap="md" align="center">
          <IconButton
            rounded={false}
            variant="primary"
            icon={<Plus className="w-5 h-5" />}
          />
          <IconButton
            rounded={false}
            variant="secondary"
            icon={<Search className="w-5 h-5" />}
          />
          <IconButton
            rounded={false}
            variant="ghost"
            icon={<X className="w-5 h-5" />}
          />
        </Flex>
      </div>

      <div className="space-y-3">
        <h4 className="font-medium text-on-surface-variant">
          With Label (Tooltip)
        </h4>
        <Flex gap="md" wrap>
          <IconButton
            variant="primary"
            icon={<Plus className="w-5 h-5" />}
            label="Adicionar"
          />
          <IconButton
            variant="secondary"
            icon={<Search className="w-5 h-5" />}
            label="Buscar"
          />
        </Flex>
      </div>
    </div>
  );
}

function TooltipShowcase() {
  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <h4 className="font-medium text-on-surface-variant">Positions</h4>
        <Flex gap="xl" justify="center" align="center" className="py-8">
          <Tooltip content="Tooltip left" position="left">
            <Button variant="secondary">Left</Button>
          </Tooltip>
          <Tooltip content="Tooltip top" position="top">
            <Button variant="secondary">Top</Button>
          </Tooltip>
          <Tooltip content="Tooltip bottom" position="bottom">
            <Button variant="secondary">Bottom</Button>
          </Tooltip>
          <Tooltip content="Tooltip right" position="right">
            <Button variant="secondary">Right</Button>
          </Tooltip>
        </Flex>
      </div>
    </div>
  );
}

function ModalShowcase() {
  const [openModal, setOpenModal] = React.useState<string | null>(null);

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <h4 className="font-medium text-on-surface-variant">Sizes</h4>
        <Flex gap="md" wrap>
          <Button onClick={() => setOpenModal("sm")}>Small</Button>
          <Button onClick={() => setOpenModal("md")}>Medium</Button>
          <Button onClick={() => setOpenModal("lg")}>Large</Button>
          <Button onClick={() => setOpenModal("xl")}>Extra Large</Button>
        </Flex>
      </div>

      <Modal
        open={!!openModal}
        onClose={() => setOpenModal(null)}
        title={`Modal ${openModal}`}
        size={openModal as "sm" | "md" | "lg" | "xl"}
      >
        <p className="text-on-surface-variant">
          This is a {openModal} sized modal. You can close it by clicking
          outside, pressing Escape, or clicking the X button.
        </p>
        <ModalFooter>
          <Button variant="ghost" onClick={() => setOpenModal(null)}>
            Cancel
          </Button>
          <Button onClick={() => setOpenModal(null)}>Confirm</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

function ToastShowcase() {
  const { addToast } = useToast();

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <h4 className="font-medium text-on-surface-variant">Variants</h4>
        <Flex gap="md" wrap>
          <Button
            onClick={() =>
              addToast({ variant: "info", message: "Informação importante" })
            }
          >
            Info
          </Button>
          <Button
            onClick={() =>
              addToast({
                variant: "success",
                message: "Operação realizada com sucesso",
              })
            }
          >
            Success
          </Button>
          <Button
            onClick={() =>
              addToast({
                variant: "warning",
                message: "Atenção: verifique os dados",
              })
            }
          >
            Warning
          </Button>
          <Button
            onClick={() =>
              addToast({
                variant: "error",
                message: "Erro ao processar solicitação",
              })
            }
          >
            Error
          </Button>
        </Flex>
      </div>
    </div>
  );
}

function EmptyStateShowcase() {
  return (
    <Grid cols={2} gap="md">
      <EmptyState
        icon={<Users className="w-8 h-8 text-primary" />}
        title="Nenhum paciente encontrado"
        description="Comece adicionando seu primeiro paciente para gerenciar sua agenda."
        action={<Button>Adicionar Paciente</Button>}
      />
      <EmptyState
        icon={<FileText className="w-8 h-8 text-primary" />}
        title="Nenhum resultado"
        description="Tente ajustar os filtros de busca para encontrar o que procura."
      />
    </Grid>
  );
}

function ChartShowcase() {
  const barData = {
    labels: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun"],
    datasets: [
      {
        label: "Pacientes",
        data: [12, 19, 15, 25, 22, 30],
        backgroundColor: "#7C3AED",
        borderRadius: 8,
      },
    ],
  };

  const lineData = {
    labels: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun"],
    datasets: [
      {
        label: "Consultas",
        data: [8, 12, 15, 11, 18, 22],
        borderColor: "#7C3AED",
        backgroundColor: "rgba(124, 58, 237, 0.1)",
        fill: true,
        tension: 0.4,
      },
      {
        label: "Retornos",
        data: [4, 6, 8, 5, 9, 12],
        borderColor: "#A78BFA",
        backgroundColor: "rgba(167, 139, 250, 0.1)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const doughnutData = {
    labels: ["Ativos", "Inativos", "Novos"],
    datasets: [
      {
        data: [65, 20, 15],
        backgroundColor: ["#7C3AED", "#A78BFA", "#8B5CF6"],
        borderWidth: 0,
      },
    ],
  };

  const radarData = {
    labels: ["Peso", "Altura", "IMC", "Gordura", "Musculo", "Agua"],
    datasets: [
      {
        label: "Paciente",
        data: [75, 85, 70, 60, 80, 90],
        backgroundColor: "rgba(124, 58, 237, 0.2)",
        borderColor: "#7C3AED",
        pointBackgroundColor: "#7C3AED",
      },
      {
        label: "Meta",
        data: [80, 90, 75, 65, 85, 95],
        backgroundColor: "rgba(167, 139, 250, 0.2)",
        borderColor: "#A78BFA",
        pointBackgroundColor: "#A78BFA",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom" as const,
      },
    },
  };

  return (
    <div className="space-y-8">
      <Grid cols={2} gap="md">
        <Card>
          <CardHeader>
            <CardTitle>Consultas por Mês</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <Bar data={barData} options={chartOptions} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Evolução de Consultas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <Line data={lineData} options={chartOptions} />
            </div>
          </CardContent>
        </Card>
      </Grid>

      <Grid cols={2} gap="md">
        <Card>
          <CardHeader>
            <CardTitle>Status de Pacientes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <Doughnut data={doughnutData} options={chartOptions} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Métricas do Paciente</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <Radar data={radarData} options={chartOptions} />
            </div>
          </CardContent>
        </Card>
      </Grid>
    </div>
  );
}

function FramerMotionShowcase() {
  const [show, setShow] = React.useState(true);
  const [count, setCount] = React.useState(0);

  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <h4 className="font-medium text-on-surface-variant">
          AnimatePresence (Mount/Unmount)
        </h4>
        <Flex gap="md" align="center">
          <Button onClick={() => setShow(!show)}>
            {show ? "Hide" : "Show"}
          </Button>
        </Flex>
        <div className="h-24 flex items-center justify-center bg-surface-container rounded-xl">
          <AnimatePresence mode="wait">
            {show && (
              <motion.div
                key="box"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
                className="p-6 bg-primary text-white rounded-xl"
              >
                Animated Box
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="space-y-3">
        <h4 className="font-medium text-on-surface-variant">Tap Animation</h4>
        <motion.button
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.05 }}
          className="px-6 py-3 bg-primary text-white rounded-xl"
        >
          Hover & Tap Me
        </motion.button>
      </div>

      <div className="space-y-3">
        <h4 className="font-medium text-on-surface-variant">Drag & Spring</h4>
        <Flex gap="md" wrap>
          <motion.div
            drag
            dragConstraints={{ left: -100, right: 100, top: -50, bottom: 50 }}
            whileDrag={{ scale: 1.1 }}
            className="p-6 bg-secondary text-white rounded-xl cursor-grab"
          >
            Drag Me
          </motion.div>
          <motion.div
            animate={{
              x: [0, 100, -100, 0],
              rotate: [0, 180, 360, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="p-6 bg-primary text-white rounded-xl"
          >
            Spring Loop
          </motion.div>
        </Flex>
      </div>

      <div className="space-y-3">
        <h4 className="font-medium text-on-surface-variant">
          Stagger Children
        </h4>
        <motion.div
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: { staggerChildren: 0.1 },
            },
          }}
          initial="hidden"
          animate="show"
          className="flex gap-2"
        >
          {[1, 2, 3, 4, 5].map((i) => (
            <motion.div
              key={i}
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0 },
              }}
              className="w-12 h-12 bg-primary rounded-lg"
            />
          ))}
        </motion.div>
      </div>

      <div className="space-y-3">
        <h4 className="font-medium text-on-surface-variant">
          Layout Animations
        </h4>
        <Flex gap="md" align="center">
          <Button onClick={() => setCount(count + 1)}>Add Item</Button>
          <Button
            variant="ghost"
            onClick={() => setCount(Math.max(0, count - 1))}
          >
            Remove
          </Button>
        </Flex>
        <motion.div layout className="flex gap-2 flex-wrap">
          {Array.from({ length: count }).map((_, i) => (
            <motion.div
              key={i}
              layout
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center text-white font-bold"
            >
              {i + 1}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

function DashboardShowcase() {
  const barData = {
    labels: ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"],
    datasets: [
      {
        label: "Consultas",
        data: [8, 12, 6, 15, 10, 4],
        backgroundColor: "#7C3AED",
        borderRadius: 8,
      },
    ],
  };

  const lineData = {
    labels: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun"],
    datasets: [
      {
        label: "Pacientes Ativos",
        data: [45, 52, 48, 60, 58, 72],
        borderColor: "#7C3AED",
        backgroundColor: "rgba(124, 58, 237, 0.1)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const doughnutData = {
    labels: ["Primeira Consulta", "Retorno", "Avaliação"],
    datasets: [
      {
        data: [35, 45, 20],
        backgroundColor: ["#7C3AED", "#A78BFA", "#8B5CF6"],
        borderWidth: 0,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom" as const,
      },
    },
  };

  return (
    <div className="space-y-6">
      <Grid cols={4} gap="md">
        <Card>
          <CardContent>
            <Flex align="center" gap="md">
              <div className="p-3 bg-primary/10 rounded-xl">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-on-surface-variant">Pacientes</p>
                <p className="text-2xl font-bold">248</p>
              </div>
            </Flex>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <Flex align="center" gap="md">
              <div className="p-3 bg-secondary/10 rounded-xl">
                <TrendingUp className="w-6 h-6 text-secondary" />
              </div>
              <div>
                <p className="text-sm text-on-surface-variant">Consultas</p>
                <p className="text-2xl font-bold">56</p>
              </div>
            </Flex>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <Flex align="center" gap="md">
              <div className="p-3 bg-green-500/10 rounded-xl">
                <Star className="w-6 h-6 text-green-500" />
              </div>
              <div>
                <p className="text-sm text-on-surface-variant">Avaliações</p>
                <p className="text-2xl font-bold">4.8</p>
              </div>
            </Flex>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <Flex align="center" gap="md">
              <div className="p-3 bg-blue-500/10 rounded-xl">
                <FileText className="w-6 h-6 text-blue-500" />
              </div>
              <div>
                <p className="text-sm text-on-surface-variant">Planos</p>
                <p className="text-2xl font-bold">124</p>
              </div>
            </Flex>
          </CardContent>
        </Card>
      </Grid>

      <Grid cols={2} gap="md">
        <Card>
          <CardHeader>
            <CardTitle>Consultas da Semana</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-48">
              <Bar data={barData} options={chartOptions} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Crescimento de Pacientes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-48">
              <Line data={lineData} options={chartOptions} />
            </div>
          </CardContent>
        </Card>
      </Grid>

      <Grid cols={3} gap="md">
        <Card>
          <CardHeader>
            <CardTitle>Tipos de Consulta</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-48">
              <Doughnut data={doughnutData} options={chartOptions} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Pacientes Recentes</CardTitle>
          </CardHeader>
          <CardContent>
            <Stack spacing="md">
              <Flex align="center" gap="md">
                <Avatar
                  src="https://i.pravatar.cc/150?img=1"
                  fallback="Maria"
                  size="sm"
                />
                <div className="flex-1">
                  <p className="font-medium">Maria Santos</p>
                  <p className="text-sm text-on-surface-variant">
                    Nova paciente
                  </p>
                </div>
                <Badge variant="success">Ativo</Badge>
              </Flex>
              <Flex align="center" gap="md">
                <Avatar
                  src="https://i.pravatar.cc/150?img=2"
                  fallback="João"
                  size="sm"
                />
                <div className="flex-1">
                  <p className="font-medium">João Silva</p>
                  <p className="text-sm text-on-surface-variant">Retorno</p>
                </div>
                <Badge variant="info">Agendado</Badge>
              </Flex>
              <Flex align="center" gap="md">
                <Avatar
                  src="https://i.pravatar.cc/150?img=3"
                  fallback="Ana"
                  size="sm"
                />
                <div className="flex-1">
                  <p className="font-medium">Ana Costa</p>
                  <p className="text-sm text-on-surface-variant">Avaliação</p>
                </div>
                <Badge variant="warning">Pendente</Badge>
              </Flex>
            </Stack>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Próximas Consultas</CardTitle>
          </CardHeader>
          <CardContent>
            <Stack spacing="md">
              <Flex align="center" gap="md">
                <div className="text-center p-2 bg-surface-container rounded-lg min-w-[50px]">
                  <p className="text-xs text-on-surface-variant">Hoje</p>
                  <p className="font-bold">14:00</p>
                </div>
                <div className="flex-1">
                  <p className="font-medium">Roberto Alves</p>
                  <p className="text-sm text-on-surface-variant">Retorno</p>
                </div>
              </Flex>
              <Flex align="center" gap="md">
                <div className="text-center p-2 bg-surface-container rounded-lg min-w-[50px]">
                  <p className="text-xs text-on-surface-variant">Hoje</p>
                  <p className="font-bold">15:30</p>
                </div>
                <div className="flex-1">
                  <p className="font-medium">Carla Souza</p>
                  <p className="text-sm text-on-surface-variant">Primeira</p>
                </div>
              </Flex>
              <Flex align="center" gap="md">
                <div className="text-center p-2 bg-surface-container rounded-lg min-w-[50px]">
                  <p className="text-xs text-on-surface-variant">Amanhã</p>
                  <p className="font-bold">09:00</p>
                </div>
                <div className="flex-1">
                  <p className="font-medium">Pedro Lima</p>
                  <p className="text-sm text-on-surface-variant">Retorno</p>
                </div>
              </Flex>
            </Stack>
          </CardContent>
        </Card>
      </Grid>
    </div>
  );
}

export default function DesignSystemPage() {
  return (
    <ToastProvider>
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
            <h2 className="text-2xl font-display font-semibold mb-6">
              Buttons
            </h2>
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
            <h2 className="text-2xl font-display font-semibold mb-6">
              Avatars
            </h2>
            <AvatarShowcase />
          </section>

          <section>
            <h2 className="text-2xl font-display font-semibold mb-6">
              Icon Buttons
            </h2>
            <IconButtonShowcase />
          </section>

          <section>
            <h2 className="text-2xl font-display font-semibold mb-6">
              Tooltips
            </h2>
            <TooltipShowcase />
          </section>

          <section>
            <h2 className="text-2xl font-display font-semibold mb-6">Modals</h2>
            <ModalShowcase />
          </section>

          <section>
            <h2 className="text-2xl font-display font-semibold mb-6">Toasts</h2>
            <ToastShowcase />
          </section>

          <section>
            <h2 className="text-2xl font-display font-semibold mb-6">
              Empty States
            </h2>
            <EmptyStateShowcase />
          </section>

          <section>
            <h2 className="text-2xl font-display font-semibold mb-6">Alerts</h2>
            <AlertShowcase />
          </section>

          <section>
            <h2 className="text-2xl font-display font-semibold mb-6">
              Progress
            </h2>
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
              Charts (Chart.js)
            </h2>
            <ChartShowcase />
          </section>

          <section>
            <h2 className="text-2xl font-display font-semibold mb-6">
              Animations (Framer Motion)
            </h2>
            <FramerMotionShowcase />
          </section>

          <section>
            <h2 className="text-2xl font-display font-semibold mb-6">
              Layout Components
            </h2>
            <LayoutDemo />
          </section>

          <section>
            <h2 className="text-2xl font-display font-semibold mb-6">
              Dashboard Example
            </h2>
            <DashboardShowcase />
          </section>
        </div>
      </Container>
    </ToastProvider>
  );
}

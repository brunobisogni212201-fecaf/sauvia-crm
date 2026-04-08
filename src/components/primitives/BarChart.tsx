'use client'

import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { cn } from '@/lib/utils'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

interface BarChartProps {
  data: number[]
  labels: string[]
  title?: string
  subtitle?: string
  height?: number
  className?: string
  horizontal?: boolean
  color?: 'primary' | 'secondary' | 'success' | 'warning'
}

const colors = {
  primary: '#006b2c',
  secondary: '#F97316',
  success: '#16a34a',
  warning: '#d97706',
}

export function BarChart({
  data,
  labels,
  title,
  subtitle,
  height = 300,
  className,
  horizontal = false,
  color = 'primary',
}: BarChartProps) {
  const chartData = {
    labels,
    datasets: [
      {
        data,
        backgroundColor: colors[color],
        borderRadius: 8,
        barThickness: horizontal ? 24 : 40,
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: horizontal ? 'y' as const : 'x' as const,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#ffffff',
        titleColor: '#00201d',
        bodyColor: '#6b7280',
        borderColor: 'rgba(0, 32, 29, 0.15)',
        borderWidth: 1,
        padding: 12,
        cornerRadius: 8,
        displayColors: false,
      },
    },
    scales: {
      x: {
        grid: { display: horizontal ? true : false },
        ticks: { color: '#6b7280', font: { family: 'Plus Jakarta Sans' } },
      },
      y: {
        grid: { display: horizontal ? false : true },
        ticks: { color: '#6b7280', font: { family: 'Plus Jakarta Sans' } },
      },
    },
  }

  return (
    <div className={cn('', className)}>
      {(title || subtitle) && (
        <div className="mb-4">
          {title && <h3 className="text-lg font-semibold text-[#00201d]">{title}</h3>}
          {subtitle && <p className="text-sm text-[#6b7280]">{subtitle}</p>}
        </div>
      )}
      <div style={{ height }}>
        <Bar data={chartData} options={options} />
      </div>
    </div>
  )
}
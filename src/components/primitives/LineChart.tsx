'use client'

'use client'

import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js'
import { cn } from '@/lib/utils'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

interface LineChartProps {
  data: number[]
  labels: string[]
  title?: string
  subtitle?: string
  height?: number
  className?: string
  color?: 'primary' | 'secondary' | 'success' | 'warning'
}

const colors = {
  primary: { line: '#006b2c', fill: 'rgba(0, 107, 44, 0.1)' },
  secondary: { line: '#F97316', fill: 'rgba(249, 115, 22, 0.1)' },
  success: { line: '#16a34a', fill: 'rgba(22, 163, 74, 0.1)' },
  warning: { line: '#d97706', fill: 'rgba(217, 119, 6, 0.1)' },
}

export function LineChart({
  data,
  labels,
  title,
  subtitle,
  height = 300,
  className,
  color = 'primary',
}: LineChartProps) {
  const chartData = {
    labels,
    datasets: [
      {
        data,
        fill: true,
        borderColor: colors[color].line,
        backgroundColor: colors[color].fill,
        tension: 0.4,
        pointBackgroundColor: colors[color].line,
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
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
        grid: { display: false },
        ticks: { color: '#6b7280', font: { family: 'Plus Jakarta Sans' } },
      },
      y: {
        grid: { color: 'rgba(0, 32, 29, 0.08)' },
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
        <Line data={chartData} options={options} />
      </div>
    </div>
  )
}
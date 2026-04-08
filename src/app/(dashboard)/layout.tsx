import { Sidebar } from '@/components/dashboard/Sidebar'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dashboard - Sauvia',
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-[#e4fff9]">
      <Sidebar />
      <main className="ml-64 min-h-screen">
        {children}
      </main>
    </div>
  )
}
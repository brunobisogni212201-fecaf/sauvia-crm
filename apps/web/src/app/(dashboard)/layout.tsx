export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-surface">
      {/* Sidebar will be added here */}
      <aside className="w-64 glass shadow-sm p-4 hidden lg:block">
        <h2 className="text-xl font-bold text-primary mb-8">Sauvia</h2>
        <nav className="space-y-2">
          <p className="text-sm text-on-surface-variant">Dashboard</p>
          <p className="text-sm text-on-surface-variant">Pacientes</p>
          <p className="text-sm text-on-surface-variant">Consultas</p>
          <p className="text-sm text-on-surface-variant">Planos</p>
          <p className="text-sm text-on-surface-variant">Mensagens</p>
          <p className="text-sm text-on-surface-variant">Suporte</p>
          <p className="text-sm text-on-surface-variant">Configurações</p>
        </nav>
      </aside>
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}

'use client'

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent, Typography, Button, Input, Badge } from '@/components/primitives'
import { Header } from '@/components/dashboard/Header'
import { Fade } from '@/components/primitives/Animation'

const tabs = [
  { id: 'profile', label: 'Perfil', icon: '👤' },
  { id: 'clinic', label: 'Clínica', icon: '🏥' },
  { id: 'integrations', label: 'Integrações', icon: '🔗' },
  { id: 'notifications', label: 'Notificações', icon: '🔔' },
  { id: 'security', label: 'Segurança', icon: '🔒' },
]

const integrations = [
  { id: 'cognito', name: 'AWS Cognito', status: 'connected', description: 'Autenticação de usuários' },
  { id: 'ses', name: 'AWS SES', status: 'connected', description: 'Envio de emails transacionais' },
  { id: 'n8n', name: 'n8n', status: 'connected', description: 'Automação e workflows' },
  { id: 'evolute', name: 'Evolute API', status: 'disconnected', description: 'WhatsApp Business' },
]

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile')
  const [formData, setFormData] = useState({
    name: 'Nutricionista',
    email: 'prof@email.com',
    phone: '(11) 99999-0000',
    cpf: '123.456.789-00',
    clinicName: 'Clínica Sauvia',
    clinicAddress: 'Rua Example, 123 - São Paulo, SP',
    clinicPhone: '(11) 3333-3333',
  })

  return (
    <>
      <Header 
        title="Configurações" 
        subtitle="Gerencie sua conta e preferências"
      />
      
      <div className="p-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar Tabs */}
          <Card className="md:w-64 flex-shrink-0">
            <nav className="p-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-colors ${
                    activeTab === tab.id
                      ? 'bg-[#e4fff9] text-[#006b2c]'
                      : 'text-[#6b7280] hover:bg-[#c5fff5]/50'
                  }`}
                >
                  <span className="text-lg">{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </nav>
          </Card>

          {/* Content */}
          <div className="flex-1">
            {activeTab === 'profile' && (
              <Fade direction="up">
                <Card>
                  <CardHeader>
                    <CardTitle>Informações do Perfil</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-6 mb-6">
                      <div className="w-20 h-20 rounded-full bg-[#006b2c] flex items-center justify-center text-white text-2xl font-bold">
                        N
                      </div>
                      <div>
                        <Button variant="outline" size="sm">Alterar Foto</Button>
                        <Typography variant="body-sm" className="text-[#6b7280] mt-1">
                          JPG, PNG. Máximo 2MB.
                        </Typography>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input
                        label="Nome Completo"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                      <Input
                        label="Email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                      <Input
                        label="Telefone"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                      <Input
                        label="CPF"
                        value={formData.cpf}
                        onChange={(e) => setFormData({ ...formData, cpf: e.target.value })}
                      />
                    </div>

                    <div className="flex justify-end pt-4">
                      <Button>Salvar Alterações</Button>
                    </div>
                  </CardContent>
                </Card>
              </Fade>
            )}

            {activeTab === 'clinic' && (
              <Fade direction="up">
                <Card>
                  <CardHeader>
                    <CardTitle>Informações da Clínica</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Input
                      label="Nome da Clínica"
                      value={formData.clinicName}
                      onChange={(e) => setFormData({ ...formData, clinicName: e.target.value })}
                    />
                    <Input
                      label="Endereço"
                      value={formData.clinicAddress}
                      onChange={(e) => setFormData({ ...formData, clinicAddress: e.target.value })}
                    />
                    <Input
                      label="Telefone da Clínica"
                      value={formData.clinicPhone}
                      onChange={(e) => setFormData({ ...formData, clinicPhone: e.target.value })}
                    />
                    <div className="flex justify-end pt-4">
                      <Button>Salvar Alterações</Button>
                    </div>
                  </CardContent>
                </Card>
              </Fade>
            )}

            {activeTab === 'integrations' && (
              <Fade direction="up">
                <Card>
                  <CardHeader>
                    <CardTitle>Integrações</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {integrations.map((integration) => (
                        <div 
                          key={integration.id}
                          className="flex items-center justify-between p-4 bg-[#c5fff5]/30 rounded-xl"
                        >
                          <div>
                            <Typography variant="body-md" className="font-medium">
                              {integration.name}
                            </Typography>
                            <Typography variant="body-sm" className="text-[#6b7280]">
                              {integration.description}
                            </Typography>
                          </div>
                          <Badge variant={integration.status === 'connected' ? 'success' : 'warning'}>
                            {integration.status === 'connected' ? 'Conectado' : 'Não conectado'}
                          </Badge>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 p-4 bg-[#c5fff5]/50 rounded-xl">
                      <Typography variant="body-md" className="font-medium mb-2">
                        ⚠️ Credenciais AWS
                      </Typography>
                      <Typography variant="body-sm" className="text-[#6b7280]">
                        As credenciais da AWS são configuradas via variáveis de ambiente. 
                        Atualize no arquivo .env ou via AWS Systems Manager Parameter Store.
                      </Typography>
                    </div>
                  </CardContent>
                </Card>
              </Fade>
            )}

            {activeTab === 'notifications' && (
              <Fade direction="up">
                <Card>
                  <CardHeader>
                    <CardTitle>Preferências de Notificação</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {['Email de novas consultas', 'Lembretes de agendamento', 'Notificações de pacientes', 'Alertas de sistema'].map((item) => (
                        <label key={item} className="flex items-center justify-between p-3 bg-[#c5fff5]/30 rounded-xl cursor-pointer">
                          <Typography variant="body-md">{item}</Typography>
                          <input type="checkbox" defaultChecked className="w-5 h-5 text-[#006b2c] rounded" />
                        </label>
                      ))}
                    </div>
                    <div className="flex justify-end pt-4">
                      <Button>Salvar Preferências</Button>
                    </div>
                  </CardContent>
                </Card>
              </Fade>
            )}

            {activeTab === 'security' && (
              <Fade direction="up">
                <Card>
                  <CardHeader>
                    <CardTitle>Segurança</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-4 bg-[#c5fff5]/30 rounded-xl">
                      <Typography variant="body-md" className="font-medium mb-2">Alterar Senha</Typography>
                      <div className="space-y-3">
                        <Input type="password" placeholder="Senha atual" />
                        <Input type="password" placeholder="Nova senha" />
                        <Input type="password" placeholder="Confirmar nova senha" />
                      </div>
                      <Button className="mt-4">Atualizar Senha</Button>
                    </div>

                    <div className="p-4 bg-[#c5fff5]/30 rounded-xl">
                      <Typography variant="body-md" className="font-medium mb-2">Autenticação em 2 Fatores (2FA)</Typography>
                      <Typography variant="body-sm" className="text-[#6b7280] mb-3">
                        Adicione uma camada extra de segurança à sua conta.
                      </Typography>
                      <Button variant="outline">Ativar 2FA</Button>
                    </div>

                    <div className="p-4 bg-[#fee2e2]/50 rounded-xl">
                      <Typography variant="body-md" className="text-red-600 font-medium mb-2">Zona de Perigo</Typography>
                      <Typography variant="body-sm" className="text-[#6b7280] mb-3">
                        Uma vez que você excluir sua conta, não há volta.
                      </Typography>
                      <Button variant="outline" className="text-red-600 border-red-600 hover:bg-red-50">
                        Excluir Minha Conta
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </Fade>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
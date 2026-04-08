'use client'

import { useState } from 'react'
import { Card, Badge, Typography, Button, Input } from '@/components/primitives'
import { Header } from '@/components/dashboard/Header'
import { Fade } from '@/components/primitives/Animation'

const mockArticles = [
  { id: '1', title: 'Como criar um plano alimentar', category: 'Planos', slug: 'criar-plano', published: true, views: 1250 },
  { id: '2', title: 'Entendendo as necessidades calóricas', category: 'Nutrição', slug: 'calorias', published: true, views: 890 },
  { id: '3', title: 'Como usar o sistema de agendamento', category: 'Sistema', slug: 'agendamento', published: true, views: 650 },
  { id: '4', title: 'Dúvidas frequentes sobre LGPD', category: 'LGPD', slug: 'lgpd-faq', published: true, views: 420 },
  { id: '5', title: 'Guia de integração com WhatsApp', category: 'WhatsApp', slug: 'whatsapp-guide', published: false, views: 0 },
]

const categories = ['Todos', 'Planos', 'Nutrição', 'Sistema', 'LGPD', 'WhatsApp']

export default function KnowledgeBasePage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('Todos')

  const filteredArticles = mockArticles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'Todos' || article.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <>
      <Header 
        title="Base de Conhecimento" 
        subtitle="Artigos e tutoriais"
        actions={
          <Button>+ Novo Artigo</Button>
        }
      />
      
      <div className="p-6">
        {/* Search & Filter */}
        <Card className="mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Buscar artigos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-colors ${
                    selectedCategory === cat 
                      ? 'bg-[#006b2c] text-white' 
                      : 'bg-[#c5fff5] text-[#006b2c] hover:bg-[#89f5e7]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </Card>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((article, index) => (
            <Fade key={article.id} direction="up" delay={index * 0.1}>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full flex flex-col">
                <div className="flex items-center justify-between mb-3">
                  <Badge variant={article.published ? 'success' : 'warning'}>
                    {article.published ? 'Publicado' : 'Rascunho'}
                  </Badge>
                  <Typography variant="label-sm" className="text-[#6b7280]">
                    {article.category}
                  </Typography>
                </div>
                
                <Typography variant="title-md" className="mb-2">{article.title}</Typography>
                
                <div className="mt-auto pt-4 flex items-center justify-between">
                  <Typography variant="label-sm" className="text-[#6b7280]">
                    👁 {article.views} visualizações
                  </Typography>
                  <Button variant="ghost" size="sm">Ver →</Button>
                </div>
              </Card>
            </Fade>
          ))}
        </div>

        {filteredArticles.length === 0 && (
          <Card className="text-center py-12">
            <Typography variant="title-md" className="text-[#6b7280]">
              Nenhum artigo encontrado
            </Typography>
          </Card>
        )}

        {/* Quick Links for WhatsApp */}
        <div className="mt-8">
          <Typography variant="title-md" className="mb-4">Acesso rápido via WhatsApp</Typography>
          <Card className="bg-[#c5fff5]/50">
            <div className="flex items-center gap-4">
              <div className="text-4xl">💬</div>
              <div className="flex-1">
                <Typography variant="body-md">Seus pacientes podem buscar artigos diretamente pelo WhatsApp!</Typography>
                <Typography variant="body-sm" className="text-[#6b7280] mt-1">
                  Configure no n8n para automaticamente buscar e enviar artigos quando pacientes enviarem palavras-chave.
                </Typography>
              </div>
              <Button>Ver Tutorial</Button>
            </div>
          </Card>
        </div>
      </div>
    </>
  )
}
'use client'

import { useState } from 'react'
import { Card, Badge, Typography, Button, Input } from '@/components/primitives'
import { Header } from '@/components/dashboard/Header'
import { Fade } from '@/components/primitives/Animation'

const mockConversations = [
  { id: '1', patient: 'Maria Santos', lastMessage: 'Obrigada pelo plano! 🙏', time: '2 min atrás', unread: true, avatar: 'M' },
  { id: '2', patient: 'João Silva', lastMessage: 'Entendi, vou seguir a dieta', time: '1 hora atrás', unread: false, avatar: 'J' },
  { id: '3', patient: 'Ana Costa', lastMessage: 'Quando é minha próxima consulta?', time: '3 horas atrás', unread: true, avatar: 'A' },
  { id: '4', patient: 'Pedro Alves', lastMessage: 'Posso substituir o ovo por tofu?', time: 'Ontem', unread: false, avatar: 'P' },
  { id: '5', patient: 'Julia Martins', lastMessage: 'Recebi o plano, obrigada!', time: 'Ontem', unread: false, avatar: 'J' },
]

const mockMessages = [
  { id: '1', sender: 'patient', content: 'Olá! Recebi o plano alimentar, muito obrigada! 🙏', time: '10:30' },
  { id: '2', sender: 'nutricionista', content: 'Olá Maria! Que bom que recebeu. Qualquer dúvida sobre as refeições, pode me perguntar.', time: '10:32' },
  { id: '3', sender: 'patient', content: 'Tive uma dúvida sobre o café da manhã. Posso trocar o pão por torrada?', time: '10:35' },
  { id: '4', sender: 'nutricionista', content: 'Sim, pode! A torrada integral é uma boa opção. Só atenção na quantidade, ok?', time: '10:38' },
  { id: '5', sender: 'patient', content: 'Obrigada pelo plano! 🙏', time: '10:40' },
]

export default function MessagesPage() {
  const [selectedChat, setSelectedChat] = useState(mockConversations[0])
  const [newMessage, setNewMessage] = useState('')

  const sendMessage = () => {
    if (!newMessage.trim()) return
    // Here you'd call the API
    setNewMessage('')
  }

  return (
    <>
      <Header 
        title="Mensagens" 
        subtitle="WhatsApp integrado"
        actions={
          <div className="flex items-center gap-2 px-3 py-1.5 bg-[#c5fff5]/50 rounded-lg">
            <span className="text-sm">📱</span>
            <Typography variant="label-sm" className="text-[#006b2c]">Conectado</Typography>
          </div>
        }
      />
      
      <div className="p-6 h-[calc(100vh-4rem)]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full">
          {/* Conversations List */}
          <Card className="md:col-span-1 flex flex-col overflow-hidden">
            <div className="p-4 border-b border-[rgba(0,32,29,0.08)]">
              <Input placeholder="Buscar conversas..." />
            </div>
            <div className="flex-1 overflow-y-auto">
              {mockConversations.map((chat) => (
                <button
                  key={chat.id}
                  onClick={() => setSelectedChat(chat)}
                  className={`w-full p-4 text-left border-b border-[rgba(0,32,29,0.05)] hover:bg-[#c5fff5]/30 transition-colors ${
                    selectedChat.id === chat.id ? 'bg-[#c5fff5]/50' : ''
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-medium ${
                      chat.unread ? 'bg-[#006b2c]' : 'bg-[#6b7280]'
                    }`}>
                      {chat.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <Typography variant="body-md" className="font-medium">{chat.patient}</Typography>
                        <Typography variant="label-sm" className="text-[#6b7280]">{chat.time}</Typography>
                      </div>
                      <Typography variant="body-sm" className={`truncate ${chat.unread ? 'text-[#00201d] font-medium' : 'text-[#6b7280]'}`}>
                        {chat.lastMessage}
                      </Typography>
                    </div>
                    {chat.unread && <div className="w-2 h-2 bg-[#F97316] rounded-full" />}
                  </div>
                </button>
              ))}
            </div>
          </Card>

          {/* Chat Area */}
          <Card className="md:col-span-2 flex flex-col overflow-hidden">
            {/* Chat Header */}
            <div className="p-4 border-b border-[rgba(0,32,29,0.08)] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#006b2c] flex items-center justify-center text-white font-medium">
                  {selectedChat.avatar}
                </div>
                <div>
                  <Typography variant="body-md" className="font-medium">{selectedChat.patient}</Typography>
                  <Typography variant="label-sm" className="text-[#6b7280]">Online</Typography>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm">📞</Button>
                <Button variant="ghost" size="sm">🎥</Button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {mockMessages.map((msg) => (
                <Fade key={msg.id} direction="up">
                  <div className={`flex ${msg.sender === 'nutricionista' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[70%] p-3 rounded-2xl ${
                      msg.sender === 'nutricionista' 
                        ? 'bg-[#006b2c] text-white' 
                        : 'bg-[#c5fff5] text-[#00201d]'
                    }`}>
                      <Typography variant="body-md">{msg.content}</Typography>
                      <Typography variant="label-sm" className={msg.sender === 'nutricionista' ? 'text-white/70' : 'text-[#6b7280]'}>
                        {msg.time}
                      </Typography>
                    </div>
                  </div>
                </Fade>
              ))}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-[rgba(0,32,29,0.08)]">
              <div className="flex gap-2">
                <button className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-[#c5fff5]/50">
                  📎
                </button>
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Digite uma mensagem..."
                  className="flex-1 h-10 px-4 bg-[#c5fff5]/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#006b2c]"
                  onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                />
                <Button onClick={sendMessage}>Enviar</Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </>
  )
}
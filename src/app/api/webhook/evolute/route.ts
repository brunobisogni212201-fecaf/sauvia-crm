import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { PrismaClient } = await import('@prisma/client')
    const prisma = new PrismaClient()
    
    const body = await req.json()
    const { phone, message, messageId, type } = body

    if (type === 'message') {
      const phoneNumber = phone.replace(/\D/g, '')
      
      const patient = await prisma.patient.findFirst({
        where: {
          phone: {
            contains: phoneNumber.slice(-11),
          },
        },
      })

      if (patient) {
        await prisma.message.create({
          data: {
            patientId: patient.id,
            direction: 'INBOUND',
            content: message,
            whatsappId: messageId,
          },
        })
      }
    }

    await prisma.$disconnect()
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error processing webhook:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
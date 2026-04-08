import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const startDate = searchParams.get('startDate')
    const endDate = searchParams.get('endDate')
    const status = searchParams.get('status')

    const where: any = {
      userId: session.user.id,
    }

    if (startDate && endDate) {
      where.dateTime = {
        gte: new Date(startDate),
        lte: new Date(endDate),
      }
    }

    if (status) {
      where.status = status
    }

    const appointments = await prisma.appointment.findMany({
      where,
      include: {
        patient: true,
      },
      orderBy: { dateTime: 'asc' },
    })

    return NextResponse.json(appointments)
  } catch (error) {
    console.error('Error fetching appointments:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const { patientId, dateTime, duration, type, notes, meetingUrl } = body

    const appointment = await prisma.appointment.create({
      data: {
        userId: session.user.id,
        patientId,
        dateTime: new Date(dateTime),
        duration: duration || 60,
        type,
        status: 'SCHEDULED',
        notes,
        meetingUrl,
      },
      include: {
        patient: true,
      },
    })

    return NextResponse.json(appointment, { status: 201 })
  } catch (error) {
    console.error('Error creating appointment:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
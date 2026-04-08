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
    const status = searchParams.get('status')
    const patientId = searchParams.get('patientId')

    const where: any = {
      userId: session.user.id,
    }

    if (status) {
      where.status = status
    }

    if (patientId) {
      where.patientId = patientId
    }

    const plans = await prisma.nutritionPlan.findMany({
      where,
      include: {
        patient: true,
      },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json(plans)
  } catch (error) {
    console.error('Error fetching nutrition plans:', error)
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
    const { patientId, name, description, meals, startDate, endDate } = body

    const plan = await prisma.nutritionPlan.create({
      data: {
        userId: session.user.id,
        patientId,
        name,
        description,
        meals,
        startDate: new Date(startDate),
        endDate: endDate ? new Date(endDate) : null,
        status: 'ACTIVE',
      },
      include: {
        patient: true,
      },
    })

    return NextResponse.json(plan, { status: 201 })
  } catch (error) {
    console.error('Error creating nutrition plan:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
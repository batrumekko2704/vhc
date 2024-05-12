import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

export async function POST() {

    const data = await prisma.order.findMany({
        orderBy: {
            timestamp: 'asc'
        }
    });

    return Response.json(data)
}

export async function UPDATE(request) {
    const res = await request.json()
    return Response.json({res})
}
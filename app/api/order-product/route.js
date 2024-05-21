import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(request) {

    const searchParams = request.nextUrl.searchParams

    const data = await prisma.order.findMany({
        include: {
            product: true
        }
    });

    return Response.json(data)
}
import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(request) {

    const searchParams = request.nextUrl.searchParams

    if (searchParams.has('sum')) {
        const target = searchParams.get('target');
        const take = searchParams.get('take');
        const data = await prisma.order.groupBy({
            by: ['product_id'],
            _sum: {
                [target]: true,
            },
            orderBy: {
                _sum: {
                    [target]: 'desc',
                },
            },
            take: take == null ? undefined : Number(take)
        })

        return Response.json(data)
    }

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
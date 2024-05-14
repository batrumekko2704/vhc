import {PrismaClient} from '@prisma/client'
import {parse} from "next/dist/build/swc";

const prisma = new PrismaClient()

export async function POST(request) {

    const searchParams = request.nextUrl.searchParams

    if (searchParams.has('count')) {
        const target = searchParams.get('target');
        const take = searchParams.get('take');
        const data = await prisma.customer.groupBy({
            by: [target],
            _count: {
                [target]: true,
            },
            orderBy: {
                _count: {
                    [target]: 'desc',
                },
            },
            take: take == null ? undefined : Number(take)
        })

        return Response.json(data)
    }

    const data = await prisma.customer.findMany();
    return Response.json(data)
}
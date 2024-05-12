import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

export async function POST() {

    const data = await prisma.customer.findMany();

    return Response.json(data)
}
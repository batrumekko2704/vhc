import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(request) {

    BigInt.prototype['toJSON'] = function () {
        return Number(this);
    }

    const searchParams = request.nextUrl.searchParams

    if (searchParams.has('finance')) {
        const option = searchParams.get('chart');
        let result;
        if (option === '1')
            result = await prisma.$queryRaw`SELECT SUM(total_money) AS total, MONTH(\`order\`.timestamp) AS month FROM \`order\` GROUP BY MONTH(\`order\`.timestamp) ORDER BY MONTH(\`order\`.timestamp);`
        else if (option === '2')
            result = await prisma.$queryRaw`SELECT COUNT(origin) AS count, origin FROM product JOIN \`order\`ON product.product_id = \`order\`.product_id GROUP BY origin;`
        else if (option === '3') {
            result = await prisma.$queryRaw`SELECT COUNT(material) AS count, material FROM product JOIN \`order\`ON product.product_id = \`order\`.product_id GROUP BY material ORDER BY COUNT(material) DESC ;`
        }
        return Response.json(result);
    }

    return Response.json('None')
}
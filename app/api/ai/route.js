import {} from 'dotenv/config'
import {GoogleGenerativeAI} from "@google/generative-ai"
import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

const genAI = new GoogleGenerativeAI(process.env.API_KEY);

const model = genAI.getGenerativeModel({model: "gemini-pro"});

export async function POST(request) {
    let context = 'Trả lời như một nhân viên tư vấn.';
    const customer_count = await prisma.customer.count();
    context += 'Tổng số khách hàng là ' + customer_count + '. ';

    const searchParams = request.nextUrl.searchParams

    const result = await model.generateContent(context + searchParams.get('query'));
    const response = await result.response;
    const text = response.text();

    return Response.json(text)
}
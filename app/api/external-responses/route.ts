import { eq } from "drizzle-orm";
import { getDb } from "../../../db";
import { externalResponses } from "../../../db/schema";
import { getChatGPTUser } from "../../chatgpt-auth";

const OFFICIAL_URL="https://apcentral.collegeboard.org/courses/ap-chemistry/exam/past-exam-questions";
export async function GET(){const user=await getChatGPTUser();if(!user)return Response.json({error:"Unauthorized"},{status:401});const rows=await getDb().select().from(externalResponses).where(eq(externalResponses.userId,user.userId));return Response.json({responses:rows})}
export async function POST(request:Request){const user=await getChatGPTUser();if(!user)return Response.json({error:"Unauthorized"},{status:401});const body=await request.json() as {questionLabel?:string;response?:string};const response=body.response?.trim()??"";if(!response)return Response.json({error:"Write an answer before saving."},{status:400});const id=crypto.randomUUID();const now=new Date();const [saved]=await getDb().insert(externalResponses).values({id,userId:user.userId,resourceUrl:OFFICIAL_URL,resourceLabel:"College Board AP Chemistry released FRQs",questionLabel:body.questionLabel?.trim()||"Selected released FRQ",response,status:"draft",createdAt:now,updatedAt:now}).returning();return Response.json({saved},{status:201})}

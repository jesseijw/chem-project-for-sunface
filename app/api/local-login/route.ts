import { cookies } from "next/headers";

const COOKIE_NAME="chem_coach_role";

export async function GET(){
 const role=(await cookies()).get(COOKIE_NAME)?.value;
 return Response.json({role:role==="student"||role==="admin"||role==="guest"?role:null});
}

export async function POST(request:Request){
 const body=await request.json() as {account?:string;password?:string};
 const account=body.account;
 if(account!=="student"&&account!=="admin"&&account!=="guest")return Response.json({error:"Choose an account."},{status:400});
 if(account==="admin"&&body.password!==(process.env.ADMIN_PASSWORD||"bigfatrickybutt"))return Response.json({error:"Incorrect admin password."},{status:401});
 (await cookies()).set(COOKIE_NAME,account,{httpOnly:true,sameSite:"lax",secure:process.env.NODE_ENV==="production",path:"/",maxAge:60*60*12});
 return Response.json({role:account});
}

export async function DELETE(){
 (await cookies()).delete(COOKIE_NAME);
 return Response.json({ok:true});
}

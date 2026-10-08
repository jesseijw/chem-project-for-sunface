import { requireChatGPTUser,chatGPTSignOutPath } from "./chatgpt-auth"; import Coach from "./coach";
export const dynamic="force-dynamic";
export default async function Home(){const user=await requireChatGPTUser("/");return <Coach name={user.displayName.split(" ")[0]} signOut={chatGPTSignOutPath("/")}/>}

import {ClientUser} from "payload"
import type { User } from "@/payload-types"

export const isSuperAdmin =(user:User | ClientUser | null)=>{
    return Boolean(user?.roles?.includes("superAdmin"))
}
export const isSeller =(user:User | ClientUser | null)=>{
    return Boolean(user?.roles?.includes("seller"))
}
export const isUser =(user:User | ClientUser | null)=>{
    return Boolean(user?.roles?.includes("user"))
}


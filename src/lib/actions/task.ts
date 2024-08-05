"use server"

import { revalidatePath } from "next/cache"
import { surreaQL } from "../surreal"
import { conf } from "@/config"

export async function updateState(state:string, id:string){
    const response = await surreaQL(
        `UPDATE ${id} SET
            state = "${state}";`,
        conf
    )
    revalidatePath("/private")
    return response;
}

export async function deleteTask(id:string){
    const response = await surreaQL(
        `DELETE ${id};`,
        conf
    )
    revalidatePath("/private")
    return response;
}
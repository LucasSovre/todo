import { conf } from "@/config";
import { surreaQL } from "@/lib/surreal";
import { Input,Button } from "@nextui-org/react";
import { redirect } from "next/navigation";

export default function Page(){

    async function createTask(formData:FormData) {
        "use server"
        const name = formData.get("name") as string;
        const description = formData.get("description") as string;
        const status = formData.get("status") as string;
        const sql = `
        CREATE task CONTENT {
            name : "${name}",
            description : "${description}",
            status : "${status}"
        };`
        const response = await surreaQL(sql,conf)
        if(response.status === 200){
            const a = await response.json();
            //redirect("/private")
        }else{
            //redirect("/private/newtask?error=error")
        }
    }

    const states:Array<string> = ["pending","progressing","finished"]

    return(
        <div className="flex w-full h-full justify-center items-center">
            <form action={createTask} className="flex flex-col w-2/3 gap-10">
                <h1 className="text-2xl font-bold">Create a new task</h1>
                <Input label="Name" name="name" placeholder="name"/>
                <Input label="Description" name="description" placeholder="Description"/>
                <select name="status" className="bg-gray-100 px-2 py-4 rounded-xl" defaultValue="pending">
                    {
                        states.map((state,index)=>{
                            return(
                                <option key={index} value={state}>{state}</option>
                            )
                        })
                    }
                </select>
                <Button type="submit" color="primary">Create</Button>
            </form>
        </div>
    )
}
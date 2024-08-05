import { conf } from "@/config";
import { surreaQL } from "@/lib/surreal";
import Task from "./Task";

export default async function AllTask(){

    const tasks = await surreaQL("SELECT * OMIT created_by from task ORDER BY updated_at DESC;",conf);

    return(
        <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4" >
            {
                tasks[0].result.map((task:any)=>{
                    return(
                        <Task task={task} key={task?.id} />
                    )
                })
            }
        </div>
    )
}
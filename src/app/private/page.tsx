import { Button } from "@nextui-org/react";
import Link from "next/link";

export default function Page(){
    return(
        <>
            <div>
                <h1>My tasks</h1>
                <Link href="/private/newtask">
                    <Button color="primary">New Task</Button>
                </Link>
                <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
                
                </div>
            </div>
        </>
    )
}
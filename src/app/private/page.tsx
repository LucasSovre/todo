import AllTask from "@/component/AllTask";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import { Suspense } from "react";

export default function Page(){
    return(
        <>
            <div>
                <h1>My tasks</h1>
                <Link href="/private/newtask">
                    <Button color="primary">New Task</Button>
                </Link>
                <Suspense fallback={<p>Loading ...</p>}>
                    <AllTask />
                </Suspense>
            </div>
        </>
    )
}
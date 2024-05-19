"use client"

import { Button } from "@nextui-org/react"

export default function Error({error,reset}:{error:Error,reset:()=>void}){
    return(
        <div>
            error
            <Button onClick={reset}>reset</Button>
        </div>
    )
}
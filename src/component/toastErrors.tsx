"use client"

import { useEffect } from "react"
import toast from "react-hot-toast"

export default function ToastErrors(){

    useEffect(()=>{
        const url = new URL(window.location.href);
        const error = url.searchParams.get("error");
        if(error){
            toast.error(error)
        }
    })

    return null
}
import { surrealSignin } from "@/lib/surreal";
import { Input, Button } from "@nextui-org/react";
import Link from "next/link";
import { conf } from "@/config";
import { redirect } from "next/navigation";

export default function Page(){

  async function signin(formData:FormData){
    "use server"
    const email = formData.get("email") as string;
    const password = formData.get("password") as string
    const response = await surrealSignin(email,password,conf)
    if(response.status === 200){
      redirect("/private")
    }else{
      console.log("error")
    }
  }

  return(
    <main className="flex flex-col items-center justify-center w-screen h-screen gap-10">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold">Todo App</h1>
        <h2>Welcome !</h2>
      </div>
      <form action={signin} className="flex flex-col gap-5">
        <Input name="email" type="email" label="Email" placeholder="Enter your email" />
        <Input name="password" type="password" label="Password" placeholder="Enter your password" />
        <Button type="submit" color="primary">Login</Button>
        <Link href="/signup" className="text-blue-500 underline text-center">Do not have an account ?</Link>
      </form>
    </main>
  )
}
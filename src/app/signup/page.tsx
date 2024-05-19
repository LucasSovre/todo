import { surrealSignup } from "@/lib/surreal";
import { Input, Button } from "@nextui-org/react";
import Link from "next/link";
import { conf } from "@/config";
import { redirect } from "next/navigation";

export default function Page(){

  async function signup(formData:FormData){
    "use server"
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const response = await surrealSignup(email,password,firstName,lastName,conf)
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
        <h2>Signup !</h2>
      </div>
      <form action={signup} className="flex flex-col gap-5">
        <Input name="email" type="email" label="Email" placeholder="Enter your email" required />
        <Input name="password" type="password" label="Password" placeholder="Enter your password" required />
        <Input name="firstName" type="text" label="First name" placeholder="Enter your first name" required />
        <Input name="lastName" type="text" label="Last name" placeholder="Enter your last name" required />
        <Button type="submit" color="primary">Signup</Button>
        <Link href="/" className="text-blue-500 underline text-center">Already have an account ?</Link>
      </form>
    </main>
  )
}
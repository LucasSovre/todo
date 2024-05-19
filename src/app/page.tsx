import { Input, Button } from "@nextui-org/react";
import Link from "next/link";

export default function Page(){
  return(
    <main className="flex flex-col items-center justify-center w-screen h-screen gap-10">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold">Todo App</h1>
        <h2>Welcome !</h2>
      </div>
      <form className="flex flex-col gap-5">
        <Input type="email" label="Email" placeholder="Enter your email" />
        <Input type="password" label="Password" placeholder="Enter your password" />
        <Button color="primary">Login</Button>
        <Link href="/signup" className="text-blue-500 underline text-center">Do not have an account ?</Link>
      </form>
    </main>
  )
}
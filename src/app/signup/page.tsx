import { Input, Button } from "@nextui-org/react";
import Link from "next/link";

export default function Page(){
  return(
    <main className="flex flex-col items-center justify-center w-screen h-screen gap-10">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold">Todo App</h1>
        <h2>Signup !</h2>
      </div>
      <form className="flex flex-col gap-5">
        <Input type="email" label="Email" placeholder="Enter your email" required />
        <Input type="password" label="Password" placeholder="Enter your password" required />
        <Input type="text" label="First name" placeholder="Enter your first name" required />
        <Input type="text" label="Last name" placeholder="Enter your last name" required />
        <Button color="primary">Login</Button>
        <Link href="/" className="text-blue-500 underline text-center">Already have an account ?</Link>
      </form>
    </main>
  )
}
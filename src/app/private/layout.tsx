import { Button } from "@nextui-org/react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export default function Layout({children}:{children:ReactNode}){

    async function signout() {
        "use server"
        cookies().delete("token")
        redirect("/")
    }

    return(
        <main className="flex flex-col w-screen h-screen">
            <nav className="flex bg-slate-200 py-2 px-10">
                <form className="ml-auto" action={signout}>
                    <Button type="submit" color="danger">Signout</Button>
                </form>
            </nav>
            <section className="p-5 w-full h-full">
                {children}
            </section>
        </main>
    )
}
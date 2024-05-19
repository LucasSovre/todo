import { cookies } from "next/headers";

export interface surrealConfig {
    url : string;
    namespace : string;
    database : string;
    scope : string;
}

export async function surrealSignup(email:string,password:string,fisrtName:string,lastName:string,config:surrealConfig) {
    const response = await fetch(
        `${config.url}/signup`,
        {
            method: "POST",
            headers : {
                "Content-Type" : "application/json",
                "Accept" : "application/json",
            },
            body : JSON.stringify({
                email : email,
                pass : password,
                lastName: lastName,
                firstName : fisrtName,
                ns : config.namespace,
                db : config.database,
                sc : config.scope
            })
        }
    );
    if(response.status === 200){
        const data = await response.json()
        const token = data?.token;
        if(token){
            cookies().set("token",token,{
                httpOnly : true,
                sameSite : "lax",
                maxAge : 60 * 60 * 24
            })
        }else{
            console.debug("error no token in json")
        }
    }
    return response
}

export async function surrealSignin(email:string,password:string,config:surrealConfig) {
    const response = await fetch(
        `${config.url}/signin`,
        {
            method: "POST",
            headers : {
                "Content-Type" : "application/json",
                "Accept" : "application/json",
            },
            body : JSON.stringify({
                email : email,
                pass : password,
                ns : config.namespace,
                db : config.database,
                sc : config.scope
            })
        }
    );
    if(response.status === 200){
        const data = await response.json()
        const token = data?.token;
        if(token){
            cookies().set("token",token,{
                httpOnly : true,
                sameSite : "lax",
                maxAge : 60 * 60 * 24
            })
        }else{
            console.debug("error no token in json")
        }
    }
    return response
}
import { cookies } from "next/headers";

export interface surrealConfig {
    url : string;
    namespace : string;
    database : string;
    scope : string;
}

export async function surreaQL(query:string,config:surrealConfig) {
    const token = cookies().get("token")
    if(token){
        const response = await fetch(
            `${config.url}/sql`,
            {
                method: "POST",
                headers:{
                    "Content-Type" : "text/plain",
                    "Accept" : "application/json",
                    "NS" : config.namespace,
                    "DB":config.database,
                    "Authorization" : `Bearer ${token.value}`
                },
                body: query
            }
        )
        if(response.status === 401){
            console.log("A bad token as been submited", token.value)
            throw new Error("Not authenticated")
        }
        if(response.status === 200){
            console.log("error on transaction",response.status)
            throw new Error("Error on request with database")
        }
        const data = await response.json();
        return data;
    }else{
        throw new Error("Token is missing")
    }
    
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
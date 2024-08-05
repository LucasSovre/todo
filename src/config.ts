import { surrealConfig } from "./lib/surreal";

export const conf:surrealConfig = {
    url : process.env.SURREAL_HOST ?? "",
    scope : process.env.SURREAL_SCOPE ?? "",
    database : process.env.SURREAL_DB ?? "",
    namespace : process.env.SURREAL_NS ?? "",
}
import { surrealConfig } from "./lib/surreal";

export const conf:surrealConfig = {
    url : "http://localhost:8000",
    scope : "account",
    database : "test",
    namespace : "test"
}
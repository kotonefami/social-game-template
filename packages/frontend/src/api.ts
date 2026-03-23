import createClient from "openapi-fetch";
import type { paths } from "./generated/api";

const client = createClient<paths>({ baseUrl: "http://localhost:3000" });

// NOTE: API クライアントの使用例
client
    .POST("/api/refine", {
        body: {
            resource_amount: 100,
            target_id: "",
        },
    })
    .then(async ({ data }) => {
        return data;
    })
    .catch(() => {});

export default client;

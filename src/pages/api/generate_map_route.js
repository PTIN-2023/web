import * as env_config from "../../utils/env_config"
import generate_map_route from "../../lib/generate_map_route";

export default async function handler(req, res) {
    console.log("[generate_map_route] handler invoked")

    const result = await generate_map_route(env_config.getApiEndpoint(), req.body)

    // Return value
    return res.status(result.response_code).json(result.response_body)
}
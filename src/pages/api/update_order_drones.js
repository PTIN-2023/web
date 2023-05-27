import * as env_config from "../../utils/env_config"
import update_order_drones from "../../lib/update_order_drones"

export default async function handler(req, res) {
    console.log("[update_order_drones] handler invoked")

    const result = await update_order_drones(env_config.getApiEndpoint(), req.body)

    // Return value
    return res.status(result.response_code).json(result.response_body)
}
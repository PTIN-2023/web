// Sends a query to /api/checktoken to test the validity of the token and its 
// type. If it matches, it returns true. It returns false otherwise
export default async function check_token_req(api_endpoint, token, expected_type) {
    try {
        const response_check_token = await fetch(api_endpoint+'/api/checktoken', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({token : token})
        }).then(data => data.json())

        return response_check_token && response_check_token.valid == 'yes' && response_check_token.type == expected_type
    } catch {
        return false
    }
}
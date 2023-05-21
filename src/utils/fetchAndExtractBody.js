export default async function fetchAndExtractBody(url, bodyObject) {
  return fetch(url, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(bodyObject)
  }).then(data => data.json())
}
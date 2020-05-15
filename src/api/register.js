export default async username => (
  fetch(`${process.env.VUE_APP_SERVER}/auth`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username })
  })
  .then(response => response.json())
)

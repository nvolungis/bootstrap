async function fetchGraphQL(text, variables) {
  const response = await fetch('http://localhost:4000', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Request-Headers': 'Content-Type',
      'Authorization': `Bearer ${localStorage['token']}`,
    },
    body: JSON.stringify({
      query: text,
      variables,
    }),
    credentials: "include",
  });

  // Get the response as JSON
  return await response.json();
}

export default fetchGraphQL;

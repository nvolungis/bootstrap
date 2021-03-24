const noop = () => {}

async function fetchGraphQL({ text, variables, onError = noop, onAuthError = noop }) {
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
  const data = await response.json();

  if (data.errors) {
    if (data.errors[0].message === 'Not logged in') {
      onAuthError();
    } else {
      onError(data.errors);
    }
  }

  return data;
}

export default fetchGraphQL;

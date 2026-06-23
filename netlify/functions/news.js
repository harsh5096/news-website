exports.handler = async function (event) {
  const {
    category = 'breaking-news',
    max = 10,
    page = 1,
  } = event.queryStringParameters || {};

  const apiKey = process.env.GNEWS_API_KEY || process.env.REACT_APP_GNEWS_API_KEY;

  if (!apiKey) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'API key not configured on server.' }),
    };
  }

  const url = `https://gnews.io/api/v4/top-headlines?category=${category}&lang=en&max=${max}&page=${page}&apikey=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch news from GNews.' }),
    };
  }
};

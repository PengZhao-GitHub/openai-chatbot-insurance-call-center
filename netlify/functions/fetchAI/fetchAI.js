
const handler = async (event) => {

  try {
    //const subject = event.queryStringParameters.name || 'World'
    const requestBody = event.body;
    return {
      statusCode: 200,
      //body: JSON.stringify({ message: `${requestBody}` }),
      body: JSON.stringify({ message: requestBody }),
    }
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}

module.exports = { handler }

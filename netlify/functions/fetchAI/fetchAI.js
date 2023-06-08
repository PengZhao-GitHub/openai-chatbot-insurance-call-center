
const handler = async (event) => {

  console.log(event)

  try {
    //const subject = event.queryStringParameters.name || 'World'
    const requestBody = JSON.parse(event.body);
    return {
      statusCode: 200,
      body: {"hello": "Peng"}
    }
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}

module.exports = { handler }


const handler = async (event) => {
  try {
    //const subject = event.queryStringParameters.name || 'World'
    return {
      statusCode: 200,
      body: {
        reply: event.body
      }
    }
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}

module.exports = { handler }

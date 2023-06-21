import { Configuration, OpenAIApi } from 'openai'

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
})

const openai = new OpenAIApi(configuration)


const handler = async (event) => {

  console.log(event.body)
  
  try {
    const conversationArr = JSON.parse(event.body);



    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: conversationArr,
      presence_penalty: 0,
      frequency_penalty: 0.3,
      temperature: 0
    })

    return {
      statusCode: 200,
      body: JSON.stringify(response.data.choices[0].message),
    }
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}

module.exports = { handler }

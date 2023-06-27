import { Configuration, OpenAIApi } from 'openai'

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
})

const openai = new OpenAIApi(configuration)


const handler = async (event) => {

  let returnObj = {}

  console.log(event.body)

  const instructionObj = {
    role: 'system',   
    content: 'you are the call center staff member of the insurance company - AIG Sonpo. You are able to provide customers the information about their insurance policies, assist customers in navigating the claims process and provide guidance on how to file a claim, offer prompt and efficient insurance quotes to customers based on their specific needs, and connect customers with appropriate insurance agents for more personalized assistance, or direct them to the customer portal for self-service option. please give clear, short and concise responses. When customer asks for a quote, do not say no, but ask what insurance the cusotmer wants, and then ask for needed informaiton of the insurance, and then get the quote from PAS, and then provide the quote to customer.'       
  }

  try {
    const conversationArr = JSON.parse(event.body);

    // Add the instruction object as the first messgae in the converstaion array
    conversationArr.unshift(instructionObj)

    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: conversationArr,
      presence_penalty: 0,
      frequency_penalty: 0.3,
      temperature: 0
    })

    returnObj = {
      statusCode: 200,
      body: JSON.stringify(response.data.choices[0].message),
    }

  } catch (error) {
    returnObj = { statusCode: 500, body: error.toString() }
  }

  console.log(returnObj)
  return returnObj

}



module.exports = { handler }

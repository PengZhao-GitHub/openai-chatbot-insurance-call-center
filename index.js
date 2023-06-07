import { Configuration, OpenAIApi } from 'openai'

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
})


const openai = new OpenAIApi(configuration)

const chatbotConversation = document.getElementById('chatbot-conversation')


const conversationArr = [
    {
        role: 'system',   
        content: 'you are the call center staff member of the insurance company - AIG Sonpo. You are able to provide customers the information about their insurance policies, assist customers in navigating the claims process and provide guidance on how to file a claim, offer prompt and efficient insurance quotes to customers based on their specific needs, and connect customers with appropriate insurance agents for more personalized assistance, or direct them to the customer portal for self-service option. please give clear, short and concise responses. When customer asks for a quote, do not say no, but ask what insurance the cusotmer wants, and then ask for needed informaiton of the insurance, and then get the quote from PAS, and then provide the quote to customer.'       
    }
]

document.addEventListener('submit', (e) => {
    e.preventDefault()
    const userInput = document.getElementById('user-input')
    
    conversationArr.push({
        role: 'user',
        content: userInput.value
    })


    fetchReply()

    const newSpeechBubble = document.createElement('div')
    newSpeechBubble.classList.add('speech', 'speech-human')
    chatbotConversation.appendChild(newSpeechBubble)
    newSpeechBubble.textContent = userInput.value
    userInput.value = ''
    chatbotConversation.scrollTop = chatbotConversation.scrollHeight
})


async function fetchReply() {

    // const response = await openai.createChatCompletion({
    //     model: 'gpt-3.5-turbo',
    //     messages: conversationArr,
    //     presence_penalty: 0, 
    //     frequency_penalty: 0.3,
    //     temperature: 0
    // })

    const url = 'https://cosmic-klepon-bad845.netlify.app/.netlify/functions/fetchAI'
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'content-type': 'text/plain',
        },
        body: conversationArr
    })
    const data = await response.json()

    // console.log(response)

    // Add the AI response to DOM
    //renderTypewriterText(response.data.choices[0].message.content)

    // Add the AI response to converation array
    //conversationArr.push(response.data.choices[0].message)  

}


function renderTypewriterText(text) {
    const newSpeechBubble = document.createElement('div')
    newSpeechBubble.classList.add('speech', 'speech-ai', 'blinking-cursor')
    chatbotConversation.appendChild(newSpeechBubble)
    let i = 0
    const interval = setInterval(() => {
        newSpeechBubble.textContent += text.slice(i-1, i)
        if (text.length === i) {
            clearInterval(interval)
            newSpeechBubble.classList.remove('blinking-cursor')
        }
        i++
        chatbotConversation.scrollTop = chatbotConversation.scrollHeight
    }, 50)
}
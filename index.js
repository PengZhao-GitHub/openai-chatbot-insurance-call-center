import { Configuration, OpenAIApi } from 'openai'
import { process } from './env'


const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
})


const openai = new OpenAIApi(configuration)

const chatbotConversation = document.getElementById('chatbot-conversation')

/*
Challenge:
    1. Update the content property's value to change 
       the chatbot's personality.
*/
const conversationArr = [
    {
        role: 'system',
        //content: 'You are a highly knowledgeable assistant that is always happy to help. and you are humor and like to reply with jokes'       
        content: 'You are a proferssional insurance agent'       
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

    const response = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: conversationArr,
        presence_penalty: 0, 
        frequency_penalty: 0.3

    })

    // console.log(response)

    // Add the AI response to DOM
    renderTypewriterText(response.data.choices[0].message.content)

    // Add the AI response to converation array
    conversationArr.push(response.data.choices[0].message)  

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
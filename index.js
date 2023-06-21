const chatbotConversation = document.getElementById('chatbot-conversation')
const clearButton = document.getElementById('clear-btn')
const saveButton = document.getElementById('save-btn')

const conversationArr = []

saveButton.addEventListener('click', e => {
    e.preventDefault()

    console.log("Save the conversation as: ", conversationArr.slice(1))

})

clearButton.addEventListener('click', e => {
    e.preventDefault()
    conversationArr.splice(1)
    chatbotConversation.innerHTML = '<div class="speech speech-ai">How can I help you?</div>'

})

document.addEventListener('submit', async (e) => {
    e.preventDefault()
    const userInput = document.getElementById('user-input')

    const userInputObj = {
        role: 'user',
        content: userInput.value
    }
    
    conversationArr.push(userInputObj)

    console.log("User input:", userInputObj)

    const newSpeechBubble = document.createElement('div')
    newSpeechBubble.classList.add('speech', 'speech-human')
    chatbotConversation.appendChild(newSpeechBubble)
    newSpeechBubble.textContent = userInput.value
    userInput.value = ''
    chatbotConversation.scrollTop = chatbotConversation.scrollHeight

    const aiResponse = await fetchReply()
    console.log("AI response:", aiResponse)

    renderTypewriterText(aiResponse.content)
    conversationArr.push(aiResponse)  

})

async function fetchReply() {

    const url = 'https://cosmic-klepon-bad845.netlify.app/.netlify/functions/fetchAI'
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify(conversationArr),
    })

    const data = await response.json() // the response.json() method is used to parse the response body as JSON. 
    

    return data

    // renderTypewriterText(data.content)
    // conversationArr.push(data)  

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
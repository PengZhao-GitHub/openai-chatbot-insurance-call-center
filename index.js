const chatbotConversation = document.getElementById('chatbot-conversation')

const conversationArr = []

document.addEventListener('submit', (e) => {
    e.preventDefault()
    const userInput = document.getElementById('user-input')

    userInputObj = {
        role: 'user',
        content: userInput.value
    }
    
    conversationArr.push(userInputObj)

    console.log("User input:", userInputObj)

    fetchReply()

    const newSpeechBubble = document.createElement('div')
    newSpeechBubble.classList.add('speech', 'speech-human')
    chatbotConversation.appendChild(newSpeechBubble)
    newSpeechBubble.textContent = userInput.value
    userInput.value = ''
    chatbotConversation.scrollTop = chatbotConversation.scrollHeight
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
    console.log("AI response:", data)

    renderTypewriterText(data.content)
    conversationArr.push(data)  

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
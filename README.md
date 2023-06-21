# coa28453fbd547f14691eb135

Quick start:

```
$ npm install
$ npm start
````


To install the Netlify cli
  sudo  npm install netlify-cli -g

To initialise a netlify site
  sudo  netlify init 


result:
            (base) admin@admins-Air 12.insurance-call-center-GPT3.5-netlify % sudo netlify init

            Adding local .netlify folder to .gitignore file...
            ? What would you like to do? ⇄  Connect this directory to an existing Netlify site

            netlify link will connect this folder to a site on Netlify

            ? How do you want to link this folder to a site? Use current git remote origin (https://github.com/PengZhao-GitHub/openai-chatbo
            t-insurance-call-center)

            Looking for sites connected to 'https://github.com/PengZhao-GitHub/openai-chatbot-insurance-call-center'...


            Directory Linked

            Admin url: https://app.netlify.com/sites/cosmic-klepon-bad845
            Site url:  https://cosmic-klepon-bad845.netlify.app

            You can now run other `netlify` cli commands in this directory


            Success
            This site "cosmic-klepon-bad845" is configured to automatically deploy via https://github.com/PengZhao-GitHub/openai-chatbot-insurance-call-center


To setup a serverless function
    netlify functions:create

The url of your serverless function
    https://<YOUR-SITE-URL>.netlify.app/.netlify/functions/fetchAI

NOTE: Don't forget to push the change to GitHub




gpt-3.5 is better than fine-tuning in this case
------------------------------------------------
There could be several reasons why the quality of your fine-tuned model for the insurance call center is lower compared to using the GPT-3.5-turbo API directly. Here are a few possible explanations:

1. Training data: The quality of your fine-tuned model heavily relies on the quality and relevance of the training data you provided. If the training data is not representative of the specific domain and use case of insurance call centers, the model may not perform optimally. It's crucial to ensure that the training data is diverse, specific, and covers a range of scenarios and customer queries typically encountered in insurance call centers.

2. Fine-tuning process: Fine-tuning a language model requires careful configuration and experimentation. The performance of the fine-tuned model can be affected by factors such as the choice of hyperparameters, the amount of training data, the duration of training, and the evaluation process. It's possible that the fine-tuning process you employed did not yield the desired results. It may be worth revisiting the fine-tuning methodology and trying different approaches to improve the model's performance.

3. Overfitting: Fine-tuning a model involves training it on a specific dataset to adapt it to a particular task. If the fine-tuning process overfits the model to the training data, it may lose the ability to generalize well to unseen data. This can result in a decrease in the quality of responses when compared to the more general GPT-3.5-turbo API. Regularization techniques, such as dropout and weight decay, can help mitigate overfitting during fine-tuning.

4. Evaluation and feedback loop: It's important to evaluate the performance of the fine-tuned model during the training process and provide feedback to the model by comparing its responses to expected or desired responses. Continuous evaluation and iteration can help identify and address any issues or shortcomings in the model's performance. By iteratively refining the fine-tuned model based on feedback, you can enhance its quality over time.

5. Model architecture and capabilities: The GPT-3.5-turbo model used in the base API is already a powerful and versatile language model with a wide range of capabilities. It is designed to perform well across various tasks and domains. If the specific requirements of your insurance call center use case do not significantly benefit from fine-tuning or require domain-specific knowledge, using the base GPT-3.5-turbo API directly might indeed provide better results.

To improve the quality of your fine-tuned model, consider carefully curating and expanding your training data, experimenting with different fine-tuning approaches, evaluating the model's performance effectively, and iterating on the training process based on feedback.







-----------


const handler = async (event) => {

  try {
    const requestBody = event.body;
    return {
      statusCode: 200,
      body: JSON.stringify({ message: requestBody }),
    }
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}

module.exports = { handler }



--------------------

system: instruction excises 


you are the call center staff member of the insurance company - AIG Sonpo. You are able to provide customers the information about their insurance policies, assist customers in navigating the claims process and provide guidance on how to file a claim, offer prompt and efficient insurance quotes to customers based on their specific needs, and connect customers with appropriate insurance agents for more personalized assistance, or direct them to the customer portal for self-service option. 

please give clear, short and concise responses. 

###When customer asks for a quote:

Step 1:  ask what insurance product the customer is interested in

Step 2: Based on the selected product, ask related personal information and insured object information

Step 3: Converted the provided personal information and insured object information in to JSON format. for example:  { "name": "John Smith", "dob": "01/01/1980", "address": "123 Main St, Anytown USA", "vehicleModel": "Toyota Camry" }

Step 4: Call PAS system API to get the quotation information

Step 5: Return the quote result to customer 

###When customer want to file claims:

Step 1: ask customer the claims related information 

Step 2: Check if the policy exists based on the provided information 

Step 3: Provide customer the claims processes information

Step 4: Give customer the claims number  


###When customer want to check policy information 

Step 1: ask customer provide personal information, and policy number if customer knows

Step 2: Check policy administration system if the policy exist

Step 3: Tell customer the result 

Step 4: In case the policy exists, ask how customer want to receive the information - see the detail now, send it to customer by email, or go to customer portal 
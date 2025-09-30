# **==Local Models!!==**

![](resources/images/Local AI/1757069283879.webp)

## A quick rundown if you are new to all this.

### AI in Hillnote has 3 parts to it.

1.  **⛺️ Large Language Models (LLMs)** are AI systems trained on lots of text. They can understand and create text like humans, allowing them to answer questions, write creatively, and translate languages accurately. They mimic how we communicate. You can switch between a wide variety of AI systems available at [ollama.com/search](https://ollama.com/search) and [https://huggingface.co/models?library=gguf&sort=trending](https://huggingface.co/models?library=gguf&sort=trending)
    
2.  **🏕️ The Context:** This refers to the information and background the AI uses to best understand your requests and provide relevant answers.
    
3.  **👋🏽 The Prompts** represent the specific instructions and tasks you’ll be giving the LLM.
    

> ***Hillnote uses Ollama****, a tool that simplifies working with large language models. Essentially, Ollama provides a local "sandbox" where you can run various AI models. Hillnote lets you access this sandbox, allowing you to experiment with and use different LLMs directly.*
> 
> *You can learn more about Ollama at* [*ollama.com*](http://ollama.com)

* * *

## **Configuring your AI**

With Hillnote you can go beyond and configure your editor and the built-in AI to work exactly as you need it. You can have multiple models installed in Hillnote and switch between them seamlessly.

### **Add models**

You can add and choose between models in the AI tab. The handpicked tab covers some of my favourite models. You can browse the various sections and hopefully find something you like.  
![Pasted image](resources/images/Make it yours/1757064527325.webp)

### **Add more models**

Hillnote uses Ollama to run its AI features. Ollama is like a central hub for bringing pre-trained AI models – like Gemma, Phi or Llama – <color:#111827>directly</color> to your computer.  
![Pasted image](resources/images/Make it yours/1757064623628.webp)

Add models under AI Settings > Custom > Ollama models. Simply type the name as mentioned in [ollama.com/search](https://ollama.com/search).

### **Hugging face models**

[Huggingface.co](http://huggingface.co/) (Hugging Face) is like a central hub for all things Artificial Intelligence, specifically focusing on *language models*. Think of it like a giant toolbox filled with pre-trained AI models – these are essentially really smart computer programs that have already learned a *ton* about language from reading massive amounts of text.

**Here’s what makes it special:**

-   **Pre-trained Models:** They have models that can do amazing things like translate languages, write different kinds of creative content, answer your questions in an informative way, and even summarize text. The cool thing is, you don't have to train these models from scratch – they're ready to go!
    
-   **Hugging Face Hub:** This is their online platform where you can *find* these models, but also share your own! It's like a GitHub for AI models.
    
-   <color:#111827>**GGUF are formats** that allow you to run large language models – like those hosted on Hugging Face –</color> *locally* <color:#111827>on your computer, even if you don't have a super powerful GPU. Think of it like this: Hugging Face provides the</color> *brains* <color:#111827>(the pre-trained model), and GGML/GGUF provides the</color> *body* <color:#111827>– the way to run those brains efficiently.</color>
    

Add models under AI Settings > Custom > Huggingface models. You can run any **GGUF** model you find over at [huggingface.co/models?library=gguf](https://huggingface.co/models?library=gguf) by entering one of the following

-   Paste the full command: `ollama run hf.co/username/repository:quantization`
    
-   Or just the path: `username/repository-name`
    
-   Or full URL: `https://huggingface.co/username/repository`
    

### **Switch models**

Switch between models under AI settings. The active model denotes which model all the queries will be directed to.

![Pasted image](resources/images/Make it yours/1757064764789.webp)

### **Temperature**

Temperature helps determine the models creativity. Lower values (0.0) make the output more focused and deterministic, while higher values (2.0) make it more creative and varied.  
![Pasted image](resources/images/Make it yours/1757064571389.webp)

## **Providing Context**

### **Add context**

Add context to a prompt from another document by mentioning it using the ‘@’ key. You should see a dialog to help select the document.

![Pasted image](resources/images/Make it yours/1757064913444.webp)

## **Customise your preset prompts**

![Pasted image](resources/images/Make it yours/1757065141007.webp)You can custom prompts to the preset list by doing so under settings within custom prompts. These can be tailored to be specific to you.

![Pasted image](resources/images/Make it yours/1757065072615.webp)

There are a couple of Prompt crafting websites online - do consult with them 🙂

## **Change the system Prompts**

System prompts can be modified within Hillnote settings. This allows you to fundamentally change the Role and the core response structure of the AI model

![Pasted image](resources/images/Make it yours/1757065179674.webp)

## **Add recipes for AI models to understand tasks better**

Recipes act as detailed guides that combine multiple elements, such as reference documents and instructions. This structured approach allows you to modify content while capturing specific phrases that provide extra context for consistent usage.[^1]

![Pasted image](resources/images/Make it yours/1757065243314.webp)

* * *

## **A quick note on Performance**

**There is no performance hit from having multiple models installed** because only a single model is run at any given time in Hillnote:

1.  Only one model is loaded into memory at a time
    
2.  Models are stored on disk and only loaded when needed
    
3.  The Ollama server manages memory efficiently by loading only the active model
    
4.  When switching models, the previous model is unloaded before loading the new one
    

**Hillnote’s performance depends on your computer’s RAM, GPU and CPU**. The ideal LLM size you use is directly tied to your machine’s specifications. While we offer helpful indicators, a good starting point is to consider is the below table

| **Model Parameters** | **Minimum RAM** | **Recommended RAM** | **GPU** | **CPU** |
| --- | --- | --- | --- | --- |
| 1B | 4GB | 8GB | 2GB | Most modern CPU's |
| 3B | 4GB | 8GB | 2GB | Most modern CPU's |
| 4B | 8GB | 16GB | 4GB | Most modern CPU's |
| 7B | 8GB | 16GB | 4GB | Most modern CPU's |
| 8B | 16GB | 32GB | 8GB | Most modern CPU's |
| 10B | 24GB | 48GB | 12GB | High end CPU |
| 20B | 48GB | 64GB | 24GB | High end CPU |
| 70B | 128GB | 256GB | 80GB | Server grade CPU |

## **Importing and Exporting templates**

Export template is an option available under Hillnote settings. This exports all of your AI configurations and files you may have saved. This provides a clean template to then share, Import and use across multiple instances of Hillnote.

The following configurations are exported in a template

1.  Documents (structures and templates)
    
2.  All custom prompts that have been configured
    

You can import a template under Hillnote settings.

<!-- COMMENTS_SECTION_START -->
<!-- COMMENT
{"name":"Rajath Bail","email":"rajath@hillnote.com","timestamp":"2025-09-05T09:43:00.984Z","id":"comment_2025-09-05T09:43:00.984Z_ou48par4z","parentId":null}
-->
The recipe feature described in [1] is still in infancy right now and is being expanded on slowly. 

<!-- COMMENTS_SECTION_END -->
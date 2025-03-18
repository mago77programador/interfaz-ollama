const promptInput = document.getElementById('prompt-input');
const submitBtn = document.getElementById('submit-btn');
const modelSelect = document.getElementById('model-select');
const reasoningDisplay = document.getElementById('reasoning-display');
const responseDisplay = document.getElementById('response-display');

// Fetch available models from OLLama
fetch('http://localhost:11434/api/tags')
  .then(response => response.json())
  .then(data => {
    const models = data.models;
    models.forEach(model => {
      const option = document.createElement('option');
      option.value = model.name;
      option.text = model.name;
      modelSelect.add(option);
    });
  })
  .catch(error => {
    console.error('Error fetching models:', error);
  });

submitBtn.addEventListener('click', async () => {
  const prompt = promptInput.value.trim();
  const selectedModel = modelSelect.value;
  if (!prompt || !selectedModel) return;

  try {
    submitBtn.disabled = true;
    reasoningDisplay.textContent = 'Thinking...';
    responseDisplay.textContent = 'Generating response...';

    const apiResponse = await fetch('http://localhost:11434/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: selectedModel,
        messages: [{ role: 'user', content: prompt }],
        stream: false
      })
    });

    const data = await apiResponse.json();
    
    // Extraer contenido entre etiquetas <think>
    const content = data.message?.content || '';
    const thinkMatch = content.match(/<think>([\s\S]*?)<\/think>/);
    
    // Separar razonamiento y respuesta
    const reasoning = thinkMatch ? thinkMatch[1].trim() : '';
    const responseText = thinkMatch ? content.replace(/<think>[\s\S]*?<\/think>/, '').trim() : content.trim();
    
    reasoningDisplay.textContent = reasoning;
    responseDisplay.textContent = responseText;
  } catch (error) {
    console.error('Error:', error);
    responseDisplay.textContent = 'Error processing request';
  } finally {
    submitBtn.disabled = false;
  }
});
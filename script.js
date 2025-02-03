const promptInput = document.getElementById('prompt-input');
const submitBtn = document.getElementById('submit-btn');
const reasoningDisplay = document.getElementById('reasoning-display');
const responseDisplay = document.getElementById('response-display');

const defaultModel = 'deepseek-r1:8b';

submitBtn.addEventListener('click', async () => {
  const prompt = promptInput.value.trim();
  if (!prompt) return;

  try {
    submitBtn.disabled = true;
    reasoningDisplay.textContent = 'Pensando...';
    responseDisplay.textContent = 'Generando respuesta...';

    const apiResponse = await fetch('http://localhost:11434/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: defaultModel,
        messages: [{ role: 'user', content: prompt }],
        stream: false
      })
    });

    const data = await apiResponse.json();
    console.log('Response:', data);
    
    // Extraer contenido entre etiquetas <think>
    const content = data.message?.content || '';
    const thinkMatch = content.match(/<think>([\s\S]*?)<\/think>/);
    
    // Separar razonamiento y respuesta
    const reasoning = thinkMatch ? thinkMatch[1].trim() : '';
    const responseText = content.replace(/<think>[\s\S]*?<\/think>/, '').trim();
    
    reasoningDisplay.textContent = reasoning;
    responseDisplay.textContent = responseText;
  } catch (error) {
    console.error('Error:', error);
    responseDisplay.textContent = 'Error al procesar la solicitud';
  } finally {
    submitBtn.disabled = false;
  }
});
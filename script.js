// Fetch available models from OLLama
fetch('http://localhost:8000/models')
  .then(response => response.json())
  .then(models => {
    const modelSelect = document.getElementById('model-select');
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

// Handle prompt submission
const promptInput = document.getElementById('prompt-input');
const submitBtn = document.getElementById('submit-btn');
const reasoningDisplay = document.getElementById('reasoning-display');
const responseDisplay = document.getElementById('response-display');

submitBtn.addEventListener('click', () => {
  const prompt = promptInput.value.trim();
  if (prompt) {
    const selectedModel = document.getElementById('model-select').value;
    fetch(`http://localhost:8000/generate?model=${selectedModel}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ prompt })
    })
    .then(response => response.json())
    .then(data => {
      reasoningDisplay.textContent = data.reasoning;
      responseDisplay.textContent = data.response;
    })
    .catch(error => {
      console.error('Error generating response:', error);
    });
  }
});

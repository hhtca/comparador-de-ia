// --- CONFIGURAÇÃO DOS MODELOS (Padrão Oficial Google AI Studio) ---
const MODELS = {
    // O modelo padrão gratuito atual é o 1.5 Flash
    gemini: 'gemini-1.5-flash', 
    
    // Groq: Llama 3.3 (Smart)
    groqSmart: 'llama-3.3-70b-versatile', 
    
    // Groq: Llama 3.1 (Fast)
    groqFast: 'llama-3.1-8b-instant'
};

document.addEventListener('DOMContentLoaded', () => {
    const promptInput = document.getElementById('prompt-input');
    const sendBtn = document.getElementById('send-btn');
    const configBtn = document.getElementById('config-btn');
    const modal = document.getElementById('config-modal');
    const saveKeysBtn = document.getElementById('save-keys');

    // Carrega chaves salvas
    loadKeys();

    // -- Modal Config --
    configBtn.onclick = () => modal.classList.remove('hidden');
    
    saveKeysBtn.onclick = () => {
        // .trim() é vital para evitar erros de "Not Found" por espaço vazio
        const geminiVal = document.getElementById('gemini-key').value.trim();
        const groqVal = document.getElementById('groq-key').value.trim();
        
        if(geminiVal) localStorage.setItem('gemini_key', geminiVal);
        if(groqVal) localStorage.setItem('groq_key', groqVal);
        
        modal.classList.add('hidden');
        alert('Chaves salvas! Tente disparar novamente.');
    };

    // -- Botão Enviar --
    sendBtn.onclick = async () => {
        const prompt = promptInput.value;
        if (!prompt) return alert('Digite um prompt!');

        // Recupera as chaves limpas
        const geminiKey = localStorage.getItem('gemini_key');
        const groqKey = localStorage.getItem('groq_key');

        if (!geminiKey || !groqKey) {
            alert('Configure as chaves API primeiro no botão de engrenagem!');
            modal.classList.remove('hidden');
            return;
        }

        // Resetar UI e Timers
        setLoading('gemini', 'Gemini 1.5 Flash');
        setLoading('groq1', 'Llama 3.3 (Smart)');
        setLoading('groq2', 'Llama 3.1 (Fast)');

        // Disparar requisições em paralelo
        fetchGemini(prompt, geminiKey);
        fetchGroq(prompt, groqKey, MODELS.groqSmart, 'groq1');
        fetchGroq(prompt, groqKey, MODELS.groqFast, 'groq2');
    };

    function loadKeys() {
        document.getElementById('gemini-key').value = localStorage.getItem('gemini_key') || '';
        document.getElementById('groq-key').value = localStorage.getItem('groq_key') || '';
    }

    function setLoading(id, name) {
        document.getElementById(`output-${id}`).innerHTML = `
            <div style="text-align:center; padding:20px; opacity:0.6; color: #89b4fa;">
                ⏳ Consultando <b>${name}</b>...
            </div>`;
        document.getElementById(`timer-${id}`).innerText = '--';
    }

    function updateResult(id, text, startTime) {
        const contentDiv = document.getElementById(`output-${id}`);
        try {
            contentDiv.innerHTML = marked.parse(text);
        } catch (e) {
            contentDiv.innerText = text;
        }
        const duration = ((performance.now() - startTime) / 1000).toFixed(2);
        const timerEl = document.getElementById(id === 'gemini' ? 'timer-gemini' : (id === 'groq1' ? 'timer-groq1' : 'timer-groq2'));
        if(timerEl) timerEl.innerText = `${duration}s`;
    }

    function showError(id, msg) {
        document.getElementById(`output-${id}`).innerHTML = `
            <div style="color: #ff8888; border: 1px solid #ff5555; background: rgba(255,0,0,0.1); padding: 10px; border-radius: 5px; font-size: 0.85rem;">
                ⚠️ <b>Erro:</b> ${msg}
            </div>`;
    }

    // --- GOOGLE GEMINI (Endpoint V1BETA + MODELO FLASH) ---
    async function fetchGemini(prompt, apiKey) {
        const start = performance.now();
        try {
            // Esta é a URL exata da documentação oficial para Free Tier
            const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODELS.gemini}:generateContent?key=${apiKey}`;
            
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
            });

            const data = await response.json();
            
            if (data.error) {
                // Tratamento de erro detalhado
                let errorMsg = data.error.message;
                if(errorMsg.includes('API key not valid')) errorMsg = "Sua chave API está inválida.";
                if(errorMsg.includes('not found')) errorMsg = "O modelo Flash não está ativado na sua chave ou região.";
                throw new Error(errorMsg);
            }

            const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "Sem resposta.";
            updateResult('gemini', text, start);
        } catch (error) {
            showError('gemini', error.message);
        }
    }

    // --- GROQ (Llama) ---
    async function fetchGroq(prompt, apiKey, model, elementId) {
        const start = performance.now();
        try {
            const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    messages: [{ role: 'user', content: prompt }],
                    model: model,
                    temperature: 0.7
                })
            });

            const data = await response.json();

            if (data.error) {
                if (data.error.code === 'model_not_found') {
                    throw new Error(`Modelo descontinuado pela Groq.`);
                }
                throw new Error(data.error.message);
            }

            const text = data.choices?.[0]?.message?.content || "Sem resposta.";
            updateResult(elementId, text, start);
        } catch (error) {
            showError(elementId, error.message);
        }
    }
});

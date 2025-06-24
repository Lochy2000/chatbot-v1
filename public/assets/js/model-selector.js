// Model Selector Component
class ModelSelector {
    constructor(containerId, initialModel = 'gemini-1.5-flash') {
        this.container = document.getElementById(containerId);
        this.selectedModel = initialModel;
        this.onModelChange = null;
        this.models = {
            'gemini-1.5-flash': { name: 'Gemini 1.5 Flash', provider: 'gemini', description: 'Fast & efficient' },
            'gemini-1.5-pro': { name: 'Gemini 1.5 Pro', provider: 'gemini', description: 'More capable' },
            'kimi-vl-thinking': { name: 'Kimi VL Thinking', provider: 'openrouter', description: 'Visual reasoning' },
            'llama-4-scout': { name: 'Llama 4 Scout', provider: 'openrouter', description: 'Latest Llama' },
            'llama-4-maverick': { name: 'Llama 4 Maverick', provider: 'openrouter', description: 'Advanced Llama' },
            'gemini-2.5-pro': { name: 'Gemini 2.5 Pro', provider: 'openrouter', description: 'Experimental' },
            'minimax-m1': { name: 'MiniMax M1', provider: 'openrouter', description: 'Compact model' },
            'minimax-m1-extended': { name: 'MiniMax M1 Extended', provider: 'openrouter', description: 'Extended context' },
            'mistral-small': { name: 'Mistral Small', provider: 'openrouter', description: 'Efficient French AI' },
            'deepseek-v3': { name: 'DeepSeek V3', provider: 'openrouter', description: 'Code specialist' },
            'deepseek-r1': { name: 'DeepSeek R1', provider: 'openrouter', description: 'Reasoning model' }
        };
        this.render();
    }

    render() {
        const modelOptions = Object.entries(this.models).map(([key, model]) => `
            <div class="model-option ${key === this.selectedModel ? 'selected' : ''}" 
                 data-model="${key}" 
                 title="${model.description}">
                <div class="model-name">${model.name}</div>
                <div class="model-provider provider-${model.provider}">${model.provider}</div>
            </div>
        `).join('');

        this.container.innerHTML = `
            <div class="model-selector">
                <h4>🤖 Choose AI Model</h4>
                <div class="model-grid">
                    ${modelOptions}
                </div>
            </div>
        `;

        this.attachEventListeners();
    }

    attachEventListeners() {
        const options = this.container.querySelectorAll('.model-option');
        options.forEach(option => {
            option.addEventListener('click', () => {
                // Remove previous selection
                options.forEach(opt => opt.classList.remove('selected'));
                
                // Add selection to clicked option
                option.classList.add('selected');
                
                // Update selected model
                this.selectedModel = option.dataset.model;
                
                // Trigger callback if set
                if (this.onModelChange) {
                    this.onModelChange(this.selectedModel);
                }
            });
        });
    }

    getSelectedModel() {
        return this.selectedModel;
    }

    setModel(modelKey) {
        if (this.models[modelKey]) {
            this.selectedModel = modelKey;
            this.render();
        }
    }

    onModelChangeCallback(callback) {
        this.onModelChange = callback;
    }
}

// Helper function to create model selector
function createModelSelector(containerId, initialModel, onChangeCallback) {
    const selector = new ModelSelector(containerId, initialModel);
    if (onChangeCallback) {
        selector.onModelChangeCallback(onChangeCallback);
    }
    return selector;
}
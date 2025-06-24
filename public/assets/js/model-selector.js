// Model Selector Component
class ModelSelector {
    constructor(containerId, initialModel = 'gemini-1.5-flash') {
        this.container = document.getElementById(containerId);
        this.selectedModel = initialModel;
        this.onModelChange = null;
        this.models = {
            'gemini-1.5-flash': { name: 'Gemini 1.5 Flash', provider: 'gemini', description: 'Fast & efficient' },
            'gemini-1.5-pro': { name: 'Gemini 1.5 Pro', provider: 'gemini', description: 'More capable' },
            'claude-3.5-sonnet': { name: 'Claude 3.5 Sonnet', provider: 'openrouter', description: 'Anthropic\'s best' },
            'gpt-4o': { name: 'GPT-4o', provider: 'openrouter', description: 'OpenAI flagship' },
            'gpt-4o-mini': { name: 'GPT-4o Mini', provider: 'openrouter', description: 'Fast & affordable' },
            'llama-3.1-70b': { name: 'Llama 3.1 70B', provider: 'openrouter', description: 'Meta\'s latest' },
            'claude-3-haiku': { name: 'Claude 3 Haiku', provider: 'openrouter', description: 'Fast Claude' }
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
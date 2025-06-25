// Compact Model Selector Component
class ModelSelector {
    constructor(containerId, initialModel = 'gemini-1.5-flash') {
        this.container = document.getElementById(containerId);
        this.selectedModel = initialModel;
        this.onModelChange = null;
        this.models = {
            'gemini-1.5-flash': { name: 'Gemini 1.5 Flash', provider: 'gemini', description: 'Fast & reliable' },
            'gemini-1.5-pro': { name: 'Gemini 1.5 Pro', provider: 'gemini', description: 'More capable' },
            'llama-4-scout': { name: 'Llama 4 Scout', provider: 'openrouter', description: 'Latest Llama' },
            'llama-4-maverick': { name: 'Llama 4 Maverick', provider: 'openrouter', description: 'Advanced Llama' },
            'deepseek-v3': { name: 'DeepSeek V3', provider: 'openrouter', description: 'Code specialist' },
            'deepseek-r1': { name: 'DeepSeek R1', provider: 'openrouter', description: 'Reasoning model' },
            'gemini-2.5-pro': { name: 'Gemini 2.5 Pro Exp', provider: 'openrouter', description: 'Experimental' },
            'mistral-small': { name: 'Mistral Small', provider: 'openrouter', description: 'Efficient AI' }
        };
        this.render();
    }

    render() {
        const modelOptions = Object.entries(this.models).map(([key, model]) => 
            `<option value="${key}" ${key === this.selectedModel ? 'selected' : ''}>
                ${model.name} (${model.provider})
            </option>`
        ).join('');

        const currentModel = this.models[this.selectedModel];

        this.container.innerHTML = `
            <div class="model-selector">
                <div class="model-dropdown">
                    <select class="model-select" id="model-select-${this.container.id}">
                        ${modelOptions}
                    </select>
                </div>
                <div class="model-info">
                    <span class="current-provider provider-${currentModel.provider}">
                        ${currentModel.provider}
                    </span>
                    <span class="model-status">🤖 ${currentModel.description}</span>
                </div>
            </div>
        `;

        this.attachEventListeners();
    }

    attachEventListeners() {
        const select = this.container.querySelector('.model-select');
        if (select) {
            select.addEventListener('change', (e) => {
                this.selectedModel = e.target.value;
                this.updateModelInfo();
                
                // Trigger callback if set
                if (this.onModelChange) {
                    this.onModelChange(this.selectedModel);
                }
            });
        }
    }

    updateModelInfo() {
        const currentModel = this.models[this.selectedModel];
        const providerSpan = this.container.querySelector('.current-provider');
        const statusSpan = this.container.querySelector('.model-status');
        
        if (providerSpan && statusSpan) {
            providerSpan.className = `current-provider provider-${currentModel.provider}`;
            providerSpan.textContent = currentModel.provider;
            statusSpan.textContent = `🤖 ${currentModel.description}`;
        }
    }

    getSelectedModel() {
        return this.selectedModel;
    }

    setModel(modelKey) {
        if (this.models[modelKey]) {
            this.selectedModel = modelKey;
            const select = this.container.querySelector('.model-select');
            if (select) {
                select.value = modelKey;
                this.updateModelInfo();
            }
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
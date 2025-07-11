/**
 * Bot Comparison Modal
 * Allows users to compare different bots side by side
 */

class BotComparison {
    constructor() {
        this.selectedBots = [];
        this.maxBots = 3;
        this.init();
    }

    init() {
        this.createComparisonButton();
        this.setupBotSelection();
        this.createComparisonModal();
    }

    createComparisonButton() {
        // Temporarily disabled - we'll implement a better UX later
        return;
        
        const button = document.createElement('button');
        button.className = 'comparison-button';
        button.innerHTML = `
            <span class="comparison-icon">⚖️</span>
            <span class="comparison-text">Compare Bots</span>
            <span class="comparison-count">0</span>
        `;
        
        // Position it floating on the right side
        document.body.appendChild(button);
        
        button.addEventListener('click', () => {
            this.openComparisonModal();
        });

        this.addComparisonButtonStyles();
    }

    addComparisonButtonStyles() {
        const styles = `
            .comparison-button {
                position: fixed;
                right: 2rem;
                bottom: 2rem;
                background: var(--purple-glow);
                border: none;
                border-radius: 50px;
                padding: 1rem 1.5rem;
                color: white;
                font-weight: 600;
                cursor: pointer;
                z-index: 1000;
                display: flex;
                align-items: center;
                gap: 0.5rem;
                box-shadow: 0 8px 30px rgba(139, 92, 246, 0.4);
                transition: all 0.3s ease;
                backdrop-filter: blur(10px);
            }

            .comparison-button:hover {
                transform: translateY(-3px);
                box-shadow: 0 12px 40px rgba(139, 92, 246, 0.6);
            }

            .comparison-count {
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                width: 24px;
                height: 24px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 0.8rem;
                font-weight: 700;
            }

            .comparison-checkbox {
                position: absolute;
                top: 1rem;
                left: 1rem;
                width: 20px;
                height: 20px;
                z-index: 5;
                cursor: pointer;
                accent-color: #8b5cf6;
            }

            .comparison-modal {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0, 0, 0, 0.8);
                backdrop-filter: blur(10px);
                z-index: 2000;
                display: none;
                align-items: center;
                justify-content: center;
                padding: 2rem;
            }

            .comparison-content {
                background: var(--dark-bg);
                border: 1px solid var(--border-color);
                border-radius: 20px;
                max-width: 1200px;
                width: 100%;
                max-height: 90vh;
                overflow-y: auto;
                position: relative;
            }

            .comparison-header {
                padding: 2rem;
                border-bottom: 1px solid var(--border-color);
                display: flex;
                justify-content: space-between;
                align-items: center;
            }

            .comparison-close {
                background: none;
                border: none;
                color: var(--text-secondary);
                font-size: 1.5rem;
                cursor: pointer;
                transition: color 0.3s ease;
            }

            .comparison-close:hover {
                color: var(--text-primary);
            }

            .comparison-table {
                width: 100%;
                border-collapse: collapse;
            }

            .comparison-table th,
            .comparison-table td {
                padding: 1.5rem;
                text-align: left;
                border-bottom: 1px solid var(--border-color);
            }

            .comparison-table th {
                background: var(--glass-bg);
                font-weight: 600;
                position: sticky;
                top: 0;
                z-index: 10;
            }

            .bot-comparison-card {
                text-align: center;
                padding: 1rem;
            }

            .bot-comparison-icon {
                width: 48px;
                height: 48px;
                margin: 0 auto 1rem;
                border-radius: 12px;
            }

            @media (max-width: 768px) {
                .comparison-button {
                    right: 1rem;
                    bottom: 1rem;
                    padding: 0.75rem 1rem;
                }

                .comparison-text {
                    display: none;
                }

                .comparison-modal {
                    padding: 1rem;
                }

                .comparison-content {
                    max-height: 95vh;
                }

                .comparison-header {
                    padding: 1rem;
                }

                .comparison-table th,
                .comparison-table td {
                    padding: 1rem 0.5rem;
                    font-size: 0.9rem;
                }
            }
        `;

        const styleSheet = document.createElement('style');
        styleSheet.textContent = styles;
        document.head.appendChild(styleSheet);
    }

    setupBotSelection() {
        // Temporarily disable bot selection checkboxes
        // We'll implement a better UX for comparison later
        return;
        
        const botCards = document.querySelectorAll('.bot-card');
        
        botCards.forEach((card, index) => {
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.className = 'comparison-checkbox';
            checkbox.dataset.botIndex = index;
            
            checkbox.addEventListener('change', (e) => {
                this.handleBotSelection(e, card);
            });
            
            card.style.position = 'relative';
            card.appendChild(checkbox);
        });
    }

    handleBotSelection(event, card) {
        const checkbox = event.target;
        const botData = this.extractBotData(card);
        
        if (checkbox.checked) {
            if (this.selectedBots.length < this.maxBots) {
                this.selectedBots.push(botData);
                card.style.border = '2px solid #8b5cf6';
            } else {
                checkbox.checked = false;
                alert(`You can only compare up to ${this.maxBots} bots at once.`);
            }
        } else {
            this.selectedBots = this.selectedBots.filter(bot => bot.name !== botData.name);
            card.style.border = '';
        }
        
        this.updateComparisonButton();
    }

    extractBotData(card) {
        const title = card.querySelector('.bot-title')?.textContent || '';
        const description = card.querySelector('.bot-description')?.textContent || '';
        const features = Array.from(card.querySelectorAll('.feature-tag')).map(tag => tag.textContent);
        const icon = card.querySelector('.bot-icon img')?.src || card.querySelector('.bot-icon span')?.textContent || '';
        const badge = card.querySelector('.status-badge')?.textContent || '';
        
        return {
            name: title,
            description,
            features,
            icon,
            badge
        };
    }

    updateComparisonButton() {
        const button = document.querySelector('.comparison-button');
        const count = button.querySelector('.comparison-count');
        count.textContent = this.selectedBots.length;
        
        button.style.display = this.selectedBots.length > 0 ? 'flex' : 'none';
    }

    createComparisonModal() {
        const modal = document.createElement('div');
        modal.className = 'comparison-modal';
        modal.innerHTML = `
            <div class="comparison-content">
                <div class="comparison-header">
                    <h2>Bot Comparison</h2>
                    <button class="comparison-close">×</button>
                </div>
                <div class="comparison-body">
                    <table class="comparison-table">
                        <thead>
                            <tr>
                                <th>Feature</th>
                                <th colspan="3">Selected Bots</th>
                            </tr>
                        </thead>
                        <tbody class="comparison-tbody">
                        </tbody>
                    </table>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        modal.querySelector('.comparison-close').addEventListener('click', () => {
            this.closeComparisonModal();
        });
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.closeComparisonModal();
            }
        });
    }

    openComparisonModal() {
        if (this.selectedBots.length === 0) return;
        
        const modal = document.querySelector('.comparison-modal');
        const tbody = modal.querySelector('.comparison-tbody');
        
        tbody.innerHTML = this.generateComparisonTable();
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }

    closeComparisonModal() {
        const modal = document.querySelector('.comparison-modal');
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }

    generateComparisonTable() {
        let html = '';
        
        // Bot headers
        html += '<tr><td><strong>Bot</strong></td>';
        this.selectedBots.forEach(bot => {
            html += `
                <td>
                    <div class="bot-comparison-card">
                        ${bot.icon.includes('http') ? 
                            `<img src="${bot.icon}" alt="${bot.name}" class="bot-comparison-icon">` : 
                            `<div class="bot-comparison-icon" style="font-size: 32px; display: flex; align-items: center; justify-content: center;">${bot.icon}</div>`
                        }
                        <h4>${bot.name}</h4>
                        <span class="status-badge" style="position: static; margin-top: 0.5rem;">${bot.badge}</span>
                    </div>
                </td>
            `;
        });
        html += '</tr>';
        
        // Description row
        html += '<tr><td><strong>Description</strong></td>';
        this.selectedBots.forEach(bot => {
            html += `<td>${bot.description}</td>`;
        });
        html += '</tr>';
        
        // Features row
        html += '<tr><td><strong>Key Features</strong></td>';
        this.selectedBots.forEach(bot => {
            html += `<td><ul style="list-style: none; padding: 0;">`;
            bot.features.forEach(feature => {
                html += `<li style="margin-bottom: 0.5rem; padding: 0.25rem 0.5rem; background: rgba(139, 92, 246, 0.1); border-radius: 8px; font-size: 0.85rem;">${feature}</li>`;
            });
            html += '</ul></td>';
        });
        html += '</tr>';
        
        return html;
    }
}

// Initialize bot comparison when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new BotComparison();
});

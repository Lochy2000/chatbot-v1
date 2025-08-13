// Simple page fade transitions
(function() {
	function injectStyles() {
		const css = `
			@keyframes pt-fade-in { from { opacity: 0 } to { opacity: 1 } }
			@keyframes pt-fade-out { from { opacity: 1 } to { opacity: 0 } }
			body.pt-enter { animation: pt-fade-in 220ms ease forwards }
			body.pt-exit { animation: pt-fade-out 180ms ease forwards }
		`;
		const style = document.createElement('style');
		style.textContent = css;
		document.head.appendChild(style);
	}

	function isInternalLink(a) {
		if (!a || a.target === '_blank' || a.hasAttribute('download')) return false;
		const href = a.getAttribute('href');
		if (!href || href.startsWith('#') || href.startsWith('javascript:')) return false;
		try {
			const url = new URL(href, window.location.href);
			return url.origin === window.location.origin;
		} catch { return false; }
	}

	document.addEventListener('DOMContentLoaded', () => {
		injectStyles();
		// Enter animation
		document.body.classList.add('pt-enter');

		// Exit animation on internal navigations
		document.addEventListener('click', (e) => {
			const a = e.target.closest('a');
			if (!isInternalLink(a)) return;
			e.preventDefault();
			const href = a.getAttribute('href');
			document.body.classList.remove('pt-enter');
			document.body.classList.add('pt-exit');
			setTimeout(() => { window.location.href = href; }, 160);
		});
	});
})(); 
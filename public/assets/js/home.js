// Scroll restoration to top on first visit
if ('scrollRestoration' in history) { history.scrollRestoration = 'manual'; }
window.addEventListener('load', () => {
	if (!sessionStorage.getItem('startedAtTop')) {
		window.scrollTo(0, 0);
		sessionStorage.setItem('startedAtTop', '1');
	}
});

// Reveal on view + staged featured chat
(function(){
	document.addEventListener('DOMContentLoaded', () => {
		const els = document.querySelectorAll('.reveal');
		const io = new IntersectionObserver((entries) => {
			entries.forEach(e => {
				if (e.isIntersecting && e.intersectionRatio > 0.4) {
					e.target.classList.add('in-view');
					if (e.target.id === 'bots') {
						const rows = e.target.querySelectorAll('.featured-mini .row');
						rows.forEach((row, idx) => setTimeout(() => row.classList.add('show'), 250 + idx * 350));
					}
				} else {
					e.target.classList.remove('in-view');
				}
			});
		}, { threshold: [0, 0.4, 1], rootMargin: '-10% 0px -10% 0px' });
		els.forEach(el => io.observe(el));
	});
})();

// Hero typing loop
(function(){
	const el = document.getElementById('hero-typing');
	if (!el) return;
	const cursor = '│';
	const phrases = [
		'Hello and welcome',
		'This is a demo site showing how AI can be used.',
		'Browse specialized bots for real examples',
		'See models like Llama 4, DeepSeek R1, and Gemini',
		'Open a bot to try a live chat demo'
	];
	let index = 0;
	function typePhrase(text, cb){
		let i = 0; el.textContent = cursor;
		const id = setInterval(()=>{ el.textContent = text.slice(0, i++) + cursor; if (i > text.length){ clearInterval(id); setTimeout(cb, 900); } }, 55);
	}
	function backspace(cb){
		const current = el.textContent.replace(cursor,''); let i = current.length;
		const id = setInterval(()=>{ el.textContent = current.slice(0, --i) + cursor; if (i <= 0){ clearInterval(id); setTimeout(cb, 250); } }, 22);
	}
	function cycle(){ typePhrase(phrases[index % phrases.length], ()=> backspace(()=>{ index++; cycle(); })); }
	setTimeout(cycle, 300);
})(); 

// ----- Home page inline behaviors migrated -----

document.addEventListener('DOMContentLoaded', function() {
	initializeAnimations();
	initializeNavigation();
	initializeBotCards();
	initializeModelCarousel();
});

function initializeAnimations() {
	const orbs = document.querySelectorAll('.gradient-orb');
	orbs.forEach((orb, index) => { orb.style.animationDelay = `${index * 2}s`; });

	const observer = new IntersectionObserver((entries) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				entry.target.style.opacity = '1';
				entry.target.style.transform = 'translateY(0)';
			}
		});
	}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

	const animateElements = document.querySelectorAll('.bot-card, .point, .section-title');
	animateElements.forEach(el => {
		el.style.opacity = '0';
		el.style.transform = 'translateY(30px)';
		el.style.transition = 'all 0.6s ease';
		observer.observe(el);
	});
}

function initializeNavigation() {
	document.querySelectorAll('a[href^="#"]').forEach(anchor => {
		anchor.addEventListener('click', function (e) {
			e.preventDefault();
			const target = document.querySelector(this.getAttribute('href'));
			if (target) target.scrollIntoView({ behavior:'smooth', block:'start' });
		});
	});

	window.addEventListener('scroll', () => {
		const nav = document.querySelector('.nav');
		if (!nav) return;
		if (window.scrollY > 100) {
			nav.style.background = 'rgba(10, 10, 15, 0.9)';
			nav.style.backdropFilter = 'blur(10px)';
			nav.style.borderBottom = '1px solid rgba(255, 255, 255, 0.1)';
		} else {
			nav.style.background = 'transparent';
			nav.style.backdropFilter = 'none';
			nav.style.borderBottom = 'none';
		}
	});
}

function initializeBotCards() {
	const botCards = document.querySelectorAll('.bot-card');
	botCards.forEach(card => {
		card.addEventListener('mouseenter', () => {
			card.style.transform = 'translateY(-8px) scale(1.02)';
			const demoMessages = card.querySelectorAll('.demo-message');
			demoMessages.forEach((msg, index) => {
				setTimeout(() => { msg.style.opacity = '1'; msg.style.transform = 'translateY(0)'; }, index * 400 + 200);
			});
		});
		card.addEventListener('mouseleave', () => {
			card.style.transform = 'translateY(0) scale(1)';
			const demoMessages = card.querySelectorAll('.demo-message');
			demoMessages.forEach(msg => { msg.style.opacity = '0'; msg.style.transform = 'translateY(20px)'; });
		});
		card.addEventListener('click', (e) => {
			if (e.target.classList.contains('bot-link') || e.target.classList.contains('try-button') || e.target.closest('.bot-link') || e.target.closest('.try-button')) return;
			if (window.innerWidth <= 768) {
				e.preventDefault();
				card.classList.toggle('mobile-preview');
				const demoMessages = card.querySelectorAll('.demo-message');
				if (card.classList.contains('mobile-preview')) {
					demoMessages.forEach((msg, index) => { setTimeout(() => { msg.style.opacity = '1'; msg.style.transform = 'translateY(0)'; }, index * 300); });
				} else {
					demoMessages.forEach(msg => { msg.style.opacity = '0'; msg.style.transform = 'translateY(20px)'; });
				}
			} else {
				const link = card.querySelector('.bot-link');
				if (link) window.location.href = link.href;
			}
		});
		const demoMessages = card.querySelectorAll('.demo-message');
		demoMessages.forEach(msg => { msg.style.opacity = '0'; msg.style.transform = 'translateY(20px)'; msg.style.transition = 'all 0.6s ease'; });
	});
	// Close mobile previews when clicking outside
	document.addEventListener('click', (e) => {
		if (!e.target.closest('.bot-card')) {
			const mobileCards = document.querySelectorAll('.bot-card.mobile-preview');
			mobileCards.forEach(card => {
				card.classList.remove('mobile-preview');
				const demoMessages = card.querySelectorAll('.demo-message');
				demoMessages.forEach(msg => { msg.style.opacity = '0'; msg.style.transform = 'translateY(20px)'; });
			});
		}
	});
}

function initializeModelCarousel() {
	const modelsTrack = document.querySelector('.models-track');
	if (modelsTrack) {
		modelsTrack.addEventListener('mouseenter', () => { modelsTrack.style.animationPlayState = 'paused'; });
		modelsTrack.addEventListener('mouseleave', () => { modelsTrack.style.animationPlayState = 'running'; });
	}
	const modelBadges = document.querySelectorAll('.model-badge');
	modelBadges.forEach(badge => { badge.addEventListener('click', () => { console.log('Model clicked:', badge.textContent.trim()); }); });
} 
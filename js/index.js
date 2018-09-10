var headerElement = document.querySelector('.header-container');
var footerElement = document.querySelector('.footer-container');

// once the dom is loaded check for connectivity
document.addEventListener('DOMContentLoaded', (event) => {
	if(!navigator.onLine)
		goOffline();

	window.addEventListener('offline', () => {
		goOffline();
	});

	function goOffline(){
		if(!headerElement.classList.contains('header-offline') && !footerElement.classList.contains('footer-offline')){
			headerElement.classList.add('header-offline');
			footerElement.classList.add('footer-offline');
		}
	}

	window.addEventListener('online', () => {
		if(headerElement.classList.contains('header-offline') && footerElement.classList.contains('footer-offline')){
			headerElement.classList.remove('header-offline');
			footerElement.classList.remove('footer-offline');
		}
	});
});
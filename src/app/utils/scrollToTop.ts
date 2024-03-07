export const scrollToTop = () => {
	const body = document.querySelector('body') as Element;
	body.scrollIntoView({
		behavior: 'smooth',
	});
};

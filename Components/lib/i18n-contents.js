import locale_ko from '../_locales/ko.js'

i18next.init({
	lng: `ko`,
	debug: true,
	resources: {
		ko: {
			translation: locale_ko,
		},
	},
}).then(() => {
	const content = document.querySelectorAll(`[i18n-content]`)
	if (content) {
		content.forEach(node => {
			const key = node.getAttribute(`i18n-content`)
			node.innerHTML = i18next.t(key)
		})
	}
})

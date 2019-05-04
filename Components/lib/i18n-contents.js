import locale_ko from '../_locales/ko.js'
import i18n from 'i18next'

i18n.init({
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
			node.innerHTML = i18n.t(key)
		})
	}
})

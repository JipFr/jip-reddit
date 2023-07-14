// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	devtools: { enabled: true },
	app: {
		head: {
			meta: [
				{
					name: "viewport",
					content:
						"width=device-width,initial-scale=1,user-scalable=0,minimal-ui,viewport-fit=cover",
				},
				{
					name: "apple-mobile-web-app-status-bar-style",
					content: "black-translucent",
				},
				{
					charset: "utf-8",
				},
				{
					name: "apple-mobile-web-app-capable",
					content: "yes",
				},
				{
					name: "mobile-web-app-capable",
					content: "yes",
				},
			],
			link: [],
			style: [],
			script: [],
			noscript: [],
		},
	},
});

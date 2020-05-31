module.exports = {
	pwa: {
		name: 'Miau.app',
		themeColor: '#000000',
		msTileColor: '#000000',
		appleMobileWebAppCapable: 'yes',
		appleMobileWebAppStatusBarStyle: 'black',
        display: 'fullscreen',
        workboxPluginMode: 'InjectManifest',
        workboxOptions: {
            swSrc: './src/sw.js',
            swDest: 'service-worker.js',
        },
	}
};

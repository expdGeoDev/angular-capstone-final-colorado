module.exports = function (config) {
	config.set({
		coverageReporter: {
			dir: require('path').join(__dirname, 'coverage'),
			subdir: '.',
			reporters: [
				{ type: 'html', dir:'coverage/' },
				{ type: 'lcov' },
				{ type: 'text-summary' }
			],
			check: {
				global: {
					statements: 80,
					branches: 80,
					functions: 80,
					lines: 80
				}
			}
		},
	});
};

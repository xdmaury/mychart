export const escale = {
	width: 750, 
	height: 500
};


export const adjustSartingBar = {
	barSpacing: 50,
};

export const darkTheme = {
	chart: {
		layout: {
			backgroundColor: '#2B2B43',
			lineColor: '#2B2B43',
			textColor: '#D9D9D9',
		},
		watermark: {
			color: 'rgba(0, 0, 0, 0)',
		},
		crosshair: {
			color: '#758696',
		},
		grid: {
			vertLines: {
				color: '#2B2B43',
			},
			horzLines: {
				color: '#363C4E',
			},
		},
		timeScale: {
			timeVisible:true,
			secondsVisible:false,
		},
	},
	series: {
		topColor: 'rgba(32, 226, 47, 0.56)',
		bottomColor: 'rgba(32, 226, 47, 0.04)',
		lineColor: 'rgba(32, 226, 47, 1)',
	},
};


export const lightTheme = {
	chart: {
		layout: {
			backgroundColor: '#FFFFFF',
			lineColor: '#2B2B43',
			textColor: '#191919',
		},
		watermark: {
			color: 'rgba(0, 0, 0, 0)',
		},
		grid: {
			vertLines: {
				visible: false,
			},
			horzLines: {
				color: '#f0f3fa',
			},
		},
		timeScale: {
			timeVisible:true,
			secondsVisible:false,
		},
	},
	series: {
		topColor: 'rgba(33, 150, 243, 0.56)',
		bottomColor: 'rgba(33, 150, 243, 0.04)',
		lineColor: 'rgba(33, 150, 243, 1)',
	},
};


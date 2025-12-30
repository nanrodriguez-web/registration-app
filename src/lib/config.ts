export const config = {
	backend_url: import.meta.env.VITE_BACKEND_URL || "http://localhost:8001",

	blue_fletch_logo:
		import.meta.env.VITE_BLUE_FLETCH_LOGO ||
		"https://bluefletch.com/wp-content/uploads/2025/07/bluefletch-logo.svg",

	blue_fletch_url:
		import.meta.env.VITE_BLUE_FLETCH_URL || "https://bluefletch.com",

	blue_fletch_bg_url:
		import.meta.env.VITE_BLUE_FLETCH_BG_URL ||
		"https://ems.bluefletch.com/static/media/Background%20Log%20In%20Bigger%20Screen.1341c33a6c0c3eed8e42.jpg",
};

export default config;

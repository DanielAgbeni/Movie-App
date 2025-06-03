export const TMDB_CONFIG = {
	API_KEY: process.env.EXPO_PUBLIC_MOVIE_API_KEY,
	BASE_URL: 'https://api.themoviedb.org/3',
	Headers: {
		// 'Content-Type': 'application/json',
		accept: 'application/json',
		Authorization: `Bearer ${process.env.EXPO_PUBLIC_MOVIE_API_KEY}`,
	},
};
export const fetchMovies = async ({
	query,
}: {
	query: string;
}): Promise<Movie[]> => {
	const endpoint = query
		? `${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
		: `${TMDB_CONFIG.BASE_URL}/discover/movie?sort_by=popularity.desc`;
	const response = await fetch(endpoint, {
		method: 'GET',
		headers: TMDB_CONFIG.Headers,
	});

	if (!response.ok) {
		throw new Error(`Failed to fetch movies: ${response.statusText}`);
	}

	const data = await response.json();
	// console.log(data);

	return data.results;
};
export const fetchMovieDetails = async (
	movieId: string,
): Promise<MovieDetails> => {
	try {
		const response = await fetch(
			`${TMDB_CONFIG.BASE_URL}/movie/${movieId}?api_key=${TMDB_CONFIG.API_KEY}`,
			{
				method: 'GET',
				headers: TMDB_CONFIG.Headers,
			},
		);

		if (!response.ok) {
			throw new Error(`Failed to fetch movie details: ${response.statusText}`);
		}

		const data = await response.json();
		return data;
	} catch (error) {
		console.error('Error fetching movie details:', error);
		throw error;
	}
};

export const fetchSavedMovies = async (): Promise<Movie[]> => {
	const movieTitles = [
		// Sci-Fi Movies
		'Inception',
		'The Matrix',
		'Interstellar',
		'Blade Runner 2049',
		'Arrival',
		'Edge of Tomorrow',
		'Ex Machina',
		'Dune',
		'Tenet',
		'District 9',
		// Horror/Scientific
		'A Quiet Place',
		'The Thing',
		'Alien',
		'Life',
		'Annihilation',
		'Event Horizon',
		'Prometheus',
		'28 Days Later',
		'World War Z',
		'I Am Legend',
		// Animated Movies
		'Despicable Me',
		'Despicable Me 2',
		'Despicable Me 3',
		'Minions',
		'How to Train Your Dragon',
		'Big Hero 6',
		'WALL-E',
		'The Incredibles',
		'Zootopia',
		'Inside Out',
		'Coco',
		'Spider-Man: Into the Spider-Verse',
		'Kung Fu Panda',
		'Ratatouille',
		'Up',
		'Toy Story 3',
		'Monsters, Inc.',
		'The Lion King',
		'Finding Nemo',
	];

	try {
		const moviePromises = movieTitles.map(async (title) => {
			const response = await fetch(
				`${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(
					title,
				)}`,
				{
					method: 'GET',
					headers: TMDB_CONFIG.Headers,
				},
			);

			if (!response.ok) {
				console.warn(`Failed to fetch movie: ${title}`);
				return null;
			}

			const data = await response.json();
			// Return the first result if available
			return data.results && data.results.length > 0 ? data.results[0] : null;
		});

		const movies = await Promise.all(moviePromises);
		// Filter out null results and return valid movies
		return movies.filter((movie): movie is Movie => movie !== null);
	} catch (error) {
		console.error('Error fetching saved movies:', error);
		throw error;
	}
};

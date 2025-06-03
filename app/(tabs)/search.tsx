import MovieCard from '@/components/MovieCard';
import SearchBar from '@/components/SearchBar';
import { icons } from '@/constants/icons';
import { images } from '@/constants/images';
import { fetchMovies } from '@/services/api';
import { updateSearchCount } from '@/services/appwrite';
import useFetch from '@/services/useFetch';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, Text, View } from 'react-native';

const Search = () => {
	const [query, setQuery] = useState('');

	const {
		data: movies,
		loading: moviesLoading,
		error: moviesError,
		refetch: loadMovies,
		reset,
	} = useFetch(() => fetchMovies({ query: query }), false);

	useEffect(() => {
		const timeoutId = setTimeout(async () => {
			if (query.trim()) {
				await loadMovies();
			} else {
				reset();
			}
		}, 500);
		return () => clearTimeout(timeoutId);
	}, [query]);

	useEffect(() => {
		if (Array.isArray(movies) && movies.length > 0 && movies[0]) {
			updateSearchCount(query, movies[0]);
		}
	}, [movies]);

	const renderHeader = () => (
		<>
			{moviesLoading && (
				<ActivityIndicator
					size='large'
					color='#0000ff'
					className='my-3 self-center'
				/>
			)}

			{moviesError && (
				<Text className='text-red-500 px-5 my-3'>
					Error: {moviesError?.message}
				</Text>
			)}

			{!moviesLoading &&
				!moviesError &&
				query.trim() &&
				Array.isArray(movies) &&
				movies.length > 0 && (
					<Text className='text-xl mb-7 text-white font-bold'>
						Search Results for <Text className='text-accent'>{query}</Text>
					</Text>
				)}
		</>
	);

	return (
		<View className='flex-1 bg-primary px-4 pt-8'>
			<Image
				source={images.bg}
				className='absolute w-full z-0'
				resizeMode='cover'
			/>

			{/* Fixed Header with Logo and SearchBar */}
			<View className='w-full flex-row justify-center mt-20 items-center'>
				<Image
					source={icons.logo}
					className='w-12 h-10'
				/>
			</View>
			<View className='my-5'>
				<SearchBar
					placeHolder='Search movie...'
					value={query}
					onChangeText={(text: string) => {
						setQuery(text);
					}}
				/>
			</View>

			<FlatList
				className='mt-2 pb-32'
				columnWrapperStyle={{
					justifyContent: 'flex-start',
					gap: 20,
					paddingRight: 5,
					marginBottom: 10,
				}}
				contentContainerStyle={{
					minHeight: '100%',
					paddingBottom: 100,
				}}
				data={movies}
				ListHeaderComponent={renderHeader}
				renderItem={({ item }) => <MovieCard {...item} />}
				numColumns={3}
				keyExtractor={(item, index) => item.id?.toString() || index.toString()}
				// keyboardShouldPersistTaps='handled'
				ListEmptyComponent={
					!moviesLoading && !moviesError ? (
						<View className='mt-10 px-5'>
							<Text className='text-center text-gray-500'>
								{query.trim()
									? `No movie titled ${query}`
									: 'Search for a Movie'}
							</Text>
						</View>
					) : null
				}
			/>
		</View>
	);
};

export default Search;

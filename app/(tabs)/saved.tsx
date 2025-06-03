import MovieCard from '@/components/MovieCard';
import { images } from '@/constants/images';
import { fetchSavedMovies } from '@/services/api';
import useFetch from '@/services/useFetch';
import { useRouter } from 'expo-router';
import React from 'react';
import {
	ActivityIndicator,
	FlatList,
	Image,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';

const Saved = () => {
	const router = useRouter();
	const { data: movies, loading, error } = useFetch(fetchSavedMovies);

	// Header for FlatList
	const renderHeader = () => (
		<>
			<View className='px-4 flex-row items-center justify-between mb-6 mt-20'>
				<Text className='text-2xl font-bold text-white'>Saved Movies</Text>
				<Text className='text-gray-400'>{movies?.length || 0} movies</Text>
			</View>
		</>
	);

	if (loading) {
		return (
			<View className='flex-1 bg-primary justify-center items-center'>
				<Image
					source={images.bg}
					className='absolute w-full h-full'
				/>
				<ActivityIndicator
					size='large'
					color='#ffffff'
				/>
				<Text className='text-white mt-4'>Loading saved movies...</Text>
			</View>
		);
	}

	if (error) {
		return (
			<View className='flex-1 bg-primary justify-center items-center'>
				<Image
					source={images.bg}
					className='absolute w-full h-full'
				/>
				<Text className='text-red-400 text-center px-4'>
					Error loading movies: {error.message}
				</Text>
				<TouchableOpacity
					className='mt-4 bg-blue-500 px-6 py-3 rounded-full'
					onPress={() => router.push('/')}>
					<Text className='text-white font-semibold'>Browse Movies</Text>
				</TouchableOpacity>
			</View>
		);
	}

	return (
		<View className='flex-1 bg-primary'>
			<Image
				source={images.bg}
				className='absolute w-full z-0'
			/>
			<FlatList
				className='mt-2 pb-32'
				showsVerticalScrollIndicator={false}
				contentContainerStyle={{
					minHeight: '100%',
					paddingBottom: 100,
				}}
				columnWrapperStyle={{
					justifyContent: 'flex-start',
					gap: 20,
					paddingRight: 5,
					marginBottom: 10,
				}}
				ListHeaderComponent={renderHeader}
				data={movies}
				keyExtractor={(item, index) => item.id?.toString() || index.toString()}
				numColumns={3}
				renderItem={({ item }) => <MovieCard {...item} />}
				ListEmptyComponent={
					<View className='flex-1 justify-center items-center mt-20'>
						<Text className='text-gray-400 text-lg'>No saved movies yet</Text>
						<TouchableOpacity
							className='mt-4 bg-blue-500 px-6 py-3 rounded-full'
							onPress={() => router.push('/')}>
							<Text className='text-white font-semibold'>Browse Movies</Text>
						</TouchableOpacity>
					</View>
				}
			/>
		</View>
	);
};

export default Saved;

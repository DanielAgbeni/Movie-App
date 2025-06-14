import MovieCard from '@/components/MovieCard';
import SearchBar from '@/components/SearchBar';
import TrendingCard from '@/components/TrendingCard';
import { icons } from '@/constants/icons';
import { images } from '@/constants/images';
import { fetchMovies } from '@/services/api';
import { getTrendingMOvies } from '@/services/appwrite';
import useFetch from '@/services/useFetch';
import { useRouter } from 'expo-router';
import { ActivityIndicator, FlatList, Image, Text, View } from 'react-native';

export default function Index() {
	const router = useRouter();
	const {
		data: movies,
		loading: moviesLoading,
		error: moviesError,
	} = useFetch(() => fetchMovies({ query: '' }));
	const {
		data: trendingMovies,
		loading,
		error: trendingError,
	} = useFetch(getTrendingMOvies);
	// console.log('Movies:', movies);
	// console.log('Loading:', moviesLoading);

	// Header for FlatList
	const renderHeader = () => (
		<>
			<Image
				source={icons.logo}
				className='w-12 h-10 mt-20 mb-5 mx-auto'
			/>
			<SearchBar
				value=''
				onChangeText={() => {}}
				onPress={() => router.push('/search')}
				placeHolder='Search for a movie'
			/>
			{trendingMovies && (
				<View className='mt-10'>
					<Text className='text-lg text-white font-bold mb-3'>
						Trending Movies
					</Text>
					<FlatList
						horizontal
						showsHorizontalScrollIndicator={false}
						ItemSeparatorComponent={() => <View className='w-4' />}
						data={trendingMovies}
						keyExtractor={(item, index) =>
							item.movie_id?.toString() || index.toString()
						}
						renderItem={({ item, index }) => (
							<TrendingCard
								movie={item}
								index={index}
							/>
						)}
					/>
				</View>
			)}
			<Text className='text-lg text-white font-bold mt-5 mb-3'>
				Latest Movies
			</Text>
		</>
	);

	if (moviesLoading || loading) {
		return (
			<View className='flex-1 bg-primary justify-center items-center'>
				{/* <Image
					source={images.bg}
					className='absolute w-full z-0'
				/> */}
				<ActivityIndicator
					size='large'
					color='#0000ff'
					className='mt-10 self-center'
				/>
			</View>
		);
	}

	if (moviesError || trendingError) {
		return (
			<View className='flex-1 bg-primary justify-center items-center'>
				<Image
					source={images.bg}
					className='absolute w-full z-0'
				/>
				<Text className='text-white'>
					Error: {moviesError?.message || trendingError?.message}
				</Text>
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
				// scrollEnabled={false}
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
			/>
		</View>
	);
}

import { images } from '@/constants/images';
import React from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';

const Profile = () => {
	// Dummy user data
	const userData = {
		name: 'Daniel Agbeni',
		email: 'danielagbeni12@gmail.com',
		avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
		watchlist: 23,
		reviews: 15,
	};

	// Dummy watch history
	const watchHistory = [
		{
			id: 1,
			title: 'The Dark Knight',
			poster: 'https://image.tmdb.org/t/p/w500/1hRoyzDtpgMU7Dz4JF22RANzQO7.jpg',
			date: '2 days ago',
		},
		{
			id: 2,
			title: 'Inception',
			poster: 'https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg',
			date: '1 week ago',
		},
		// Add more dummy history items as needed
	];

	return (
		<View className='flex-1 bg-primary'>
			<Image
				source={images.bg}
				className='absolute w-full z-0'
			/>

			<ScrollView className='flex-1 pt-20 px-4'>
				{/* Profile Header */}
				<View className='items-center mb-8'>
					<Image
						source={{ uri: userData.avatar }}
						className='w-24 h-24 rounded-full mb-4'
					/>
					<Text className='text-white text-2xl font-bold'>{userData.name}</Text>
					<Text className='text-gray-400'>{userData.email}</Text>
				</View>

				{/* Stats */}
				<View className='flex-row justify-around bg-[#ffffff10] rounded-xl p-4 mb-8'>
					<View className='items-center'>
						<Text className='text-white text-xl font-bold'>
							{userData.watchlist}
						</Text>
						<Text className='text-gray-400'>Watchlist</Text>
					</View>
					<View className='items-center'>
						<Text className='text-white text-xl font-bold'>
							{userData.reviews}
						</Text>
						<Text className='text-gray-400'>Reviews</Text>
					</View>
				</View>

				{/* Watch History */}
				<View>
					<Text className='text-lg text-white font-bold mb-4'>
						Watch History
					</Text>
					{watchHistory.map((item) => (
						<TouchableOpacity
							key={item.id}
							className='flex-row items-center bg-[#ffffff10] rounded-xl p-3 mb-3'>
							<Image
								source={{ uri: item.poster }}
								className='w-16 h-24 rounded-lg'
							/>
							<View className='ml-4 flex-1'>
								<Text className='text-white font-semibold'>{item.title}</Text>
								<Text className='text-gray-400'>{item.date}</Text>
							</View>
						</TouchableOpacity>
					))}
				</View>

				{/* Settings Button */}
				<TouchableOpacity className='bg-blue-500 rounded-xl p-4 mt-8 mb-10'>
					<Text className='text-white text-center font-semibold'>Settings</Text>
				</TouchableOpacity>
			</ScrollView>
		</View>
	);
};

export default Profile;

import React from 'react';
import { Image, Text, View } from 'react-native';

const Profile = () => {
	return (
		<View className='flex-1 items-center justify-center bg-white px-6'>
			<Image
				source={{ uri: 'https://i.pravatar.cc/150?img=3' }}
				className='w-32 h-32 rounded-full mb-4 border-4 border-blue-500'
				alt='Profile'
			/>
			<Text className='text-2xl font-bold text-gray-800 mb-1'>Jane Doe</Text>
			<Text className='text-base text-gray-500 mb-6'>@janedoe</Text>
			<View className='bg-blue-100 px-4 py-2 rounded-lg'>
				<Text className='text-blue-700'>Welcome to your profile page!</Text>
			</View>
		</View>
	);
};

export default Profile;

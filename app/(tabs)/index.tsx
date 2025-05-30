import { Text, View } from 'react-native';

export default function Index() {
	return (
		<View className='flex-1 justify-center items-center bg-gray-100'>
			<View className='bg-white p-8 rounded-lg shadow-lg'>
				<Text className='text-dark-200 text-5xl font-bold mb-4'>Welcome</Text>
				<Text className='text-dark-200 text-lg text-center'></Text>
			</View>
		</View>
	);
}

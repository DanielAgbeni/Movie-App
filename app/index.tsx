import { Text, View } from 'react-native';

export default function Index() {
	return (
		<View className='flex-1 justify-center items-center bg-gray-100'>
			<View className='bg-white p-8 rounded-lg shadow-lg'>
				<Text className='text-blue-500 text-5xl font-bold mb-4'>Welcome</Text>
				<Text className='text-gray-600 text-lg text-center'>
					NativeWind is working! 🎉
				</Text>
				<View className='mt-6 flex-row space-x-4'>
					<View className='bg-red-500 p-3 rounded'>
						<Text className='text-white font-semibold'>Red</Text>
					</View>
					<View className='bg-green-500 p-3 rounded'>
						<Text className='text-white font-semibold'>Green</Text>
					</View>
					<View className='bg-purple-500 p-3 rounded'>
						<Text className='text-white font-semibold'>Purple</Text>
					</View>
				</View>
			</View>
		</View>
	);
}

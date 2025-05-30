import React from 'react';
import { FlatList, Text, View } from 'react-native';

const mockSaved = [
	{ id: '1', title: 'Inception' },
	{ id: '2', title: 'The Matrix' },
	{ id: '3', title: 'Pulp Fiction' },
];

const Saved = () => {
	return (
		<View className='flex-1 bg-white px-4 pt-8'>
			<Text className='text-2xl font-bold mb-4 text-gray-800'>
				Saved Movies
			</Text>
			<FlatList
				data={mockSaved}
				keyExtractor={(item) => item.id}
				renderItem={({ item }) => (
					<View className='py-3 border-b border-gray-100'>
						<Text className='text-lg text-gray-700'>{item.title}</Text>
					</View>
				)}
				ListEmptyComponent={
					<Text className='text-center text-gray-400 mt-8'>
						No saved movies yet.
					</Text>
				}
			/>
		</View>
	);
};

export default Saved;

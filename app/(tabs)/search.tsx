import React, { useState } from 'react';
import {
	FlatList,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from 'react-native';

const mockResults = [
	{ id: '1', title: 'Inception' },
	{ id: '2', title: 'Interstellar' },
	{ id: '3', title: 'The Dark Knight' },
];

const Search = () => {
	const [query, setQuery] = useState('');
	const [results, setResults] = useState(mockResults);

	const handleSearch = (text: string) => {
		setQuery(text);
		setResults(
			mockResults.filter((item) =>
				item.title.toLowerCase().includes(text.toLowerCase()),
			),
		);
	};

	return (
		<View className='flex-1 bg-white px-4 pt-8'>
			<TextInput
				className='border border-gray-300 rounded-lg px-4 py-2 mb-4'
				placeholder='Search movies...'
				value={query}
				onChangeText={handleSearch}
			/>
			<FlatList
				data={results}
				keyExtractor={(item) => item.id}
				renderItem={({ item }) => (
					<TouchableOpacity
						className='py-3 border-b border-gray-100'
						onPress={() => {
							/* Navigate to movie details or handle selection */
						}}>
						<Text className='text-lg text-gray-800'>{item.title}</Text>
					</TouchableOpacity>
				)}
				ListEmptyComponent={
					<Text className='text-center text-gray-400 mt-8'>
						No results found.
					</Text>
				}
			/>
		</View>
	);
};

export default Search;

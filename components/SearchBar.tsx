import { icons } from '@/constants/icons';
import React from 'react';
import { Image, TextInput, View } from 'react-native';

interface Props {
	placeHolder: string;
	onPress?: () => void;
	value: string;
	onChangeText: (text: string) => void;
}

const SearchBar = ({ placeHolder, onPress, value, onChangeText }: Props) => {
	return (
		<View className='flex-row items-center bg-dark-200 rounded-full px-5 py-4'>
			<Image
				source={icons.search}
				className='size-5'
				resizeMode='contain'
				tintColor='#ab8bff'
			/>
			<TextInput
				onPress={onPress}
				value={value}
				onChangeText={onChangeText}
				placeholder={placeHolder}
				placeholderTextColor='#ab8bff'
				className='flex-1 ml-2 text-white'
				// blurOnSubmit={false}
				// returnKeyType='search'
				// autoCorrect={false}
				// autoCapitalize='none'
			/>
		</View>
	);
};

export default SearchBar;

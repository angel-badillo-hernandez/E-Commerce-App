import React from 'react';
import { View } from 'react-native';
import { Layout, Text } from 'react-native-rapi-ui';
import { Avatar } from "@react-native-material/core";

export default function ({ navigation }) {
	return (
		<Layout>
			<View
				style={{
					flex: 1,
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				<Text>This is the About tab</Text>
			</View>
			<Avatar label={'Angel Badillo'}></Avatar>
		</Layout>
	);
}

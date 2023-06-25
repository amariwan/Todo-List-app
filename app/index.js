import React, { useState } from 'react';
import {
	KeyboardAvoidingView,
	StyleSheet,
	Text,
	View,
	TextInput,
	TouchableOpacity,
	Keyboard,
	ScrollView,
} from 'react-native';
import Task from '../components/Task';

export default function App() {
	const [task, setTask] = useState();
	const [taskItems, setTaskItems] = useState([]);

	const handleAddTask = () => {
		Keyboard.dismiss();
		if (task == null || task == '') return;
		setTaskItems([...taskItems, task]);
		setTask(null);
	};

	const completeTask = (index) => {
		let itemsCopy = [...taskItems];
		itemsCopy.splice(index, 1);
		setTaskItems(itemsCopy);
	};

	return (
		<View style={styles.container}>
			<ScrollView
				contentContainerStyle={{
					flexGrow: 1,
				}}
				keyboardShouldPersistTaps='handled'
			>
				{/* Today's Tasks */}
				<View style={styles.tasksWrapper}>
					<Text style={styles.sectionTitle}>Today's tasks</Text>
					<View style={styles.items}>
						{taskItems.map((item, index) => {
							return (
								<TouchableOpacity key={index} onPress={() => completeTask(index)}>
									<Task text={item} />
								</TouchableOpacity>
							);
						})}
					</View>
				</View>
			</ScrollView>
			<KeyboardAvoidingView
				behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
				style={styles.writeTaskWrapper}
			>
				<TextInput
					style={styles.input}
					placeholder={'Write a task'}
					placeholderTextColor='#000'
					value={task}
					onChangeText={(text) => setTask(text)}
				/>
				<TouchableOpacity onPress={() => handleAddTask()}>
					<View style={styles.addWrapper}>
						<Text style={styles.addText}>+</Text>
					</View>
				</TouchableOpacity>
			</KeyboardAvoidingView>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},
	tasksWrapper: {
		paddingTop: 10,
		paddingHorizontal: 20,
	},
	sectionTitle: {
		fontSize: 24,

		fontWeight: 'bold',
	},
	items: {
		marginTop: 30,
	},
	writeTaskWrapper: {
		position: 'absolute',
		bottom: 60,
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center',
	},
	input: {
		paddingVertical: 15,
		paddingHorizontal: 15,
		backgroundColor: '#fff',
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 3,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,

		borderRadius: 60,
		borderWidth: 0,
		minWidth: '80%',
		maxWidth: '100%',
	},
	addWrapper: {
		width: 50,
		height: 50,
		backgroundColor: '#FFF',
		borderRadius: 20,
		justifyContent: 'center',
		alignItems: 'center',
		borderWidth: 0,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 3,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
	},
	addText: {},
});

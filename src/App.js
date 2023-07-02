import './App.css';
import React, { useState, useEffect } from 'react';
import Messages from './components/Messages';
import Input from './components/Input';

function randomName() {
	const adjectives = [
		'White',
		'Cool',
		'Spring',
		'Winter',
		'Dusk',
		'Twilight',
		'Dawn',
		'Crimson',
		'Wispy',
		'Weathered',
	];
	const nouns = [
		'Leaf',
		'Tree',
		'Glitter',
		'Forest',
		'Hill',
		'Cloud',
		'Meadow',
		'Sun',
		'Glade',
		'Bird',
		'Brook',
		'Butterfly',
	];
	const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
	const noun = nouns[Math.floor(Math.random() * nouns.length)];
	return `${adjective}  ${noun}`;
}

function randomColor() {
	return '#' + Math.floor(Math.random() * 0xffffff).toString(16);
}

const channelId = '8W5r3AKbbPBackrW';

function App() {
	const [messages, setMessages] = useState([]);
	const [member, setMember] = useState({
		username: randomName(),
		color: randomColor(),
	});
	const [drone, setDrone] = useState();

	useEffect(() => {
		const drone = new window.Scaledrone(channelId, {
			data: member,
		});
		setMember((prevMember) => ({
			...prevMember,
			id: drone.id,
		}));
		setDrone(drone);
		const room = drone.subscribe('observable-room');
		room.on('data', (data, member) => {
			setMessages((prevMessages) => [
				...prevMessages,
				{
					text: data,
					member: member.clientData,
				},
			]);
		});
	}, []);

	const onSendMessage = (message) => {
		drone.publish({
			room: 'observable-room',
			message,
		});
	};
	console.log(messages);
	return (
		<>
			<div className='App'>
				<header className='App-header'>
					<h1>Chat App</h1>
				</header>
				<Messages messages={messages} currentMember={member} />
				<Input onSendMessage={onSendMessage}></Input>
			</div>
		</>
	);
}

export default App;

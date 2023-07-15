import React, { useState, useEffect } from 'react';
import Messages from './components/Messages';
import Input from './components/Input';
import { randomName, randomColor } from './util';

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
			<div className='app'>
				<header className='header'>
					<h1>Chat App</h1>
				</header>
				<Messages messages={messages} currentMember={member} />
				<Input onSendMessage={onSendMessage}></Input>
			</div>
		</>
	);
}

export default App;

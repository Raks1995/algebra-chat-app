import './App.css';
import React, { useState, useEffect } from 'react';
import Messages from './components/Messages';
import Input from './components/Input';

function randomName() {
	const adjectives = [
		'autumn',
		'hidden',
		'bitter',
		'misty',
		'silent',
		'empty',
		'dry',
		'dark',
		'summer',
		'icy',
		'delicate',
		'quiet',
		'white',
		'cool',
		'spring',
		'winter',
		'patient',
		'twilight',
		'dawn',
		'crimson',
		'wispy',
		'weathered',
		'blue',
		'billowing',
		'broken',
		'cold',
		'damp',
		'falling',
		'frosty',
		'green',
		'long',
		'late',
		'lingering',
		'bold',
		'little',
		'morning',
		'muddy',
		'old',
		'red',
		'rough',
		'still',
		'small',
		'sparkling',
		'throbbing',
		'shy',
		'wandering',
		'withered',
		'wild',
		'black',
		'young',
		'holy',
		'solitary',
		'fragrant',
		'aged',
		'snowy',
		'proud',
		'floral',
		'restless',
		'divine',
		'polished',
		'ancient',
		'purple',
		'lively',
		'nameless',
	];
	const nouns = [
		'waterfall',
		'river',
		'breeze',
		'moon',
		'rain',
		'wind',
		'sea',
		'morning',
		'snow',
		'lake',
		'sunset',
		'pine',
		'shadow',
		'leaf',
		'dawn',
		'glitter',
		'forest',
		'hill',
		'cloud',
		'meadow',
		'sun',
		'glade',
		'bird',
		'brook',
		'butterfly',
		'bush',
		'dew',
		'dust',
		'field',
		'fire',
		'flower',
		'firefly',
		'feather',
		'grass',
		'haze',
		'mountain',
		'night',
		'pond',
		'darkness',
		'snowflake',
		'silence',
		'sound',
		'sky',
		'shape',
		'surf',
		'thunder',
		'violet',
		'water',
		'wildflower',
		'wave',
		'water',
		'resonance',
		'sun',
		'wood',
		'dream',
		'cherry',
		'tree',
		'fog',
		'frost',
		'voice',
		'paper',
		'frog',
		'smoke',
		'star',
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

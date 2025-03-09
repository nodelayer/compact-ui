import { useState } from 'react';
import Command from "./sections/Command";
import Footer from "./sections/Footer";
import Hero from "./sections/Hero";
import Support from "./sections/Support";
import Tool from "./sections/Tool";

export default function App() {
	const [url, setUrl] = useState('https://api.nodelayer.xyz');

	return (
		<div>
			<Hero />
			<Tool onURLChange={setUrl} />
			<Command href={url} />
			<Support />
			<Footer />
		</div>
	)
}


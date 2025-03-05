import Command from "./sections/Command";
import Hero from "./sections/Hero";
import Support from "./sections/Support";
import Tool from "./sections/Tool";

export default function App() {
  return (
		<div>
			<Hero />
			<Tool />
			{/* todo: compute href from <Tool/> componenet */}
			<Command href="https://api.nodelayer.xyz/x64/layers/generate?version=v22.14.0&packages=is-odd,is-even" />
			<Support />
		</div>
  )
}


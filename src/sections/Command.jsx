import { Copy } from 'lucide-react';
import Highlight from 'react-highlight';
import { useState, useMemo } from 'react';
import 'highlight.js/styles/ir-black.css'

/**
 * @param {import('react').HTMLProps<HTMLAnchorElement>} props
 */
export default function Command(props) {
	const [active, setActive] = useState('curl');

	const command = useMemo(
		() => active === 'curl' ?
			`curl -L --fail-with-body -o layer.zip "${props.href}"` :
			`wget -O layer.zip "${props.href}"`,
		[active, props.href],
	);

	return (
		<div className='p-4 text-[#000] border-b-4 border-[#000] bg-[#cdc1ff]'>
			<p className='font-bold text-2xl mb-4'>For terminal lovers: </p>

			<div className='w-full md:w-[70%] lg:w-[50%]'>
				<table className='border-collapse border-2 border-[#000] table-fixed w-full shadow-custom'>
					<thead className='font-bold'>
						<tr className='border-b-4 border-[#000]'>
							<td
								className={'border-2 border-[#000] py-2 px-5 text-center cursor-pointer transition-all duration-150 ' +  (active === 'curl' ? 'bg-[#a388ec]' : 'bg-[#fff]')}
								onClick={() => setActive('curl')}
							>
								Curl
							</td>
							<td
								className={'border-2 border-[#000] py-2 px-5 text-center cursor-pointer transition-all duration-150 ' +  (active === 'wget' ? 'bg-[#a388ec]' : 'bg-[#fff]')}
								onClick={() => setActive('wget')}
							>
								Wget
							</td>
						</tr>
					</thead>

					<tbody>
						<tr className='bg-[#000] text-[#fff] text-sm font-mono font-thin'>
							<td colSpan={2} className='pl-5 pr-10 py-2 relative group'>
								<Highlight language='zsh' className='text-wrap'>
									{command}
								</Highlight>

								<div
									className='absolute top-2 right-5 bg-[#fff] text-[#000] rounded-sm p-2 group-hover:block hidden transition-all duration-150 cursor-pointer'
									onClick={
										async () => {
											if (window.navigator?.clipboard) {
												await window.navigator.clipboard.writeText(command);
											}
										}
									}
								>
									<Copy size={15} />
								</div>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	)
}

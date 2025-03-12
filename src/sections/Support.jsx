import { Github, Twitter, Linkedin } from 'lucide-react';

export default function Support() {
	return (
		<div className='p-4 text-[#000] border-b-4 border-[#000] bg-[#e3dff1]'>
			<p className='text-2xl font-bold'>Did this tool help you?</p>
			<p className='text-sm'>Here are a couple of ways you can consider supporting me.</p>

			<div className='w-full md:w-[70%] lg:w-[50%] mt-4'>
				<table className='table-fixed border-collapse border-2 border-[#000] w-full shadow-custom cursor-pointer font-bold bg-[#fff]'>
					<tbody>
						<tr>
							{/* <td className='text-center p-4 border-2 border-[#000] hover:bg-[#a388ec]'>Watch Ad</td> */}
							<td className='border-2 border-[#000] hover:bg-[#a388ec]' colSpan={2}>
								<a href='https://buymeacoffee.com/fuadop' className='block p-4 text-center' target='_blank'>
									Buy me a Coffee
								</a>
							</td>
						</tr>
						<tr>
							<td className='border-2 border-[#000] hover:bg-[#a388ec]'>
								<a href='https://fuadolatunji.me' className='block p-4 text-center' target='_blank'>
									Hire me
								</a>
							</td>
							<td className='border-2 border-[#000] hover:bg-[#a388ec]'>
								<a href='https://fuadop.kit.com/ac1a28f16a' className='block p-4 text-center' target='_blank'>
									Subscribe to my newsletter
								</a>
							</td>
						</tr>
						<tr>
							<td className='border-2 border-[#000] hover:bg-[#a388ec]'>
								<a href='https://github.com/nodelayer/compact-api' className='block p-4 text-center' target='_blank'>
									Star project on github
								</a>
							</td>
							<td className='text-center p-4 border-2 border-[#000]'>
								<p> Follow me on Socials </p>

								<ul className='flex justify-center items-center gap-2'>
									<li>
										<a href='https://github.com/fuadop' target='_blank' className='block rounded-full border-2 border-[#fff] bg-[#000] text-[#fff] p-1'>
											<Github size={15} />
										</a>
									</li>

									<li>
										<a href='https://x.com/fuadop2' target='_blank' className='block rounded-full border-2 border-[#fff] bg-[#000] text-[#fff] p-1'>
											<Twitter size={15} />
										</a>
									</li>

									<li>
										<a href='https://linkedin.com/in/fuadop' target='_blank' className='block rounded-full border-2 border-[#fff] bg-[#000] text-[#fff] p-1'>
											<Linkedin size={15} />
										</a>
									</li>
								</ul>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	)
}

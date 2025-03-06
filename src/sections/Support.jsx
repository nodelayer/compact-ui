export default function Support() {
	return (
		<div className='p-4 text-[#000] border-b-4 border-[#000] bg-[#e3dff1]'>
			<p className='text-2xl font-bold'>Did this tool help you?</p>
			<p className='text-sm'>Here are a couple of ways you can consider supporting me.</p>

			<div className='w-full md:w-[70%] lg:w-[50%] mt-4'>
				<table className='table-fixed border-collapse border-2 border-[#000] w-full shadow-custom cursor-pointer font-bold bg-[#fff]'>
					<tbody>
						<tr>
							<td className='text-center p-4 border-2 border-[#000] hover:bg-[#a388ec]'>Watch Ad</td>
							<td className='border-2 border-[#000] hover:bg-[#a388ec]'>
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
								<a href='https://github.com/nodelayer' className='block p-4 text-center' target='_blank'>
									Star project on github
								</a>
							</td>
							<td className='text-center p-4 border-2 border-[#000]'>Follow me on Socials</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	)
}

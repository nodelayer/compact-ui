import Logo from "../common/Logo";

export default function Hero() {
  return (
		<div className='p-4 text-[#000] border-b-4 border-[#000] bg-[#fff]'>
			<div className='mb-4'>
				<Logo/>
			</div>

			<p className='text-4xl font-bold mb-4 mt-12'>
				Deploy Lambda, Effortlessly.
			</p>

			<p className='text-sm'>
				<span>
					Develop on any OS, deploy flawlessly to AWS Lambda. End "invalid ELF header" errors and cross-platform headaches.
				</span>

				<br />

				<span>
					 Our streamlined platform handles layer creation, so you focus on code.
				</span>
			</p>
		</div>
  )
}


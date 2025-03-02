/**
 * @param {import('react').HTMLProps<HTMLButtonElement>} props
 */
export default function Button(props) {
  return (
		<button
			className='inline-flex justify-center items-center rounded-sm bg-[#a388ed] font-semibold px-5 py-2 h-[unset] shadow-custom border-2 border-black hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] disabled:shadow-none disabled:translate-x-[4px] disabled:translate-y-[4px] transition-all duration-150'
			{...props}
		>
			{props.children}
		</button>
  )
}


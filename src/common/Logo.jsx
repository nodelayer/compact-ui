/**
 * @param {import('react').HTMLProps<HTMLAnchorElement>} props
 */
export default function Logo(props) {
  return (
		<a
			className='inline-block text-3xl font-[Sigmar]'
			href="/"
			{...props}
		>
			NODELAYER
		</a>
  )
}


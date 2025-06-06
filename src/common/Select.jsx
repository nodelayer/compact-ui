//import 'react-select-search/style.css'
import { useMemo, useEffect } from 'react';
import randomize from 'randomatic';
import SelectSearch from 'react-select-search';
import { ChevronDown,ChevronUp, Check, LoaderCircle } from 'lucide-react';

/**
 * @param {import('react-select-search').SelectSearchProps} props
 */
export default function Select(props) {
	const id = useMemo(() => randomize('Aa', 5), []);

	useEffect(() => {
		const shouldResize = () => {
			const container = document.querySelector(`.${id}`);

			const [, dropdown] = container.children;
			dropdown.style.width = window.getComputedStyle(container).width;
		};

		shouldResize();
		window.addEventListener('resize', shouldResize);

		return () => {
			window.removeEventListener('resize', shouldResize);
		};
	}, [props, id]);

	return (
		<SelectSearch
			{...props}
			search
			className={
				{
					select: 'absolute mt-[12px] bg-[#a388ed] rounded-sm border-2 border-[#000] hidden group-[.ss-is-focused]/ss-container:block p-2 max-h-64 overflow-y-scroll overflow-x-hidden z-[2]',
					input: 'rounded-sm bg-[#a388ed] border-2 border-[#000] pl-5 pr-10 py-2 text-[#000] outline-none w-full',
					container: `group/ss-container w-full ${id}`,
					'option': 'flex gap-1 justify-start items-center rounded-sm shadow-[#000] px-5 py-2 bg-[transparent] text-[#000] w-full cursor-pointer hover:ring-2',
					'has-focus': 'ss-is-focused',
				}
			}
			renderValue={(valueProps, snapshot, className) => {
				return (
					<div className='relative'>
						<input {...valueProps} className={className} />
						{
							(snapshot.fetching || props.loading) ?
								<LoaderCircle className='absolute top-[10px] right-5 cursor-none animate-spin' /> :
								snapshot.focus ?
									<ChevronUp className='absolute top-[10px] right-5 cursor-pointer' onClick={() => valueProps.ref?.current?.blur()}/> :
									<ChevronDown className='absolute top-[10px] right-5 cursor-pointer' onClick={() => valueProps.ref?.current?.focus()}/>
						}
					</div>
				)
			}}
			renderOption={(domProps, option, snapshot, className) => {
				if (!snapshot.selected) {
					if (Array.isArray(props.value)) {
						snapshot.selected = props.value?.includes(option.value) ?? false;
					} else if (typeof props.value === 'string') {
						snapshot.selected = props.value === option.value;
					}
				}

				if (props.multiple && props.nodelayerSpecial) {
					domProps.onMouseDown = () => snapshot.selected ? props.onRemove?.(option.value) : props.onAdd?.(option.value);
				}

				return (
					<button {...domProps} className={className}>
						<span className='block w-[20px]'>
							{
								snapshot.selected ?
									<Check size={15} className='block' /> :
									null
							}
						</span>

						<span className='flex justify-start items-center'>
							{option.name}
						</span>
					</button>
				)
			}}
		/>
	)
}

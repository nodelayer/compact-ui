import Button from "../common/Button";
import Select from "../common/Select";
import { useState, useEffect, useMemo } from "react";
/**
 * @typedef {Object} PackageVersion
 * @property {string} version
 * @property {boolean} loading
 * @property {string[]} versions
 */


/**
 * @param {import('react').PropsWithoutRef<{ onURLChange: (url: string) => any}>} props
 */
export default function Tool(props) {
	const [arch, setArch] = useState('x64');
	const [version, setVersion] = useState('');
	const [versions, setVersions] = useState([]);
	const [loadingVersions, setLoadingVersions] = useState(false);

	const [prevOpts, setPrevOpts] = useState([]);
	const [packages, setPackages] = useState([]);
	const [packageVersions, setPackageVersions] = useState({});

	useEffect(() => {
		const loadVersions = async () => {
			setLoadingVersions(true);

			let rows = [], res = await fetch('https://api.nodelayer.xyz/x64/versions');

			if (res.status === 200) {
				rows = (await res.text())
					.split('\n')
					.map(v => (
						{
							name: v,
							value: v,
						}
					));
			}

			setVersions(rows);
			if (rows.length > 0) setVersion(rows[0]?.value);

			setLoadingVersions(false);
		};

		loadVersions();
	}, []);

	useEffect(() => {
		const syncPkgVersions = async () => {
			for (const pkg of packages) {
				/** @type {PackageVersion} */
				const v = packageVersions[pkg] ?? {};

				if (!v.versions?.length && !v.loading) {
					v.loading = true;
					v.version = '';
					v.versions = [];

					setPackageVersions(p => ({ ...p, [pkg]: v }));

					const res = await fetch(`https://registry.npmjs.org/${pkg}`)

					if (res.status === 200 && res.headers.get('content-type') === 'application/json') {
						const data = await res.json();
						if ('versions' in data) {
							v.versions = Object.keys(data.versions).reverse();
						}
					}

					v.loading = false;
					setPackageVersions(p => ({ ...p, [pkg]: v }));
				}
			}
		};

		syncPkgVersions();
	}, [packages]);

	const _packages = useMemo(() => {
		return packages?.map(p => (
			{
				name: p,
				value: p,
			}
		)) ?? [];
	}, [packages]);

	const url = useMemo(() => {
		const host = 'https://api.nodelayer.xyz';
		const path = `/${arch ?? 'x64'}/layers/generate`;

		const pkgs = packages.map(
			pkg => !!packageVersions?.[pkg]?.version === true ?
				`${pkg}@${packageVersions[pkg].version}` :
				pkg
		);

		const queryStrings = [
			(!!version || !!versions?.[0]?.value) ? `version=${version || versions?.[0]?.value}` : undefined,
			pkgs.length ? `packages=${pkgs.join(',')}` : undefined,
		];

		return `${host}${path}?${queryStrings.filter(q => q).join('&')}`;
	}, [arch, version, versions, packages, packageVersions]);

	useEffect(() => {
		if (typeof props.onURLChange === 'function') props.onURLChange(url);
	}, [props, url]);

  return (
		<div className='p-4 text-[#000] border-b-4 border-[#000] bg-[#e3dff1]'>
			{/* Form */}
			<div className='flex flex-col justify-center items-start gap-8 w-full md:w-[70%] lg:w-[50%]'>
				{/* Autofill card */}
				<div className='rounded-sm bg-[#a388ed] shadow-custom border-2 border-black p-4 w-full'>
					<p className='font-semibold text-lg'>Autofill from package.json</p>
					<p className='text-xs'>Upload your package.json file here to autofill form fields.</p>

					<div className='mt-4'>
						<Button>
							Upload
						</Button>
					</div>
				</div>

				{/* First Question*/}
				<div className='w-full'>
					<label htmlFor="arch" className='mb-1 block'>Do you have a preferred architecture?</label>
					<Select
						name="arch"
						value={arch}
						options={
							[
								{
									name: 'x86_64',
									value: 'x64',
								},
								{
									name: 'ARM64',
									value: 'arm64',
								},
							]
						}
						onChange={(v) => setArch(v)}
					/>
				</div>

				{/* Second Question*/}
				<div className='w-full'>
					<label htmlFor="version" className='mb-1 block'>Do you have a preferred Node.js version?</label>
					<Select
						name="version"
						value={version}
						options={versions}
						loading={loadingVersions}
						onChange={(v) => setVersion(v)}
					/>
				</div>

				{/* Third Question*/}
				<div className='w-full'>
					<label htmlFor="package" className='mb-1 block'>What npm packages are you looking to install?</label>
					<Select
						name="package"
						placeholder="Start typing to search registry"
						value={packages}
						options={prevOpts}
						multiple
						debounce={200}
						closeOnSelect={false}
						nodelayerSpecial
						onAdd={(v) => setPackages(p => Array.from(new Set([...p, v])))}
						onRemove={(v) => setPackages(p => p.filter(i => i != v))}
						getOptions={
							async (query) => {
								query = query.trim();

								if (query === "") return _packages;

								let rows = [], res = await fetch(`https://registry.npmjs.org/-/v1/search?text=${query}&size=50`);

								if (res.status === 200 && res.headers.get('content-type') === 'application/json') {
									const data = await res.json()

									if ('objects' in data && Array.isArray(data.objects)) {
										const { objects } = data;

										rows = objects.map(o => (
											{
												name: o?.package?.name ?? '',
												value: o?.package?.name ?? '',
											}
										));
									}
								}

								setPrevOpts(rows);

								return rows;
							}
						}
					/>

					{
						packages.length ?
							(
								<>
									<p className='text-xl font-bold mt-4'>Summary</p>
									<table className='table-fixed w-full border-2 border-[#000] border-collapse'>
										<tbody>
											<tr className='border-b-4 border-[#000]'>
												<td>
													<table className='table-fixed w-full border-collapse font-bold bg-[#fff]'>
														<tbody>
															<tr>
																<td className='p-1'>Package</td>
																<td className='py-1'>Version</td>
															</tr>
														</tbody>
													</table>
												</td>
											</tr>

											<tr>
												<td className='relative'>
													<div className='max-h-64 overflow-y-scroll overflow-x-hidden w-full'>
														<table className='table-fixed w-full border-collapse bg-[#a388ed]'>
															<tbody>
																{
																	packages.map(pkg => (
																		<tr key={pkg} className='border-b-2 border-[#000] h-[50px]'>
																			<td className='p-1'>{pkg}</td>
																			<td className='py-1 px-2'>
																				<div className='absolute w-[44%] sm:w-[46.5%] mt-[-22px]'>
																					<Select
																						name={`${pkg}-versions`}
																						options={(packageVersions[pkg]?.versions ?? []).map(v => ({ name: v, value: v }))}
																						value={packageVersions[pkg]?.version ?? ''}
																						loading={packageVersions[pkg]?.loading ?? false}
																						onChange={(v) => setPackageVersions(p => ({ ...p, [pkg]: { ...p[pkg], version: v }}))}
																					/>
																				</div>
																			</td>
																		</tr>
																	))
																}
															</tbody>
														</table>
													</div>
												</td>
											</tr>
										</tbody>
									</table>
								</>
							) : null
					}
				</div>

				{/* Generate Button */}
				<div className='w-full'>
					<Button>
						Generate
					</Button>
				</div>
			</div>
		</div>
  )
}


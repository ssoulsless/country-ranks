import CountriesTable from '../components/CountriesTable/CountriesTable';
import Layout from '../components/Layout/Layout';
import SearchInput from '../components/SearchInput/SearchInput';
import styles from '../styles/Home.module.css';
import { useState } from 'react';

export default function Home({ countries }) {
	const [searchText, setSearchText] = useState('');

	const filteredCuntries = countries.filter(
		(country) =>
			country.name.toLowerCase().includes(searchText) ||
			country.region.toLowerCase().includes(searchText) ||
			country.subregion.toLowerCase().includes(searchText)
	);

	const hangleInputChange = (event) => {
		event.preventDefault();

		setSearchText(event.target.value.toLowerCase());
	};

	return (
		<Layout>
			<div className={styles.input_container}>
				<div className={styles.counts}>Found: {countries.length} countries</div>

				<div className={styles.input}>
					<SearchInput
						placeholder='Filter by Name, Region or SubRegion'
						onChange={hangleInputChange}
					/>
				</div>
			</div>

			<CountriesTable countries={filteredCuntries} />
		</Layout>
	);
}

export const getStaticProps = async () => {
	const res = await fetch('https://restcountries.eu/rest/v2/all');
	const countries = await res.json();

	return {
		props: {
			countries,
		},
	};
};

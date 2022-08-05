/*
1. 	buat state/variable untuk nyimpan data hasil fetch ln. 12
		disini initial datanya pake [] karena nanti data yg diambil berupa list
2. 	pakai useEffect sebagai componentDidMount, disini kita bisa call fungsi fetch pokemon ln.14
3. 	pada function async fetch pokemon jangan lupa untuk setData hasil fetch ln. 23
4.	component yang akan dirender karena berbentuk list bisa pakai maping, ln. 32
		bisa diberi kondisi komponen akan dirender ketika datanya tidak kosong
*/
import React from 'react'

export const FetchComponent = () => {
  const [data, setData] = React.useState([]);

	React.useEffect(() => {
		getPokemon();
	}, [])

	const getPokemon = async () => {
		try {
			const response = await fetch('https://pokeapi.co/api/v2/pokemon/');
      const pokemons = await response.json();

			setData(pokemons.results)
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<div style={{padding: 30}}>
			<div>POKEMON LIST</div>
			{!!data.length && data.map((pokemon, i) => (
				<>
					<div key={i}>{pokemon.name} • {pokemon.url}</div>
				</>
			))}
			{!data.length && (
				<div>Empty Component</div>
			)}
		</div>
	)
}
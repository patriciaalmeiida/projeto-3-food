import axios from 'axios';
import { useState } from 'react';
import { BeerType } from '../../types/beerType';

const Beer = () => {

	//const stringVazia = ""
	//const listaVazia = []
	//const funcaoVazia = ()=>{}

	const [beerList, setBeerList] = useState<BeerType[]>([])

	const showBeer = () => {
		axios.get('https://api.punkapi.com/v2/beers/?per_page=8')
			.then(resposta => {
				setBeerList(resposta.data)
			})
	}

	return (
		<div className="food-beer-list food-shop">

			<h1>Tipos de Cerveja</h1>
			<button onClick={showBeer}>Buscar Cerveja</button>
			<div className="beers-list">
				{
					beerList.map(beer => <div key={beer.id} className="beer">
						<img src={beer.image_url} alt="Buzz" />
						<h3>{beer.name}</h3>
						<span>{beer.tagline}</span>
						<small>{beer.description}.</small>
					</div>)
				}
			</div>
		</div>
	);
}

export default Beer;
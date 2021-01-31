import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { CategoryType } from '../../types/categoryType';
import { FoodType } from '../../types/foodType';

const Foods = () => {

  const [categoryList, setCategoryList] = useState<CategoryType[]>([])
  const [selectedCategory, setSelectedCategory] = useState<String>("")
  const [foodList, setFoodList] = useState<FoodType[]>([])

  // Este efeito é executado quando a aplicação inicia
  useEffect(() => {
    getCategories()
  }, [])

  useEffect(() => {
    if (categoryList.length > 0) {
      setSelectedCategory(categoryList[0].strCategory)
    }
  }, [categoryList])

  useEffect(() => {
    if (categoryList.length > 0) {
      getFoodsByCategory()
    }
  }, [selectedCategory])


  const getCategories = () => {
    axios.get('https://www.themealdb.com/api/json/v1/1/categories.php')
      .then(resposta => {
        setCategoryList(resposta.data.categories)
      })
  }

  const getFoodsByCategory = () => {
    axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${selectedCategory}`)
      .then(resposta => {
        setFoodList(resposta.data.meals)
      })
  }

  const searchFoodOrCategory = (text: string) => {
    axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${text}`)
      .then(resposta => {
        setFoodList(resposta.data.meals)
      })
  }

  return (
    <div className="food-beer-list food-shop">
      <h1>Tipos de pratos</h1>
      <p>
        Selecione uma categoria ou digite a comida (em inglês):
        <input
          type="text"
          placeholder="Digite a comida..."
          onChange={(event) => searchFoodOrCategory(event.target.value) }
        />
      </p>

      <ul>
        {
          categoryList.map(category => <li onClick={() => setSelectedCategory(category.strCategory)}>{category.strCategory}</li>)
        }
      </ul>
      <h2>Tipo selecionado: <strong>{selectedCategory}</strong></h2>

      <div className="food-container">
        {
          foodList.map(food => <div className="food-item">
            <img src={food.strMealThumb} />
            <p>{food.strMeal}</p>
          </div>)
        }
      </div>
    </div>
  );
}

export default Foods;
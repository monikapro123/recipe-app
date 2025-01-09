const searchBox=document.querySelector('.searchBox');
const searchBtn=document.querySelector('.searchBtn');
const recipecontainer=document.querySelector('.recipe-container');
const closebtn=document.querySelector('.close-btn');
const recipesdetailscontent=document.querySelector('.recipes-details-content');



const searchRecipes=async function (){
  
  recipecontainer.innerHTML=`<h2 class="text-3xl text-white">fetching recipes...</h2>`

  const query=searchBox.value.trim();
  const data=await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
  const response=await data.json();

  recipecontainer.innerHTML="";


  response.meals.forEach(meal => {
    console.log(meal);
    const recipesCard=document.createElement("div");
    recipesCard.innerHTML=`<img src="${meal.strMealThumb}" class="h-60 p-2">
    <h2>${meal.strMeal}</h2>
    <p>${meal.strArea}<p>
    
    `
    
    recipesCard.className="flex text-1xl rounded shadow-lg shadow-2xl bg-white h-96 w-64 justify-center items-center my-10 mx-16 flex-col";
    const recipebtn=document.createElement('button');
    recipebtn.className="bg-red-700 text-white px-10 rounded-3xl py-2 mb-2 mt-3";
    recipebtn.innerHTML="view recipe";

    recipesCard.appendChild(recipebtn);
    recipecontainer.appendChild(recipesCard);
    
    recipebtn.addEventListener('click',()=>{
      openRecipePopUp(meal);
    })
    
  });

  
}

const openRecipePopUp=(meal)=>{
  recipesdetailscontent.innerHTML=`<h2>Recipe Details${meal.strMeal}</h2>
  <p>${meal.strInstructions}</p>`;
  recipesdetailscontent.parentElement.style.display="block";
}

closebtn.addEventListener('click',()=>{
  recipesdetailscontent.parentElement.style.display="none";})

searchBtn.addEventListener('click',(e)=>{
    e.preventDefault();
searchRecipes();
})
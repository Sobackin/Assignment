

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2OWJlZGJjYWY1M2UxM2RmZmFiYzM3MWI1ZWNlOGEyOSIsInN1YiI6IjY2MjhhNmFjMTc2YTk0MDE3ZjgyZmJlOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.cPZRvaS4O5UB76gkR75WPevxbPE8hBLORMhsLzJ7JM0",
  },
};

fetch(
  "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
  options
)
  .then((response) => response.json())
  .then((response) => {
    movies = response.results
    addDiv(movies);
  })
  .catch(err => console.error(err));

function addDiv(movies) {
  const cardGrid = document.querySelector(".cards");
  movies.forEach((a) => {
    // console.log(a);
    let movieId = a["id"];
    let moviePoster = a["poster_path"];
    let movieTitle = a["title"];
    let movieSummary = a["overview"];
    let movieRating = a["vote_average"];

    let newDiv = document.createElement("div");
    newDiv.className = "card";

    let addCard = `
        <div class='cardBody' id='${movieId}' onclick="alert('영화 ID: ${movieId}')" >
        <img class='cardHead' src='https://image.tmdb.org/t/p/w500${moviePoster}' 
        style="width: 300px; height: 450px;"alt='card poster'>
        
        <h3 class='cardTitle'>${movieTitle}</h3>
        <p class='cardSummary'>${movieSummary}</p>
        <p class='cardRating'>평점 : ${movieRating}</p> 
        </div>`;

    newDiv.innerHTML = addCard;
   
    cardGrid.append(newDiv);
  });
}

//선민님의 도움으로 가능! input 입력하면 자동으로 해당 제목 뜸
// const searchInput = document.querySelector(".searchText");

// searchInput.addEventListener('input', function() {
//   const searchTerm = searchInput.value.toLowerCase();
//   const movieCards = document.querySelectorAll('.card');

//   movieCards.forEach(card => {
//       const title = card.querySelector('.cardTitle').textContent.toLowerCase();
//       if (title.includes(searchTerm)) {
//           card.style.display = 'block';
//       } else {
//           card.style.display = 'none';
//       }
//   });
// });

// 안되는 검색 기능 ㅠ

const searchInput = document.querySelector(".searchText");
const searchButton = document.querySelector(".searchBtn");

const searchMovies = () => {
  const searchTitle = searchInput.value.toLowerCase(); //검색하고자 입력한 값 소문자로 바꿈

while (searchTitle) { //반복할 것? 검색 -> 해당 제목 있는 카드 건져내기 -> 남기기 -> 나머지 지우기 
  const createdCard = document.querySelector(".card"); // 위에서 만들어진 card 가져옴 
  const lowerTitle = createdCard.querySelector('.cardTitle').textContent.toLowerCase(); // 카드 내 제목 가져옴, 소문자로 바꿈

  const filteredMovies = createdCard.filter((search) =>
  search.lowerTitle.include(searchTitle)
  );

  if(filteredMovies) {
    card.style.display = "block";
  } else {
    card.style.display = "none";
  }

  console.log(filteredMovies);
}
  };
  

  searchInput.addEventListener("input", searchMovies);
searchButton.addEventListener("click", searchMovies);
searchInput.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    searchMovies();
  }
});
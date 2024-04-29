const movieCardList = document.querySelector(".cards");
//dom 요소 변수 설정해주기, html에서 카드 붙일 공간인 cards 요소를 가져옴
const searchInput = document.querySelector(".searchText");
const searchButton = document.querySelector(".searchBtn");


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
  // 오픈 API 복붙!
  .then((response) => {
    movies = response.results
    addCardDiv(movies);
  })
  .catch(err => console.error(err));



const createCardDiv = (movie) => {
  const { id, poster_path, title, overview, vote_average } = movie;
  // 화살표 함수 사용. movie가 addCardDiv 함수의 매개변수가 된다.
  // 그리고 오픈 API에서 가져올 내용을 객체 구조 분해 할당을 사용해 입력/추출

  const card = document.createElement("div");
  const moviePoster = document.createElement("img");
  const movieTitle = document.createElement("h3");
  const movieSummary = document.createElement("p");
  const movieRating = document.createElement("p");
  //영화 카드를 만들기 위한 dom요소, 각각 맞는 요소를 넣어준다.

  card.setAttribute("id", id);
  //<div class="cardBody" 안에 id="가져온 id"추가 >
  card.className = "cardBody";
  moviePoster.className = "cardHead";
  movieTitle.className = "cardTitle";
  movieSummary.className = "cardSummary";
  movieRating.className = "cardRating";
  // 각각의 dom 요소에 클래스 이름 설정

  moviePoster.src = `https://image.tmdb.org/t/p/w500${poster_path}`;
  //주소는 못 찾아서 예시에서 복붙했다 ,, 이거맞나ㅠ
  movieTitle.textContent = title;
  movieSummary.textContent = overview;
  movieRating.textContent = `평점 : ${vote_average}`;
  //이미지 주소와 textcontent를 통해 각 dom 요소에 넣을 API 내용을 설정했다.

  card.appendChild(moviePoster);
  card.appendChild(movieTitle);
  card.appendChild(movieSummary);
  card.appendChild(movieRating);
  // div 카드 안에 child로 하나하나 넣어주기

  return card; //카드 만들기 완료!
};

const addCardDiv = (movies) => {
  movies.forEach((movie) => {
    const movieCard = createCardDiv(movie);
    movieCardList.appendChild(movieCard);
    // 생성한 카드를 붙여넣는 과정, forEach를 통해 반복해 붙이기!

    movieCard.addEventListener("click", () => {
      const movieId = movieCard.getAttribute("id");
      alert(`영화 ID : ${movieId}`);
    }); // 생성한 카드에 클릭 이벤트 추가, 저장해둔 id를 가져와(get) 클릭 시 alert이 뜨도록 함
});
};


const searchMovies = () => {
  const searchTitle = searchInput.value.toLowerCase();
  const filteredMovies = movies.filter((movie) =>
  movie.title.toLowerCase().includes(searchTitle)
  );
  
  while (movieCardList.firstChild) {
    movieCardList.firstChild.remove();
  }
  addCardDiv(filteredMovies);
  event.preventDefault();
};

searchButton.addEventListener("click", searchMovies);
searchInput.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    searchMovies();
  }
});
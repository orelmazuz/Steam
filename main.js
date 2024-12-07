//import { GAME } from "./game.js";
//import { ajaxCall } from "./ajaxCall.js";
let mainD = document.getElementById("main");

GAME.forEach((game, index) => {
  const gameDiv = document.createElement("div");
  gameDiv.classList.add("card");
  //combine all to one innerHtml
  gameDiv.innerHTML += `<img src="${game.Header_image}">`;
  gameDiv.innerHTML += `<h3>${game.Name}</h3>`;
  gameDiv.innerHTML += `<h4>${game.Release_date}</h4>`;
  gameDiv.innerHTML += `<h4>${game.Developers}</h4>`;
  gameDiv.innerHTML += `<h4>${game.Price}$</h4>`;
  gameDiv.innerHTML += `<button type="button" id="${game.AppID}">Add to MyGAMES</button>
`;

  mainD.appendChild(gameDiv);
});

mainD.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    // console.log(e.target.id);
    GAME.forEach((game) => {
      if (game.AppID == e.target.id) {
        let GameToPost = {
          AppID: game.AppID,
          Name: game.Name,
          ReleaseDate: new Date(game.Release_date).toLocaleDateString(),
          Price: game.Price,
          Description: game.description,
          HeaderImage: game.Header_image,
          Website: game.Website,
          Windows: game.Mac == "TRUE",
          Mac: game.Mac == "TRUE",
          Linux: game.Mac == "TRUE",
          ScoreRank: game.Score_rank,
          Recommendations: game.Recommendations,
          Publisher: game.Developers,
        };
        console.log(GameToPost);

        const api = "https://localhost:7198/api/Games";
        ajaxCall(
          "POST",
          api,
          JSON.stringify(GameToPost),
          postGameSCB,
          postGameECB
        );
        function postGameSCB(status) {
          console.log(status);
        }
        function postGameECB(err) {
          console.log(err);
        }
      }
    });
  }
});

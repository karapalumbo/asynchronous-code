$(function () {
  const BASE_URL = "https://deckofcardsapi.com/api/deck";

  $.getJSON(`${BASE_URL}/new/draw/`).then((res) => {
    let { suit, value } = res.data.cards[0];
    console.log(`${value.toLowerCase()} of ${suit.toLowerCase()}`);
  });

  let firstCard = null;
  $.getJSON(`${BASE_URL}/new/draw/`)
    .then((res) => {
      firstCard = res.data.cards[0];
      let deckId = res.data.deck_id;
      return $.getJSON(`${BASE_URL}/${deckId}/draw/`);
    })
    .then((res) => {
      let secondCard = res.cards[0];
      [firstCard, secondCard].forEach(function (card) {
        console.log(
          `${card.value.toLowerCase()} of ${card.suit.toLowerCase()}`
        );
      });
    });

  let deckId = null;
  let $btn = $("button");
  let $cardsContainer = $("#cards");

  $.getJSON(`${BASE_URL}/new/shuffle/`).then((data) => {
    deckId = data.deck_id;
    $btn.show();
  });

  $btn.on("click", function () {
    $.getJSON(`${BASE_URL}/${deckId}/draw/`).then((data) => {
      let cardSrc = data.cards[0].image;
      let angle = Math.random() * 90 - 45;
      let randomX = Math.random() * 40 - 20;
      let randomY = Math.random() * 40 - 20;
      $cardsContainer.append(
        $("<img>", {
          src: cardSrc,
          css: {
            transform: `translate(${randomX}px, ${randomY}px) rotate(${angle}deg)`,
          },
        })
      );
      if (data.remaining === 0) $btn.remove();
    });
  });
});


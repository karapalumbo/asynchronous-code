let baseURL = "https://deckofcardsapi.com/api/deck";

const deck = {
  async getCard() {
    let res = await axios.get(`${baseURL}/new/draw/?count=1`);
    let { suit, value } = res.data.cards[0];
    console.log(`${value.toLowerCase()} of ${suit.toLowerCase()}`);
  },
  async getTwoCards() {
    let firstCard = await axios.get(`${baseURL}/new/draw/`);
    let deckId = firstCard.data.deck_id;
    let secondCard = await axios.get(`${baseURL}/${deckId}/draw/`);
    [firstCard.data.cards[0], secondCard.data.cards[0]].forEach(function (
      card
    ) {
      console.log(`${card.value.toLowerCase()} of ${card.suit.toLowerCase()}`);
    });
  },
  async displayCards() {
    let $btn = $("button");
    let $cardsContainer = $("#cards");

    let deck = await axios.get(`${baseURL}/new/shuffle/`);
    $btn.show().on("click", async function () {
      let res = await axios.get(`${baseURL}/${deck.data.deck_id}/draw/`);
      let cardSrc = res.data.cards[0].image;
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
      if (res.remaining === 0) $btn.remove();
    });
  },
};

// deck.getCard();
// deck.getTwoCards();
deck.displayCards();

export class Card {
  constructor(readonly name: string, readonly description: string, readonly deck: Deck) {}

  discard() {
    this.deck.discard(this);
  }
}

export class CardCollection {
  constructor(private readonly cards: Card[]) {}

  draw(): Card | undefined {
    return this.cards.shift();
  }

  hasCard(card: Card): Boolean {
    return this.cards.includes(card);
  }

  add(card: Card) {
    this.cards.push(card);
  }

  remove(card: Card): Boolean {
    const index = this.cards.findIndex((c) => c === card);
    if (index >= 0) {
      this.cards.splice(index, 1);
      return true;
    }
    return false;
  }

  get isEmpty(): Boolean {
    return this.cards.length === 0;
  }

  get showCards(): Card[] {
    return this.cards;
  }
}

export class Deck {
  readonly drawPile: CardCollection;
  readonly discardPile: CardCollection;

  constructor(readonly name: string, cardDefinitions: { name: string; description?: string }[]) {
    this.drawPile = new CardCollection(cardDefinitions.map((c) => new Card(c.name, c.description || "", this)));
    this.discardPile = new CardCollection([]);
  }

  draw(): Card | undefined {
    return this.drawPile.draw();
  }

  discard(card: Card) {
    if (card.deck !== this) {
      throw new Error("Cannot discard a card from a different deck");
    }

    if (this.drawPile.hasCard(card)) {
      throw new Error("Cannot discard a card that is still in the draw pile");
    }
    this.discardPile.add(card);
  }

  shuffle() {
    shuffle(this.drawPile.showCards);
  }
}

function shuffle(cards: Card[]) {
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }
}

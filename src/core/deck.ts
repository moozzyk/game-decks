export class Card {
  constructor(readonly name: string, readonly description: string, readonly deck: Deck) {}

  discard() {
    this.deck.discard(this);
  }
}

export class Deck {
  readonly cards: Card[];
  readonly discardPile: Card[] = [];

  constructor(readonly name: string, readonly cardsDefinitions: { name: string; description: string }[]) {
    this.cards = cardsDefinitions.map((c) => new Card(c.name, c.description, this));
  }

  get isEmpty(): Boolean {
    return this.cards.length === 0;
  }

  shuffle() {
    for (let i = this.cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
    }
  }

  draw(): Card | undefined {
    return this.cards.shift();
  }

  discard(card: Card) {
    if (card.deck !== this) {
      throw new Error("Cannot discard a from a different deck");
    }

    if (this.cards.includes(card)) {
      throw new Error("Cannot discard a card that is still in the deck");
    }
    this.discardPile.push(card);
  }
}

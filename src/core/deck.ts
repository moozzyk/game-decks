export class Card {
  constructor(readonly name: string, readonly description: string, readonly deck: Deck) {}

  discard() {
    this.deck.discard(this);
  }
}

export class Deck {
  readonly drawPile: Card[];
  readonly discardPile: Card[] = [];

  constructor(readonly name: string, readonly cardsDefinitions: { name: string; description: string }[]) {
    this.drawPile = cardsDefinitions.map((c) => new Card(c.name, c.description, this));
  }

  get isEmpty(): Boolean {
    return this.drawPile.length === 0;
  }

  shuffle() {
    for (let i = this.drawPile.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.drawPile[i], this.drawPile[j]] = [this.drawPile[j], this.drawPile[i]];
    }
  }

  draw(): Card | undefined {
    return this.drawPile.shift();
  }

  discard(card: Card) {
    if (card.deck !== this) {
      throw new Error("Cannot discard a from a different deck");
    }

    if (this.drawPile.includes(card)) {
      throw new Error("Cannot discard a card that is still in the deck");
    }
    this.discardPile.push(card);
  }
}

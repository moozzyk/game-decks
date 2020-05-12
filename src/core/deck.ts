type Card = {
  name: string;
  description: string;
};

class Deck {
  constructor(readonly name: string, readonly cards: Card[]) {}

  get isEmpty(): Boolean {
    return this.cards.length > 0;
  }

  shuffle(): void {
    for (let i = this.cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
    }
  }

  draw(): Card | undefined {
    return this.cards.shift();
  }
}

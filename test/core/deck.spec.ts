import { Deck } from "../../src/core/deck";

describe("Deck", () => {
  describe("isEmpty", () => {
    it("should be false if deck not empty", () => {
      const deck = new Deck("test-deck", [{ name: "Ace", description: "" }]);
      expect(deck.isEmpty).toBe(false);
    });

    it("should be true after drawing last card", () => {
      const deck = new Deck("test-deck", [{ name: "Ace", description: "" }]);
      deck.draw();
      expect(deck.isEmpty).toBe(true);
    });
  });

  describe("discard", () => {
    it("discard pile should be empty by default", () => {
      const deck = new Deck("test-deck", [{ name: "Ace", description: "" }]);
      expect(deck.discardPile).toStrictEqual([]);
    });
  });
});

describe("Card", () => {
  describe("discard", () => {
    it("discard pile should contain discarded card", () => {
      const deck = new Deck("test-deck", [{ name: "Ace", description: "" }]);
      const card = deck.draw()!;
      card.discard();
      expect(deck.discardPile).toStrictEqual([card]);
    });
  });
});

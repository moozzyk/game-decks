import { Deck } from "../../src/core/deck";

describe("Deck", () => {
  describe("drawPile", () => {
    it("should not be false if contains cards", () => {
      const deck = new Deck("test-deck", [{ name: "Ace" }]);
      expect(deck.drawPile.isEmpty).toBe(false);
    });

    it("should be empty after drawing last card", () => {
      const deck = new Deck("test-deck", [{ name: "Ace" }]);
      deck.draw();
      expect(deck.discardPile.isEmpty).toBe(true);
    });
  });

  describe("discardPile", () => {
    it("discard pile should be empty by default", () => {
      const deck = new Deck("test-deck", [{ name: "Ace" }]);
      expect(deck.discardPile.isEmpty).toBe(true);
    });

    it("discard pile should not be empty after card is discarded", () => {
      const deck = new Deck("test-deck", [{ name: "Ace" }]);
      const card = deck.draw();
      deck.discard(card!);
      expect(deck.discardPile.isEmpty).toBe(false);
    });
  });

  describe("draw", () => {
    it("returns undefined if draw pile empty", () => {
      const deck = new Deck("test-deck", [{ name: "Ace" }]);
      expect(deck.draw()).not.toBeUndefined();
      expect(deck.draw()).toBeUndefined();
    });
  });

  describe("shuffle", () => {
    it("rearranges cards", () => {
      const randomMock = jest.spyOn(global.Math, "random").mockReturnValue(0.2);
      const deck = new Deck("test-deck", [{ name: "Ace" }, { name: "Joker" }]);
      const originalOrder = [...deck.drawPile.showCards];
      deck.shuffle();
      expect(deck.drawPile.showCards).not.toStrictEqual(originalOrder);
      randomMock.mockRestore();
    });
  });
});

describe("Card", () => {
  describe("discard", () => {
    it("discard pile should contain discarded card", () => {
      const deck = new Deck("test-deck", [{ name: "Ace", description: "" }]);
      const card = deck.draw()!;
      card.discard();
      expect(deck.discardPile.showCards).toStrictEqual([card]);
    });
  });
});

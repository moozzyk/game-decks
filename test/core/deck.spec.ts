import { Deck } from "../../src/core/deck";

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

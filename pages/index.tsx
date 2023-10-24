import Card from "./Card";
import type { Card as CardType } from "types/data";
import { useState, useEffect } from "react";
import CardCreator from "./CardCreator";

export default () => {
  const [cards, setCards] = useState([] as CardType[]);

  useEffect(() => {
    fetch("/api/get")
      .then((res) => res.json())
      .then(setCards)
      .catch(console.error);
  }, []);

  return (
    <main>
      <CardCreator setCards={setCards} />
      {cards.map((card) => (
        <Card key={card.id} {...card} setCards={setCards} />
      ))}
    </main>
  );
};

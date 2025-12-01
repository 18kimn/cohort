export type Card = {
  id: number;
  creationTime: Date;
  content: string;
  x: number;
  y: number;
};

export type Bet = {
  better: string;
  amount: number;
  date: Date;
};

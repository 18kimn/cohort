import Database from "better-sqlite3";

const db = new Database("db.sqlite", { verbose: console.log });

db.prepare(
  `CREATE TABLE IF NOT EXISTS cards (
id INTEGER PRIMARY KEY,
creationTime INTEGER,
title STRING,
content STRING,
x REAL,
y REAL
)`
).run();

export default db;

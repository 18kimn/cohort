import Database from "better-sqlite3";

const db = new Database("db.sqlite", { verbose: console.log });

db.exec(
  `CREATE TABLE IF NOT EXISTS cards (
id INTEGER PRIMARY KEY,
creationTime INTEGER,
title STRING,
content STRING,
x REAL,
y REAL
  );`)

db.exec(`DROP TRIGGER IF EXISTS row_limit_trigger;`)

db.exec(
`CREATE TRIGGER row_limit_trigger
AFTER INSERT ON cards
BEGIN
    SELECT CASE
        WHEN (SELECT COUNT(*) FROM cards) > 10 THEN
            -- If the row count exceeds the limit, raise an exception
            RAISE(FAIL, 'Row limit exceeded')
    END;
END;`
)

export default db;

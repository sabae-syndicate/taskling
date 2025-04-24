-- Up Migration

CREATE TABLE IF NOT EXISTS "interactions" (
    "interaction" TEXT PRIMARY KEY
);

INSERT INTO interactions (interaction)
VALUES
('kudos'),			-- celebrating an accomplishment
('encouragement'),	-- acknowledging lack of progress
('invite'),			-- invited/added to project
('assignment'),		-- assigned to a task
('request');		-- friend request

CREATE TABLE IF NOT EXISTS "user_interactions" (
    "id" SERIAL PRIMARY KEY,
    "sender_id" INT NOT NULL,
    "receiver_id" INT NOT NULL,
    "interaction_type" TEXT NOT NULL REFERENCES interactions (interaction),
    "created_at" TIMESTAMP DEFAULT now(),
    "dismissed" BOOLEAN NOT NULL DEFAULT false
);


-- Down Migration

DROP TABLE "user_interactions";
DROP TABLE "interactions";

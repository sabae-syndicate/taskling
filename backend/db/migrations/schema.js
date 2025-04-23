CREATE TABLE "Users" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR(50) UNIQUE NOT NULL,
    "email" VARCHAR(100) UNIQUE,
    "password_hash" TEXT NOT NULL,
    "created_at" TIMESTAMP,
    "default_privacy" INT,
    "show_activity" BOOL,
    "avatar_frame" TEXT,
    "profile_background" TEXT
  );

  CREATE TABLE "Tasks" (
    "id" SERIAL PRIMARY KEY,
    "user_id" INT,
    "title" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "status" VARCHAR(50),
    "due_date" DATE,
    "completed" BOOLEAN,
    "created_at" TIMESTAMP,
    "completed_at" TIMESTAMP,
    "parent_task" INT,
    "priority" INT,
    "project_id" INT
  );

  CREATE TABLE "Projects" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "created_by" INT,
    "created_at" TIMESTAMP,
    "due_date" DATE
  );

  CREATE TABLE "Friends" (
    "id" SERIAL PRIMARY KEY,
    "user1_id" INT,
    "user2_id" INT,
    "pending" BOOL,
    "requested_at" TIMESTAMP,
    "confirmed_at" TIMESTAMP
  );

  CREATE TABLE "User_Interactions" (
    "id" SERIAL PRIMARY KEY,
    "sender_id" INT,
    "receiver_id" INT,
    "interaction_type" VARCHAR(50) NOT NULL,
    "created_at" TIMESTAMP
  );

  CREATE TABLE "Interactions" (
    "interaction" VARCHAR(50) PRIMARY KEY
  );

  CREATE TABLE "Shop_Items" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR(100) NOT NULL,
    "description" TEXT,
    "category" VARCHAR(50) NOT NULL,
    "price" INT NOT NULL,
    "image_url" TEXT,
    "created_at" TIMESTAMP
  );

  CREATE TABLE "User_Purchases" (
    "id" SERIAL PRIMARY KEY,
    "user_id" INT,
    "item_id" INT,
    "purchased_at" TIMESTAMP
  );

  CREATE TABLE "Statuses" (
    "status" VARCHAR(50) PRIMARY KEY
  );

  ALTER TABLE "Tasks" ADD FOREIGN KEY ("user_id") REFERENCES "Users" ("id") ON DELETE CASCADE;

  ALTER TABLE "Tasks" ADD FOREIGN KEY ("parent_task") REFERENCES "Tasks" ("id");

  ALTER TABLE "Projects" ADD FOREIGN KEY ("created_by") REFERENCES "Users" ("id") ON DELETE SET NULL;

  ALTER TABLE "Friends" ADD FOREIGN KEY ("user1_id") REFERENCES "Users" ("id") ON DELETE CASCADE;

  ALTER TABLE "Friends" ADD FOREIGN KEY ("user2_id") REFERENCES "Users" ("id") ON DELETE CASCADE;

  ALTER TABLE "User_Interactions" ADD FOREIGN KEY ("sender_id") REFERENCES "Users" ("id") ON DELETE CASCADE;

  ALTER TABLE "User_Interactions" ADD FOREIGN KEY ("receiver_id") REFERENCES "Users" ("id") ON DELETE CASCADE;

  ALTER TABLE "User_Purchases" ADD FOREIGN KEY ("user_id") REFERENCES "Users" ("id") ON DELETE CASCADE;

  ALTER TABLE "User_Purchases" ADD FOREIGN KEY ("item_id") REFERENCES "Shop_Items" ("id") ON DELETE CASCADE;

  ALTER TABLE "Tasks" ADD FOREIGN KEY ("status") REFERENCES "Statuses" ("status");

  ALTER TABLE "User_Interactions" ADD FOREIGN KEY ("interaction_type") REFERENCES "Interactions" ("interaction") ON DELETE CASCADE;

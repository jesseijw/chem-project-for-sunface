import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const attempts = sqliteTable("attempts", {
  id: text("id").primaryKey(), userId: text("user_id").notNull(), questionId: text("question_id").notNull(),
  mode: text("mode").notNull(), answer: text("answer").notNull(), workJson: text("work_json").notNull(),
  status: text("status").notNull(), answerCorrect: integer("answer_correct", { mode: "boolean" }),
  reasoningStatus: text("reasoning_status").notNull(), firstUnsupportedStep: integer("first_unsupported_step"),
  assisted: integer("assisted", { mode: "boolean" }).notNull().default(false), state: text("state").notNull(),
  idempotencyKey: text("idempotency_key").notNull().unique(), createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
});

export const learnerState = sqliteTable("learner_state", {
  userId: text("user_id").primaryKey(), currentState: text("current_state").notNull().default("TRY"),
  revisitDueAt: integer("revisit_due_at", { mode: "timestamp" }), completedCount: integer("completed_count").notNull().default(0),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
});

export const reflections = sqliteTable("reflections", {
  id: text("id").primaryKey(), userId: text("user_id").notNull(), text: text("text").notNull(),
  private: integer("private", { mode: "boolean" }).notNull().default(true), createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
});

export const externalResponses = sqliteTable("external_responses", {
  id: text("id").primaryKey(), userId: text("user_id").notNull(),
  resourceUrl: text("resource_url").notNull(), resourceLabel: text("resource_label").notNull(),
  questionLabel: text("question_label").notNull(), response: text("response").notNull(),
  status: text("status").notNull().default("draft"), createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
});

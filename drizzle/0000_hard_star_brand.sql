CREATE TABLE `attempts` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`question_id` text NOT NULL,
	`mode` text NOT NULL,
	`answer` text NOT NULL,
	`work_json` text NOT NULL,
	`status` text NOT NULL,
	`answer_correct` integer,
	`reasoning_status` text NOT NULL,
	`first_unsupported_step` integer,
	`assisted` integer DEFAULT false NOT NULL,
	`state` text NOT NULL,
	`idempotency_key` text NOT NULL,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `attempts_idempotency_key_unique` ON `attempts` (`idempotency_key`);--> statement-breakpoint
CREATE TABLE `learner_state` (
	`user_id` text PRIMARY KEY NOT NULL,
	`current_state` text DEFAULT 'TRY' NOT NULL,
	`revisit_due_at` integer,
	`completed_count` integer DEFAULT 0 NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `reflections` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`text` text NOT NULL,
	`private` integer DEFAULT true NOT NULL,
	`created_at` integer NOT NULL
);

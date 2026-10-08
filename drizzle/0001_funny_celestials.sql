CREATE TABLE `external_responses` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`resource_url` text NOT NULL,
	`resource_label` text NOT NULL,
	`question_label` text NOT NULL,
	`response` text NOT NULL,
	`status` text DEFAULT 'draft' NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);

ALTER TABLE `orders` ADD `price` real NOT NULL;--> statement-breakpoint
ALTER TABLE `orders` ADD `price_paid` real DEFAULT 0;
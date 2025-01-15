CREATE TABLE `orders` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`customerId` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `products_orders` (
	`order_id` integer PRIMARY KEY NOT NULL,
	`product_id` integer,
	FOREIGN KEY (`order_id`) REFERENCES `orders`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
ALTER TABLE `products` ALTER COLUMN "stock" TO "stock" integer NOT NULL;
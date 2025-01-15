PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_products_orders` (
	`order_id` integer PRIMARY KEY NOT NULL,
	`product_id` integer
);
--> statement-breakpoint
INSERT INTO `__new_products_orders`("order_id", "product_id") SELECT "order_id", "product_id" FROM `products_orders`;--> statement-breakpoint
DROP TABLE `products_orders`;--> statement-breakpoint
ALTER TABLE `__new_products_orders` RENAME TO `products_orders`;--> statement-breakpoint
PRAGMA foreign_keys=ON;
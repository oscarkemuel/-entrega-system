-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_DeliveryRequest" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "delivery_time" DATETIME NOT NULL,
    "status" TEXT NOT NULL,
    "place_id" TEXT NOT NULL,
    "customer_id" TEXT NOT NULL,
    "seller_id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "quantity" INTEGER,
    "days" INTEGER,
    CONSTRAINT "DeliveryRequest_place_id_fkey" FOREIGN KEY ("place_id") REFERENCES "CustomerPlace" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "DeliveryRequest_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "Customer" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "DeliveryRequest_seller_id_fkey" FOREIGN KEY ("seller_id") REFERENCES "Seller" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "DeliveryRequest_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_DeliveryRequest" ("customer_id", "delivery_time", "id", "place_id", "productId", "quantity", "seller_id", "status") SELECT "customer_id", "delivery_time", "id", "place_id", "productId", "quantity", "seller_id", "status" FROM "DeliveryRequest";
DROP TABLE "DeliveryRequest";
ALTER TABLE "new_DeliveryRequest" RENAME TO "DeliveryRequest";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

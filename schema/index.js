import { WidgetsFactory } from "@itsy-ui/core";
const dataLoader = WidgetsFactory.instance.services["DataLoaderFactory"];
const schemaProvider = dataLoader.getLoader("appSchemaProvider");

schemaProvider.putSchema("/app/cart/form/cart/data", require("./app/cart/form/cart.json"));
schemaProvider.putSchema("/app/product/form/product/data", require("./app/product/form/product.json"));
schemaProvider.putSchema("/app/product/grid/product/data", require("./app/product/grid/product.json"));
schemaProvider.appendSchemaSync("/app/locale/en", require("./locale/en.json"));
schemaProvider.putSchema("/app/cart/grid/cart/data", require("./app/cart/grid/cart.json"));
schemaProvider.putSchema("/app/product/card/product/data", require("./app/product/card/product.json"));
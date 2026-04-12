import { Product } from "../../data/products.js";
describe("Test suits: Product", () => {
  it("has correct properties and methods", () => {
    const productDetails = [
      {
        id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
        image: "images/products/intermediate-composite-basketball.jpg",
        name: "Intermediate Size Basketball",
        rating: {
          stars: 4,
          count: 127,
        },
        priceCents: 2095,
      },
    ];
    const product = new Product(productDetails[0]);
    expect(product.name).toEqual("Intermediate Size Basketball");
    expect(product.getPrice()).toEqual("$20.95");
  });
});

("use strict");
const stripe = require("stripe")("sk_test_51N1lVbSJGhSW9JJWMTivK3PARgdxbOkHA4wO0aSXsausjKjWxeIlQfO9lre5Lp9sAaw1O1NleXgUT9eRMTEIWzpJ00ggtrdoLZ");
/**
 * order controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::order.order", ({ strapi }) => ({
  async create(ctx) {
    const { products } = ctx.request.body;
    try {
      const lineItems = await Promise.all(
        products.map(async (product) => {
          const item = await strapi
            .service("api::product.product")
            .findOne(product.id);

          return {
            price_data: {
              currency: "inr",
              product_data: {
                name: item.title,
              },
              unit_amount: Math.round(item.price * 100),
            },
            quantity: product.attributes.quantity,
          };
        })
      );

      const session = await stripe.checkout.sessions.create({
        shipping_address_collection: { allowed_countries: ["IN"] },
        payment_method_types: ["card"],
        mode: "payment",
        success_url: "http://localhost:3000" + "/success",
        cancel_url: "http://localhost:3000" + "?success=false",
        line_items: lineItems,
      });

      await strapi
        .service("api::order.order")
        .create({ data: { products, stripeId: session.id } });
      console.log(session);
      return { stripeSession: session };
    } catch (error) {
      ctx.response.status = 500;
      console.log("err");
      return { error };
    }
  },
}));
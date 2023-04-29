"use strict";

/**
 * product controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::product.product", {
  async create(ctx) {
    const user = ctx.state.user;
    const product = await super.create(ctx);
    const updated = await strapi.entityService.update(
      "api::product.product",
      product.data.id,
      {
        data: {
          user: user.id,
        },
      }
    );
    return updated;
  },
  async find(ctx) {
    const user = ctx.state.user;

    ctx.query.filters = {
      ...(ctx.query.filters || {}),
      user: user.id,
    };

    return super.find(ctx);
  },
  async update(ctx) {
    const user = ctx.state.user;
    const product = await super.update(ctx);
    // find user info from product
    const productUser = await strapi.entityService.findOne(
      "api::product.product",
      product.data.id,
      {
        populate: ["user"],
      }
    );
    console.log(productUser);
    try {
      if (productUser.user.id !== user.id) {
        ctx.body = "You are not allowed to update this product"
      } else {
        const updated = await strapi.entityService.update(
          "api::product.product",
          product.data.id,
          {
            data: ctx.request.body,
          }
        );
        return updated;
      }
    } catch (err) {
      console.log(err);
    }
  },
});

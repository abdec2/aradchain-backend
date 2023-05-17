"use strict";

/**
 * vendor-verification controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController(
  "api::vendor-verification.vendor-verification",
  {
    async create(ctx) {
      const user = ctx.state.user;
      const vendorVerification = await super.create(ctx);
      const updated = await strapi.entityService.update(
        "api::vendor-verification.vendor-verification",
        vendorVerification.data.id,
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
  }
);

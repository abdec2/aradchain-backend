'use strict';

/**
 * vendor-verification service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::vendor-verification.vendor-verification');

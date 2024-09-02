'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {

    async checkCode(ctx) {
        const {id, givenCode} = ctx.request.body;
        const pull = await strapi.services.pull.findOne({id: id})

        if (pull.Code == givenCode) return true
        else return false

    },


    async getJoinGroup(ctx) {
        const {Code} = ctx.request.body;
        const pull = await strapi.services.pull.findOne({Code: Code})
        console.log(Code)
        if (pull) return pull
    }
};

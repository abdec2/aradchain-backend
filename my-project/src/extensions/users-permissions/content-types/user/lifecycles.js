module.exports = {
   async afterCreate(event) {
        const { result, params } = event;
        console.log(params);
       await strapi.query("plugin::users-permissions.user").update(
        {
            where: { id: result.id },
            data: {
                role: params.data.role_id,
            },
        });
    },
    afterUpdate(event) {
        console.log('afterUpdate');
    
    }
}
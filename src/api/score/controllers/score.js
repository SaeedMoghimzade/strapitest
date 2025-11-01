const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::score.score', ({ strapi }) => ({
  async create(ctx) {
    // دریافت اطلاعات کاربر از JWT
    const user = ctx.state.user;

    if (!user) {
      return ctx.badRequest('کاربر احراز نشده است.');
    }

    // داده ارسالی از فرانت‌اند
    const { data } = ctx.request.body;

    // ایجاد امتیاز جدید با نسبت دادن user خودکار
    const entry = await strapi.db.query('api::score.score').create({
      data: {
        ...data,
        user: user.id,
      },
    });

    return entry;
  },
}));

// @ts-nocheck
'use strict';

/**
 * promo controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::promo.promo', ({ strapi }) => ({

    async getPromo(ctx) {
        const { slug } = ctx.params;
        const queryLocale = ctx.query.locale || 'en-US';
        const entity = await strapi.db.query('api::promo.promo').findOne({
            where: { slug },
            populate: {
                events: {
                    populate: {
                        event_time: true
                    }
                },
                document: {
                    populate: {
                        text: true,
                        table: true
                    }
                },
                block: {
                    populate: {
                        curr_value: true,
                        image: {
                            select: ['url']
                        }
                    }
                }
            }
        });

        const sanitizedEntity = await this.sanitizeOutput(entity);

        const { heading, text, Terms_and_Conditions, table } =
            sanitizedEntity.document.find(doc => doc.locale == queryLocale) || sanitizedEntity.document[0];

        const curr_table = sanitizedEntity.block.find(item => item.__component == 'block.curr-table');

        const texts = text.map(item => {
            const { text } = item;
            return text
        })

        const events = sanitizedEntity.events.map(item => {
            const { event_time } = item;
            const eventGroup = event_time.map(event => {
                const { startDate, endDate } = event
                return { startDate, endDate }
            })
            return { ...eventGroup }
        })

        const side_link = sanitizedEntity.block.reduce((result, item) => {
            if (item.__component != 'block.side-link-item') return result;
            const { startDate, endDate, image } = item;
            const now = new Date();
            if ((new Date(startDate) - now) <= 0 && (new Date(endDate) - now) >= 0) {
                const imgList = image.map(img => img.url);
                result.push({ startDate, endDate, imgList })
            };

            return result;
        }, [])

        const output = { heading, texts, Terms_and_Conditions, events, table, curr_table, side_link }

        return output;
    },

    async getLocaleList(ctx) {
        const { slug } = ctx.params;
        const entity = await strapi.db.query('api::promo.promo').findOne({
            where: { slug },
            populate: {
                document: true
            }
        });

        const sanitizedEntity = await this.sanitizeOutput(entity);
        const locales = sanitizedEntity.document.map(doc => {
            const { locale } = doc;
            return locale
        })

        return locales;
    }
}));

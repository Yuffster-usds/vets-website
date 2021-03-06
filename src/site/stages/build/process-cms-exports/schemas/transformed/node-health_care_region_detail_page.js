module.exports = {
  type: 'object',
  properties: {
    contentModelType: { enum: ['node-health_care_region_detail_page'] },
    entityType: { enum: ['node'] },
    entityBundle: { enum: ['health_care_region_detail_page'] },
    title: { type: 'string' },
    changed: { type: 'number' },
    entityUrl: { $ref: 'EntityUrl' },
    fieldAlert: { type: ['string', 'null'] },
    fieldContentBlock: {
      type: 'array',
      items: { $ref: 'Paragraph' },
    },
    fieldFeaturedContent: {
      type: 'array',
      maxItems: 1,
      items: { $ref: 'Paragraph' },
    },
    fieldIntroText: { type: 'string' },
    fieldOffice: { $ref: 'transformed/node-health_care_region_page' },
    fieldRelatedLinks: {
      oneOf: [
        { $ref: 'transformed/paragraph-list_of_link_teasers' },
        { type: 'null' },
      ],
    },
    fieldTableOfContentsBoolean: { type: 'boolean' },
  },
  required: [
    'title',
    'changed',
    'entityUrl',
    'fieldAlert',
    'fieldContentBlock',
    'fieldFeaturedContent',
    'fieldIntroText',
    'fieldOffice',
    'fieldRelatedLinks',
    'fieldTableOfContentsBoolean',
  ],
};

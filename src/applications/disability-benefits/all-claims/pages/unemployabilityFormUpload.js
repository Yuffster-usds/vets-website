import { ancillaryFormUploadUi } from '../utils';
import { UploadDescription } from '../content/fileUploadDescriptions';

export const uiSchema = {
  'ui:title': 'Upload VA Form 21-8940',
  'ui:description': UploadDescription,
  form8940Upload: ancillaryFormUploadUi('', 'Form 21-8940', {
    attachmentId: 'l202',
    widgetType: 'textarea',
    customClasses: 'upload-completed-form',
    isDisabled: true,
  }),
  // fileUploadUI('Document Type (VA Form 21-8940)', {
  //   hideLabelText: true,
  //   fileUploadUrl: `${environment.API_URL}/v0/upload_supporting_evidence`,
  //   fileTypes: ['pdf', 'jpg', 'jpeg', 'png'],
  //   maxSize: FIFTY_MB,
  //   createPayload: file => {
  //     const payload = new FormData();
  //     payload.append('supporting_evidence_attachment[file_data]', file);

  //     return payload;
  //   },
  //   parseResponse: (response, file) => ({
  //     name: file.name,
  //     confirmationCode: response.data.attributes.guid,
  //     attachmentId: 'l202',
  //   }),
  //   // this is the uiSchema passed to FileField for the attachmentId schema
  //   // FileField requires this name be used
  //   // attachmentSchema: {
  //   //   'ui:title': 'Document type',
  //   // },
  //   // // this is the uiSchema passed to FileField for the name schema
  //   // // FileField requires this name be used
  //   // attachmentName: {
  //   //   'ui:title': 'Document name',
  //   // },
  // }),
};

export const schema = {
  type: 'object',
  required: ['form8940Upload'],
  properties: {
    form8940Upload: {
      type: 'array',
      minItems: 1,
      items: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
          },
          size: {
            type: 'integer',
          },
          confirmationCode: {
            type: 'string',
          },
        },
      },
    },
  },
};

const Timeouts = require('../../../../platform/testing/e2e/timeouts.js');
const VAOSHelpers = require('./vaos-helpers');
const Auth = require('../../../../platform/testing/e2e/auth');

const continueButton = '.rjsf [type="submit"]';

module.exports = {
  after: (client, done) => {
    client.deleteCookies();
    client.end();
    done();
  },
  login: client => {
    const token = Auth.getUserToken();

    VAOSHelpers.initAppointmentListMock(token);

    Auth.logIn(
      token,
      client,
      '/health-care/schedule-view-va-appointments/appointments/',
      3,
    ).waitForElementVisible('#appointments-list', Timeouts.slow);
    // .axeCheck('.main');
  },
  'Select new appointment': client => {
    client
      .click('#new-appointment')
      .waitForElementVisible(continueButton, Timeouts.normal)
      .axeCheck('.main');
  },
  'Choose the type of care you need': client => {
    client.click('[value="323"]').perform(() => {
      client
        .click('.rjsf [type="submit"]')
        .pause(Timeouts.slow)
        .assert.containsText(
          'h1',
          'Choose where you would prefer to receive your care',
        );
    });
  },
  'Choose where you would prefer to receive your care': client => {
    client.click('[value="communityCare"]').perform(() => {
      client
        .click('.rjsf [type="submit"]')
        .assert.containsText(
          'h1',
          'What date and time would you like to make an appointment?',
        )
        .pause(Timeouts.slow);
    });
  },
  'What date and time would you like to make an appointment?': client => {
    client
      .click(
        '.vaos-calendar__calendars button[id^="date-cell"]:not([disabled])',
      )
      .perform(() => {
        client
          .click('.vaos-calendar__options input[id^="checkbox-0"]')
          .click('.rjsf [type="submit"]')
          .assert.containsText(
            'h1',
            'Share your community care provider preferences',
          );
      });
  },
  'Share your community care provider preferences': client => {
    client.pause(Timeouts.normal);
    client.click('input[value="983"]').perform(() => {
      client
        .click('#root_preferredLanguage [value="english"]')
        .click('#root_hasCommunityCareProviderYes')
        .setValue('#root_communityCareProvider_practiceName', 'practice name')
        .setValue('#root_communityCareProvider_firstName', 'firstname')
        .setValue('#root_communityCareProvider_lastName', 'lastname')
        .setValue('#root_communityCareProvider_address_street', 'address1')
        .setValue('#root_communityCareProvider_address_street2', 'address2')
        .setValue('#root_communityCareProvider_address_city', 'city')
        .click('#root_communityCareProvider_address_state [value="IL"]')
        .setValue('#root_communityCareProvider_address_postalCode', '60613')
        .setValue('#root_communityCareProvider_phone', '1234567890')
        .click('.rjsf [type="submit"]')
        .assert.containsText('h1', 'Reason for appointment');
    });
  },
  'Reason for appointment': client => {
    client.click('#root_reasonForAppointment_0').perform(() => {
      client
        .setValue('textarea#root_reasonAdditionalInfo', 'Additonal information')
        .click('.rjsf [type="submit"]')
        .assert.containsText('h1', 'Contact information');
    });
  },
  'Contact information': client => {
    client
      .getValue('input#root_phoneNumber', result => {
        if (!result.value) {
          client.setValue('input#root_phoneNumber', '5035551234');
        }
      })
      .click('input#root_bestTimeToCall_morning')
      .getValue('input#root_email', result => {
        if (!result.value) {
          client.setValue('input#root_email', 'mail@gmail.com');
        }
      })
      .click('.rjsf [type="submit"]')
      .assert.containsText('h1', 'Review your appointment details');
  },
  'Review your appointment details': client => {
    client.click('button.usa-button.usa-button-primary').perform(() => {
      client.assert.containsText(
        'h1',
        'Your appointment request has been submitted',
      );
    });
  },
  'Your appointment request has been submitted': client => {
    // client.click('.usa-button[href$="new-appointment/"]')
    client.click('.usa-button[href$="appointments/"]').perform(() => {
      client.assert.containsText('h1', 'VA appointments');
    });
  },
};

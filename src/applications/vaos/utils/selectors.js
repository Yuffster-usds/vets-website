import { getAppointmentId } from './appointment';
import {
  TYPES_OF_CARE,
  AUDIOLOGY_TYPES_OF_CARE,
  TYPES_OF_SLEEP_CARE,
} from './constants';

export function selectConfirmedAppointment(state, id) {
  return (
    state.appointments?.confirmed?.find?.(
      appt => getAppointmentId(appt) === id,
    ) || null
  );
}

export function selectPendingAppointment(state, id) {
  return (
    state.appointments?.pending?.find?.(appt => appt.uniqueId === id) || null
  );
}

export function getNewAppointment(state) {
  return state.newAppointment;
}

export function getFormData(state) {
  return getNewAppointment(state).data;
}

export function getFormPageInfo(state, pageKey) {
  return {
    schema: getNewAppointment(state).pages[pageKey],
    data: getFormData(state),
    pageChangeInProgress: getNewAppointment(state).pageChangeInProgress,
  };
}

const AUDIOLOGY = '203';
const SLEEP_CARE = 'SLEEP';
export function getTypeOfCare(data) {
  if (data.typeOfCareId === SLEEP_CARE) {
    return TYPES_OF_SLEEP_CARE.find(care => care.id === data.typeOfSleepCareId);
  }

  if (
    data.typeOfCareId === AUDIOLOGY &&
    data.facilityType === 'communityCare'
  ) {
    return AUDIOLOGY_TYPES_OF_CARE.find(care => care.id === data.audiologyType);
  }

  return TYPES_OF_CARE.find(care => care.id === data.typeOfCareId);
}

export function getChosenFacilityInfo(state) {
  const data = getFormData(state);
  const facilities = getNewAppointment(state).facilities;
  const typeOfCareId = getTypeOfCare(data)?.id;
  return (
    facilities[`${typeOfCareId}_${data.vaSystem}`]?.find(
      facility => facility.institution.institutionCode === data.vaFacility,
    ) || null
  );
}

export function hasSingleValidVALocation(state) {
  const formInfo = getFormPageInfo(state, 'vaFacility');

  return (
    !formInfo.schema?.properties.vaSystem &&
    !formInfo.schema?.properties.vaFacility &&
    formInfo.data.vaSystem &&
    formInfo.data.vaFacility
  );
}

export function getSchedulingEligibility(state) {
  const data = getFormData(state);
  const newAppointment = getNewAppointment(state);
  const typeOfCareId = getTypeOfCare(data)?.id;
  return (
    newAppointment.eligibility[`${data.vaFacility}_${typeOfCareId}`] || null
  );
}

export function getEligibilityStatus(state) {
  const eligibility = getSchedulingEligibility(state);

  if (!eligibility) {
    return {
      direct: null,
      request: null,
    };
  }

  const {
    directPastVisit,
    directTypes,
    directClinics,
    directPACT,
    requestLimit,
    requestPastVisit,
  } = eligibility;

  return {
    direct: directTypes && directPastVisit && directPACT && directClinics,
    request: requestLimit && requestPastVisit,
  };
}

export function getFacilityPageInfo(state, pageKey) {
  const formInfo = getFormPageInfo(state, pageKey);
  const newAppointment = getNewAppointment(state);
  const typeOfCareId = getTypeOfCare(newAppointment.data)?.id;
  const eligibility =
    newAppointment.eligibility[`${formInfo.data.vaFacility}_${typeOfCareId}`] ||
    null;
  const eligibilityStatus = getEligibilityStatus(state);
  const canScheduleAtChosenFacility =
    eligibilityStatus.direct || eligibilityStatus.request;

  return {
    ...formInfo,
    facility: getChosenFacilityInfo(state),
    loadingSystems: newAppointment.loadingSystems || !formInfo.schema,
    loadingFacilities: !!formInfo.schema?.properties.vaFacilityLoading,
    loadingEligibility: newAppointment.loadingEligibility,
    eligibility,
    canScheduleAtChosenFacility,
    singleValidVALocation: hasSingleValidVALocation(state),
    noValidVASystems:
      !formInfo.data.vaSystem &&
      formInfo.schema &&
      !formInfo.schema.properties.vaSystem,
    noValidVAFacilities:
      !!formInfo.schema && !!formInfo.schema.properties.vaFacilityMessage,
  };
}

export function getChosenClinicInfo(state) {
  const data = getFormData(state);
  const clinics = getNewAppointment(state).clinics;
  const typeOfCareId = getTypeOfCare(data)?.id;
  return (
    clinics[`${data.vaFacility}_${typeOfCareId}`]?.find(
      clinic => clinic.clinicId === data.clinicId,
    ) || null
  );
}

export function getClinicsForChosenFacility(state) {
  const data = getFormData(state);
  const clinics = getNewAppointment(state).clinics;
  const typeOfCareId = getTypeOfCare(data)?.id;

  return clinics[`${data.vaFacility}_${typeOfCareId}`] || null;
}

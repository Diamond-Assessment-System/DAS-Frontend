// src/utils/apiEndpoints.js
export const API_BASE_URL = "https://das-backend.fly.dev";

// makerequest
export const ASSESSMENT_BOOKINGS_URL = `${API_BASE_URL}/api/assessment-bookings`;

// SearchProduct
export const getAssessmentPaperUrl = (productCode) => `${API_BASE_URL}/api/assessment-papers/${productCode}/sample`;

// SealList
export const SEAL_LIST_URL = `${API_BASE_URL}/api/diamonds-to-seal`;

// AssessmentRequest
export const ASSESSMENT_REQUEST_URL = `${API_BASE_URL}/api/assessment-bookings/ordered`;

// AssessmentBooking
export const ASSESSMENT_BOOKING_URL = `${API_BASE_URL}/api/assessment-bookings`;

// AssessmentBookingWithId
export const getBookingResponseUrl = (bookingId) => `${API_BASE_URL}/api/assessment-bookings/${bookingId}`;

// ServiceResponse
export const getServiceResponseUrl = (serviceId) => `${API_BASE_URL}/api/services/${serviceId}`;

// Services
export const SERVICES_URL = `${API_BASE_URL}/api/services`;

// DiamondResponse
export const getDiamondResponseUrl = (bookingId) => `${API_BASE_URL}/api/booking-samples/booking/${bookingId}`;

// AssessmentDetail
export const getAssessmentDetailUrl = (id) => `${API_BASE_URL}/api/assessment-bookings/${id}`;

// ServicePriceList
export const SERVICE_PRICE_LIST_URL = `${API_BASE_URL}/api/service-price-lists`;

// AssessmentSummary
export const geAssessmentSummaryDetailUrl = (bookingId) => `${API_BASE_URL}/api/assessment-bookings/proceed/${bookingId}`;

// AssessmentPaper
export const ASSESSMENT_PAPER_URL = `${API_BASE_URL}/api/assessment-papers`;

//StorageController
export const STORAGE_CONTROLLER=`${API_BASE_URL}/api/upload`;

// AssessmentPaperDetail
export const getAssessmentPaperDetaillUrl = (id) => `${API_BASE_URL}/api/assessment-papers/${id}`;

// BookingSamples
export const BOOKING_SAMPLES_URL = `${API_BASE_URL}/api/booking-samples`;

// CancelAssessment
export const getCancelAssessmentlUrl = (id) => `${API_BASE_URL}/api/booking-samples/${id}/status/4`;

// GetPaperByStatus
export const getBookingSampleStatusUrl = (id, status) => `${API_BASE_URL}/api/booking-samples/${id}/status/${status}`;

// GetUsersRole3
export const USERS_ROLE_2_URL = `${API_BASE_URL}/api/accounts/role/2`;

// ExecuteAction
export const getExecuteActionUrl = (sampleId, selectedAction) => `${API_BASE_URL}/api/booking-samples/${sampleId}/assign/${selectedAction}`;

// Submit Commitment Paper

export const CONSULTING_COMMITMENT_PAPER = `${API_BASE_URL}/api/commitment-papers`;

export const BOOKING_SAMPLE_COUNT_URL = `${API_BASE_URL}/api/booking-samples`;


export const COMMITMENT_PAPER_URL = `${API_BASE_URL}/api/commitment-papers`;


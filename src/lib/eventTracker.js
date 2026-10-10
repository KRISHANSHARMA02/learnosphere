// src/lib/eventTracker.js
import { sendEventPayload } from './api/eventApi';

export const EVENT_NAMES = {
    LOGIN_CLICK: 'login_click',
    WEBSITE_VISIT: 'website_visit',
    PDF_LINK_CLICK: 'pdf_link_click',
    SYLLABUS_PAGE_VISIT: 'syllabus_page_visit',
    BOOK_EDUCATOR_CLICK: 'BOOK_EDUCATOR_CLICK',
    EXPLORE_COURSE_CLICK: 'explore_course_click',
    // Maintaining compatibility with old events if needed
    BECOME_EDUCATOR_CLICKED: 'become_educator_clicked',
    EDUCATOR_PROFILE_VIEWED: 'educator_profile_viewed',
    EDUCATOR_BOOKING_STARTED: 'educator_booking_started',
    BOOKING_COMPLETED: 'booking_completed',
    STUDENT_REGISTERED: 'STUDENT_REGISTERED',
    STUDENT_LOGIN: 'STUDENT_LOGIN',
    TEST_STARTED: 'test_started',
    TEST_COMPLETED: 'test_completed',
    PAYMENT_COMPLETED: 'PAYMENT_SUCCESS',
    PAYMENT_SUCCESS: 'PAYMENT_SUCCESS',
    PAYMENT_FAILED: 'PAYMENT_FAILED',
    // Form submission events
    LEARNING_PROGRAM_FORM_SUBMITTED: 'LEARNING_PROGRAM_FORM_SUBMITTED',
    STUDY_NOTES_CHECKOUT_SUBMITTED: 'STUDY_NOTES_CHECKOUT_SUBMITTED',
    STUDY_NOTES_PURCHASE_SUCCESS: 'STUDY_NOTES_PURCHASE_SUCCESS',
    STUDY_NOTES_PURCHASE_FAILED: 'STUDY_NOTES_PURCHASE_FAILED',
    DOWNLOAD_FORM_SUBMITTED: 'DOWNLOAD_FORM_SUBMITTED',
    RESOURCE_DOWNLOAD_FORM_SUBMITTED: 'RESOURCE_DOWNLOAD_FORM_SUBMITTED',
    MIDDLE_EAST_INQUIRY_FORM_SUBMITTED: 'MIDDLE_EAST_INQUIRY_FORM_SUBMITTED',
    BOOK_TUTOR_FORM_SUBMITTED: 'BOOK_TUTOR_FORM_SUBMITTED',
    CHATBOT_LEAD_FORM_SUBMITTED: 'CHATBOT_LEAD_FORM_SUBMITTED',
    CHATBOT_TICKET_FORM_SUBMITTED: 'CHATBOT_TICKET_FORM_SUBMITTED',
    MODAL_INQUIRY_FORM_SUBMITTED: 'MODAL_INQUIRY_FORM_SUBMITTED',
    MODAL_OTP_VERIFIED: 'MODAL_OTP_VERIFIED',
    REFERRAL_REGISTRATION_FORM_SUBMITTED: 'REFERRAL_REGISTRATION_FORM_SUBMITTED',
    SEARCH_QUERY_FORM_SUBMITTED: 'SEARCH_QUERY_FORM_SUBMITTED',
    BECOME_A_TUTOR_FORM_SUBMITTED: 'BECOME_A_TUTOR_FORM_SUBMITTED',
    TEACHER_EARNINGS_INQUIRY_FORM_SUBMITTED: 'TEACHER_EARNINGS_INQUIRY_FORM_SUBMITTED',
    JOIN_AS_TEACHER_FORM_SUBMITTED: 'JOIN_AS_TEACHER_FORM_SUBMITTED',
    PART_TIME_TUTOR_JOB_FORM_SUBMITTED: 'PART_TIME_TUTOR_JOB_FORM_SUBMITTED',
    TUTOR_SUPPORT_INQUIRY_FORM_SUBMITTED: 'TUTOR_SUPPORT_INQUIRY_FORM_SUBMITTED',
    SKILL_ENHANCEMENT_FORM_SUBMITTED: 'SKILL_ENHANCEMENT_FORM_SUBMITTED',
    SKILL_TEST_SUBMITTED: 'SKILL_TEST_SUBMITTED',
    QR_PAYMENT_PROOF_SUBMITTED: 'QR_PAYMENT_PROOF_SUBMITTED',
    CONTACT_US_FORM_SUBMITTED: 'CONTACT_US_FORM_SUBMITTED',
    HOME_TUITION_FORM_SUBMITTED: 'HOME_TUITION_FORM_SUBMITTED',
    LIVE_ONE_TO_ONE_FORM_SUBMITTED: 'LIVE_ONE_TO_ONE_FORM_SUBMITTED',
    REFER_AND_EARN_INQUIRY_FORM_SUBMITTED: 'REFER_AND_EARN_INQUIRY_FORM_SUBMITTED',
    STUDENT_PROFILE_FORM_SUBMITTED: 'STUDENT_PROFILE_FORM_SUBMITTED',
    JOB_APPLICATION_FORM_SUBMITTED: 'JOB_APPLICATION_FORM_SUBMITTED',
    TEACHER_LOGIN: 'TEACHER_LOGIN',
    TEACHER_REGISTERED: 'TEACHER_REGISTERED',
    STUDENT_FORGOT_PASSWORD_SUBMITTED: 'STUDENT_FORGOT_PASSWORD_SUBMITTED',
    TEACHER_FORGOT_PASSWORD_SUBMITTED: 'TEACHER_FORGOT_PASSWORD_SUBMITTED',
    STUDENT_PASSWORD_RESET_SUCCESS: 'STUDENT_PASSWORD_RESET_SUCCESS',
    TEACHER_PASSWORD_RESET_SUCCESS: 'TEACHER_PASSWORD_RESET_SUCCESS',
    TEACHER_SIGNUP_STEP1_SUBMITTED: 'TEACHER_SIGNUP_STEP1_SUBMITTED',
    TEACHER_APPLICATION_FORM_SUBMITTED: 'TEACHER_APPLICATION_FORM_SUBMITTED',
    TEACHER_FEEDBACK_FORM_SUBMITTED: 'TEACHER_FEEDBACK_FORM_SUBMITTED',
    STUDENT_FEEDBACK_FORM_SUBMITTED: 'STUDENT_FEEDBACK_FORM_SUBMITTED',
    TEACHER_VIDEO_UPLOAD_SUBMITTED: 'TEACHER_VIDEO_UPLOAD_SUBMITTED',
    TEACHER_PDF_UPLOAD_SUBMITTED: 'TEACHER_PDF_UPLOAD_SUBMITTED',
};

// VALID_EVENT_TYPES removed to allow fully dynamic, context-aware event mapping

let globalSession = null;
let _pendingPaymentEvents = {};

export function setGlobalSession(session) {
    globalSession = session;
}

export function trackEvent(eventName, eventData = {}, studentId = null) {
    if (typeof window === 'undefined') return; 

    // Avoid duplicate clicks triggered by both explicit onClick and global document listener
    const isClickEvent = eventName.includes("CLICK") || eventName === "USER_INTERACTION";
    
    if (isClickEvent) {
        const now = Date.now();
        if (window._lastTrackedClick && (now - window._lastTrackedClick) < 100) {
            // Duplicate overlapping event within 100ms, skip
            return;
        }
        window._lastTrackedClick = now;

        // Accurate button click count tracking
        const actionIdentifier = eventData.action || eventData.source || eventName;
        const buttonKey = `click_count_${actionIdentifier}_${window.location.pathname}`;
        let clickCount = 1;
        
        try {
            const storedCount = sessionStorage.getItem(buttonKey);
            if (storedCount) {
                clickCount = parseInt(storedCount, 10) + 1;
            }
            sessionStorage.setItem(buttonKey, clickCount);
        } catch (err) {
            if (!window._clickCounts) window._clickCounts = {};
            clickCount = (window._clickCounts[buttonKey] || 0) + 1;
            window._clickCounts[buttonKey] = clickCount;
        }
        
        eventData.click_count = clickCount;
    }

    try {
        let normalizedEventName = String(eventName).trim().toUpperCase().replace(/ /g, '_');
        let actionText = (eventData.action || '').toUpperCase();
        let currentUrl = (eventData.url || window.location.href || '').toUpperCase();
        let currentPath = (eventData.path || window.location.pathname || '').toUpperCase();

        if (normalizedEventName === 'USER_INTERACTION' || normalizedEventName === 'CUSTOM_EVENT') {
            if (actionText.includes('CART')) normalizedEventName = 'ADD_TO_CART';
            else if (actionText.includes('LOGIN') && actionText.includes('STUDENT')) normalizedEventName = 'LOGIN_CLICK';
            else if (actionText.includes('LOGIN') && actionText.includes('TEACHER')) normalizedEventName = 'LOGIN_CLICK';
            else if (actionText.includes('LOGIN')) normalizedEventName = 'LOGIN_CLICK';
            else if (actionText.includes('REGISTER') && actionText.includes('STUDENT')) normalizedEventName = 'STUDENT_REGISTERED';
            else if (actionText.includes('REGISTER') && actionText.includes('TEACHER')) normalizedEventName = 'TEACHER_REGISTERED';
            else if (actionText.includes('COURSE') && (actionText.includes('VIEW') || actionText.includes('EXPLORE'))) normalizedEventName = 'COURSE_VIEWED';
            else if (actionText.includes('COURSE')) normalizedEventName = 'COURSE_CLICK';
            else if (actionText.includes('PAYMENT') && actionText.includes('SUCCESS')) normalizedEventName = 'PAYMENT_SUCCESS';
            else if (actionText.includes('PAYMENT') || actionText.includes('PAY')) normalizedEventName = 'PAYMENT_CLICK';
            else if (actionText.includes('TEST') || actionText.includes('QUIZ')) normalizedEventName = 'TEST_CLICK';
            else if (actionText.includes('SYLLABUS')) normalizedEventName = 'SYLLABUS_PAGE_VISIT';
            else {
                let cleanAction = actionText.replace(/CLICK:\s*/g, '').replace(/[^A-Z0-9]/g, '_').replace(/_+/g, '_').replace(/^_|_$/g, '');
                if (cleanAction) {
                    normalizedEventName = cleanAction + '_CLICK';
                }
            }
        }

        if (normalizedEventName === 'WEBSITE_VISIT') {
            if (currentPath.includes('/COURSES/') || currentPath.includes('/COURSE')) normalizedEventName = 'COURSE_VIEWED';
            else if (currentPath.includes('/CBSE_SYLLABUS') || currentPath.includes('/SYLLABUS')) normalizedEventName = 'SYLLABUS_PAGE_VISIT';
            else if (currentPath.includes('/TEST') || currentPath.includes('/QUIZ')) normalizedEventName = 'TEST_PAGE_VISITED';
            else if (currentPath.includes('/PAYMENT')) normalizedEventName = 'PAYMENT_PAGE_VISITED';
        }

        const exactMap = {
            'LOGIN_CLICK': 'LOGIN_CLICK',
            'EXPLORE_COURSE_CLICK': 'COURSE_VIEWED',
            'BECOME_EDUCATOR_CLICKED': 'TEACHER_REGISTERED',
            'BOOKING_COMPLETED': 'TEACHER_CLASS_BOOKED',
            'TEST_STARTED': 'COURSE_PROGRESS',
            'TEST_COMPLETED': 'COURSE_COMPLETED',
            'PAYMENT_COMPLETED': 'PAYMENT_SUCCESS',
            'PDF_LINK_CLICK': 'COURSE_VIEWED',
            'CART_CLICK': 'ADD_TO_CART',
            'COURSE_PAGE': 'COURSE_VIEWED',
            'COURSE_VIEW': 'COURSE_VIEWED'
        };

        if (exactMap[normalizedEventName]) {
            normalizedEventName = exactMap[normalizedEventName];
        }

        let finalEventType = normalizedEventName;
        let finalEventData = { ...eventData };

        let userEmail = "";
        
        if (globalSession && globalSession.user) {
            const userName = globalSession.user.name || globalSession.user.firstname || globalSession.user.fullname;
            if (userName && !finalEventData.name) finalEventData.name = userName;
            if (globalSession.user.email) {
                userEmail = globalSession.user.email;
                if (!finalEventData.email) finalEventData.email = userEmail;
            }
        }

        // Normalize common form field variations so they are always accessible under standard keys
        if (!finalEventData.email && (finalEventData.gmail || userEmail)) {
            finalEventData.email = finalEventData.gmail || userEmail;
        }
        if (!finalEventData.name && (finalEventData.fullname || finalEventData.studentName || finalEventData.userName)) {
            finalEventData.name = finalEventData.fullname || finalEventData.studentName || finalEventData.userName;
        }
        if (!finalEventData.mobile_number) {
            const extractedMobile = finalEventData.contact || finalEventData.phone || finalEventData.mobile || finalEventData.mobilenumber || finalEventData.mobileNumber || "";
            if (extractedMobile) {
                finalEventData.mobile_number = extractedMobile;
            }
        }

        const metadata = {
            url: eventData.url || (typeof window !== 'undefined' ? window.location.href : ''),
            path: eventData.path || (typeof window !== 'undefined' ? window.location.pathname : ''),
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent,
        };

        const payload = {
            event_type: finalEventType,
            eventType: finalEventType,
            url: metadata.url,
            pageUrl: metadata.url,
            path: metadata.path,
            timestamp: metadata.timestamp,
            ...finalEventData,
            event_data: {
                ...finalEventData,
                ...metadata
            },
            eventData: {
                ...finalEventData,
                ...metadata
            }
        };

        // Ensure student_id is sent as an integer if it exists, or null for logged-out users (no auth required)
        let fetchedStudentId = studentId;
        if (!fetchedStudentId) {
            try {
                // naive session token or explicit student_id from local storage
                fetchedStudentId = localStorage.getItem('next-auth.session-token') || localStorage.getItem('student_id');
            } catch (e) {}
        }
        
        let finalStudentId = null;
        if (fetchedStudentId && fetchedStudentId !== "anonymous") {
            const parsedId = parseInt(fetchedStudentId, 10);
            finalStudentId = !isNaN(parsedId) ? parsedId : fetchedStudentId;
        }

        payload.student_id = finalStudentId;
        payload.studentId = finalStudentId;

        // Top-level aliases for universal API compatibility
        if (finalEventData.name) {
            payload.name = finalEventData.name;
            payload.userName = finalEventData.name;
        }
        if (finalEventData.email) {
            payload.email = finalEventData.email;
            payload.userEmail = finalEventData.email;
        }
        if (finalEventData.mobile_number) {
            payload.mobile_number = finalEventData.mobile_number;
            payload.phone = finalEventData.mobile_number;
            payload.userPhone = finalEventData.mobile_number;
            payload.contact = finalEventData.mobile_number;
        }

        if (userEmail && !payload.event_data.email) {
            payload.event_data.email = userEmail;
            payload.eventData.email = userEmail;
            payload.email = userEmail;
            payload.userEmail = userEmail;
        }

       
        if (finalEventType === 'PAYMENT_SUCCESS' || finalEventType === 'PAYMENT_FAILED') {
            const courseIdKey = finalEventData.course_id || finalEventData.courseId || 'default';
            const eventKey = `${finalEventType}_${courseIdKey}`;

            if (_pendingPaymentEvents[eventKey]) {
                _pendingPaymentEvents[eventKey].payload.event_data = {
                    ..._pendingPaymentEvents[eventKey].payload.event_data,
                    ...payload.event_data
                };
                if (payload.student_id && !_pendingPaymentEvents[eventKey].payload.student_id) {
                    _pendingPaymentEvents[eventKey].payload.student_id = payload.student_id;
                }
                clearTimeout(_pendingPaymentEvents[eventKey].timer);
            } else {
                _pendingPaymentEvents[eventKey] = {
                    payload: payload,
                    timer: null
                };
            }

            _pendingPaymentEvents[eventKey].timer = setTimeout(() => {
                const item = _pendingPaymentEvents[eventKey];
                delete _pendingPaymentEvents[eventKey];
                if (item) {
                    sendEventPayload(item.payload);
                }
            }, 150);
            return;
        }

        sendEventPayload(payload);
    } catch (err) {
        // Silently catch errors
    }
}
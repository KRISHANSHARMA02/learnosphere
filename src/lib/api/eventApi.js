// lib/api/eventApi.js
export const EVENT_API_URL = 'https://api-crm.learnosphere.in/api/automation/events';

export async function sendEventPayload(payload) {
    try {
        const response = await fetch(EVENT_API_URL, {
            method: 'POST',
            keepalive: true,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            console.warn(`[EventApi] Failed to send event. Status: ${response.status}`);
        }
    } catch (error) {
        console.warn(`[EventApi] Network error sending event:`, error);
    }
}

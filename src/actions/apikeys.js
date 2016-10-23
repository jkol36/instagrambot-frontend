export const API_KEYS_RECIEVED = 'API_KEYS_RECIEVED'

export function apiKeysRecieved(apikeys) {
	return {
		type: API_KEYS_RECIEVED,
		apikeys
	}
}
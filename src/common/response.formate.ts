import { AxiosResponse } from 'axios';
import { ApiResponse } from '../resources/interfaces/common.interfaces';
import { Messages } from '../enums/messages.common';


/**
 * Extracts relevant information from an AxiosResponse and constructs an ApiResponse.
 * @template T - The type of data contained in the AxiosResponse.
 * @param {AxiosResponse<T>} response - The AxiosResponse to extract information from.
 * @returns {ApiResponse<T>} - An ApiResponse containing status information and data.
 */
export function extractApiData<T>(response: AxiosResponse<T>): ApiResponse<T> {
  return {
    statusCode: response.status,
    statusText: response.statusText,
    data: response.data,
  };
}

/**
 * Handles API errors and constructs an ApiResponse with relevant error information.
 * @template T - The type of data that would be present in a successful response.
 * @param {any} error - The error object, typically from a failed Axios request.
 * @returns {ApiResponse<T>} - An ApiResponse containing error status information and no data.
 */
export function handleApiError<T>(error: any): ApiResponse<T> {
  return {
    statusCode: error.response?.status || 500,
    statusText: error.response?.statusText || Messages.INTERNAL_SERVER_ERROR,
    data: null,
  };
}


/**
 * Handles the response after generating an authentication URL.
 * @param {string} url - The generated authentication URL.
 * @returns {ApiResponse<{ authUrl: string }>} - An ApiResponse containing the status code, status text, and data with the authentication URL.
 */
export function handleAuthUrlResponse(url: string) {
  // Return ApiResponse with success status and the authentication URL
  return {
      statusCode: 200,
      statusText: "Ok",
      data: { authUrl: url },
  };
}

import axios, { AxiosResponse } from 'axios';
import { extractApiData, handleApiError } from './response.formate';
import{ApiResponse} from '../resources/interfaces/common.interfaces'
/**
 * Service class for making HTTP requests using Axios.
 */
export class HttpService {

    /**
     * Performs a GET request to the specified URL.
     * @template T - The type of data expected in the API response.
     * @param {string} url - The URL to make the GET request to.
     * @param {any} headers - Optional headers to be included in the request.
     * @returns {Promise<ApiResponse<T>>} - A promise resolving to the ApiResponse containing the response data.
     */
    async get<T>(url: string, headers?: any): Promise<ApiResponse<T>> {
        try {
            const response: AxiosResponse<T> = await axios.get(url, { headers });
            return extractApiData(response);
        } catch (error) {
            return handleApiError<T>(error);
        }
    }

    /**
     * Performs a GET request to the specified URL with parameters.
     * @template T - The type of data expected in the API response.
     * @param {string} url - The URL to make the GET request to.
     * @param {any} params - Optional parameters to be included in the request.
     * @returns {Promise<ApiResponse<T>>} - A promise resolving to the ApiResponse containing the response data.
     */
    async get2<T>(url: string, params?: any): Promise<ApiResponse<T>> {
        try {
            const response: AxiosResponse<T> = await axios.get(url, params);
            return extractApiData(response);
        } catch (error) {
            return handleApiError<T>(error);
        }
    }

    /**
     * Performs a POST request to the specified URL.
     * @template T - The type of data expected in the API response.
     * @param {string} url - The URL to make the POST request to.
     * @param {any} data - Optional data to be included in the request body.
     * @param {any} headers - Optional headers to be included in the request.
     * @returns {Promise<ApiResponse<T>>} - A promise resolving to the ApiResponse containing the response data.
     */
    async post<T>(url: string, data?: any, headers?: any): Promise<ApiResponse<T>> {
        try {
            const response: AxiosResponse<T> = await axios.post(url, data, { headers });
            return extractApiData(response);
        } catch (error) {
            return handleApiError<T>(error);
        }
    }
}

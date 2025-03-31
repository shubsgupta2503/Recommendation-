import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { log } from '../vite';

/**
 * API Client for making HTTP requests to external services
 * This class provides a standardized way to call external APIs
 */
export class ApiClient {
  private client: AxiosInstance;
  private baseUrl: string;

  constructor(baseUrl: string, config: AxiosRequestConfig = {}) {
    this.baseUrl = baseUrl;
    this.client = axios.create({
      baseURL: baseUrl,
      timeout: 10000, // 10 seconds
      ...config
    });

    // Add request interceptor for logging
    this.client.interceptors.request.use(
      (config) => {
        log(`Making request to ${config.baseURL}${config.url}`, 'api-client');
        return config;
      },
      (error) => {
        log(`Request error: ${error.message}`, 'api-client');
        return Promise.reject(error);
      }
    );

    // Add response interceptor for logging
    this.client.interceptors.response.use(
      (response) => {
        log(`Received response from ${this.baseUrl}`, 'api-client');
        return response;
      },
      (error) => {
        if (error.response) {
          log(`API error: ${error.response.status} - ${error.response.statusText}`, 'api-client');
        } else if (error.request) {
          log(`No response received: ${error.message}`, 'api-client');
        } else {
          log(`Request configuration error: ${error.message}`, 'api-client');
        }
        return Promise.reject(error);
      }
    );
  }

  /**
   * Make a GET request to the API
   * @param url - The URL to request
   * @param config - Optional axios config to be merged with default config
   * @returns The response data
   */
  async get<T>(url: string, config: AxiosRequestConfig = {}): Promise<T> {
    try {
      const response = await this.client.get<T>(url, config);
      return response.data;
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      log(`GET request failed: ${errorMessage}`, 'api-client');
      throw error;
    }
  }

  /**
   * Make a POST request to the API
   * @param url - The URL to request
   * @param data - The data to send
   * @param config - Optional axios config to be merged with default config
   * @returns The response data
   */
  async post<T>(url: string, data: any, config: AxiosRequestConfig = {}): Promise<T> {
    try {
      const response = await this.client.post<T>(url, data, config);
      return response.data;
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      log(`POST request failed: ${errorMessage}`, 'api-client');
      throw error;
    }
  }
}
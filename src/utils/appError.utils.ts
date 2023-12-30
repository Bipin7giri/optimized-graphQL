/**
 * File: AppError.ts
 * Description: This file defines a custom error class (AppError) and a set of static methods for creating specific error instances.
 */

import { StatusCodes } from 'http-status-codes'

/**
 * @enum STATUS
 * @description An enum representing possible error statuses.
 */
export enum STATUS {
  SUCCESS = 'success',
  FAIL = 'fail',
  ERROR = 'error',
}

/**
 * @class AppError
 * @extends Error
 * @description Represents a custom error class that extends the built-in Error class.
 */
class AppError extends Error {
  /**
   * @property statusCode
   * @description The HTTP status code associated with the error.
   * @type {number}
   */
  statusCode: number

  /**
   * @property isOperational
   * @description Indicates whether the error is operational (can be safely exposed to clients).
   * @type {boolean}
   */
  isOperational: boolean

  /**
   * @property status
   * @description The status string associated with the error (success, fail, or error).
   * @type {string}
   */
  status: string

  /**
   * @constructor
   * @param {string} message - The error message.
   * @param {number} statusCode - The HTTP status code.
   */
  constructor(message: string, statusCode: number) {
    super(message)
    this.statusCode = statusCode
    this.status = `${statusCode}`.startsWith('4') ? STATUS.FAIL : STATUS.ERROR
    this.isOperational = true

    // Capture the stack trace for debugging purposes
    Error.captureStackTrace(this, this.constructor)
  }

  /**
   * @static NotFound
   * @param {string} message - The error message for a "Not Found" error.
   * @returns {AppError} - An AppError instance with a "Not Found" status code.
   */
  static NotFound(message: string): AppError {
    return new AppError(message, StatusCodes.NOT_FOUND)
  }

  /**
   * @static InternalServer
   * @param {string} message - The error message for an "Internal Server Error."
   * @returns {AppError} - An AppError instance with an "Internal Server Error" status code.
   */
  static InternalServer(message: string): AppError {
    return new AppError(message, StatusCodes.INTERNAL_SERVER_ERROR)
  }

  /**
   * @static BadRequest
   * @param {string} message - The error message for a "Bad Request" error.
   * @returns {AppError} - An AppError instance with a "Bad Request" status code.
   */
  static BadRequest(message: string): AppError {
    return new AppError(message, StatusCodes.BAD_REQUEST)
  }

  /**
   * @static Unauthorized
   * @param {string} message - The error message for an "Unauthorized" error.
   * @returns {AppError} - An AppError instance with an "Unauthorized" status code.
   */
  static Unauthorized(message: string): AppError {
    return new AppError(message, StatusCodes.UNAUTHORIZED)
  }

  /**
   * @static Forbidden
   * @param {string} message - The error message for a "Forbidden" error.
   * @returns {AppError} - An AppError instance with a "Forbidden" status code.
   */
  static Forbidden(message: string): AppError {
    return new AppError(message, StatusCodes.FORBIDDEN)
  }

  /**
   * @static ValidationFailed
   * @param {string} message - The error message for a "Validation Failed" error.
   * @returns {AppError} - An AppError instance with a "Bad Request" status code (for validation failures).
   */
  static ValidationFailed(message: string): AppError {
    return new AppError(message, StatusCodes.BAD_REQUEST)
  }
}

export default AppError

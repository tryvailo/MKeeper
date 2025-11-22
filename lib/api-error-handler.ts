/**
 * Unified error handling for API routes
 * Provides consistent error responses across all API endpoints
 */

import { NextResponse } from "next/server";
import { getUserFriendlyError, isConnectionError } from "@/lib/supabase-error-handler";

export interface ApiErrorResponse {
  error: string;
  errors?: string[];
  details?: any;
}

/**
 * Handle errors in API routes with consistent formatting
 */
export function handleApiError(error: unknown, defaultMessage: string = "An error occurred"): NextResponse<ApiErrorResponse> {
  console.error("API Error:", error);

  // Determine status code
  const statusCode = isConnectionError(error) ? 503 : 500;
  
  // Get user-friendly error message
  const message = getUserFriendlyError(error) || defaultMessage;

  return NextResponse.json(
    { error: message },
    { status: statusCode }
  );
}

/**
 * Handle validation errors
 */
export function handleValidationError(errors: string[]): NextResponse<ApiErrorResponse> {
  return NextResponse.json(
    { error: "Validation failed", errors },
    { status: 400 }
  );
}

/**
 * Handle unauthorized errors
 */
export function handleUnauthorizedError(message: string = "Unauthorized"): NextResponse<ApiErrorResponse> {
  return NextResponse.json(
    { error: message },
    { status: 401 }
  );
}

/**
 * Handle not found errors
 */
export function handleNotFoundError(message: string = "Resource not found"): NextResponse<ApiErrorResponse> {
  return NextResponse.json(
    { error: message },
    { status: 404 }
  );
}

/**
 * Handle bad request errors
 */
export function handleBadRequestError(message: string, errors?: string[]): NextResponse<ApiErrorResponse> {
  return NextResponse.json(
    { error: message, ...(errors && { errors }) },
    { status: 400 }
  );
}

/**
 * Parse JSON body with error handling
 */
export async function parseJsonBody<T = any>(request: Request): Promise<{ success: true; data: T } | { success: false; response: NextResponse<ApiErrorResponse> }> {
  try {
    const data = await request.json() as T;
    return { success: true, data };
  } catch (error) {
    return {
      success: false,
      response: handleBadRequestError("Invalid JSON in request body"),
    };
  }
}


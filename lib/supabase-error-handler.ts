/**
 * Utility functions for handling Supabase errors
 * Useful for consistent error handling across the application
 */

export interface SupabaseError {
  message: string;
  code?: string;
  details?: string;
  hint?: string;
}

/**
 * Check if Supabase is properly configured
 */
export function isSupabaseConfigured(): boolean {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  return !!(url && key && url.length > 0 && key.length > 0);
}

/**
 * Format Supabase error for user-friendly messages
 */
export function formatSupabaseError(error: any): SupabaseError {
  if (!error) {
    return { message: "Unknown error occurred" };
  }

  // Handle Supabase PostgREST errors
  if (error.code) {
    switch (error.code) {
      case "PGRST116":
        return { message: "Resource not found", code: error.code };
      case "23505":
        return { message: "Duplicate entry", code: error.code };
      case "23503":
        return { message: "Foreign key violation", code: error.code };
      case "42501":
        return { message: "Permission denied", code: error.code };
      default:
        return {
          message: error.message || "Database error",
          code: error.code,
          details: error.details,
          hint: error.hint,
        };
    }
  }

  // Handle network errors
  if (error.message?.includes("fetch")) {
    return {
      message: "Network error: Unable to connect to database",
      code: "NETWORK_ERROR",
    };
  }

  return {
    message: error.message || "An unexpected error occurred",
    code: error.code,
  };
}

/**
 * Check if error is a connection error
 */
export function isConnectionError(error: any): boolean {
  if (!error) return false;
  
  const message = error.message?.toLowerCase() || "";
  return (
    message.includes("fetch") ||
    message.includes("network") ||
    message.includes("connection") ||
    message.includes("timeout") ||
    error.code === "NETWORK_ERROR"
  );
}

/**
 * Get user-friendly error message for API responses
 */
export function getUserFriendlyError(error: any): string {
  const formatted = formatSupabaseError(error);
  
  if (isConnectionError(error)) {
    return "Unable to connect to the database. Please try again later.";
  }
  
  return formatted.message || "An error occurred. Please try again.";
}


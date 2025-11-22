/**
 * Tests for Supabase error handler utilities
 */

import {
  formatSupabaseError,
  isConnectionError,
  getUserFriendlyError,
  isSupabaseConfigured,
  retryWithBackoff,
} from "@/lib/supabase-error-handler";

describe("supabase-error-handler", () => {
  describe("formatSupabaseError", () => {
    it("should handle null/undefined errors", () => {
      const result = formatSupabaseError(null);
      expect(result.message).toBe("Unknown error occurred");
    });

    it("should handle PGRST116 (not found) error", () => {
      const error = { code: "PGRST116", message: "Not found" };
      const result = formatSupabaseError(error);
      expect(result.message).toBe("Resource not found");
      expect(result.code).toBe("PGRST116");
    });

    it("should handle 23505 (duplicate) error", () => {
      const error = { code: "23505", message: "Duplicate" };
      const result = formatSupabaseError(error);
      expect(result.message).toBe("Duplicate entry");
      expect(result.code).toBe("23505");
    });

    it("should handle 23503 (foreign key) error", () => {
      const error = { code: "23503", message: "FK violation" };
      const result = formatSupabaseError(error);
      expect(result.message).toBe("Foreign key violation");
      expect(result.code).toBe("23503");
    });

    it("should handle 42501 (permission denied) error", () => {
      const error = { code: "42501", message: "Permission denied" };
      const result = formatSupabaseError(error);
      expect(result.message).toBe("Permission denied");
      expect(result.code).toBe("42501");
    });

    it("should handle network errors", () => {
      const error = { message: "Failed to fetch" };
      const result = formatSupabaseError(error);
      expect(result.message).toContain("Network error");
      expect(result.code).toBe("NETWORK_ERROR");
    });

    it("should handle generic errors", () => {
      const error = { code: "UNKNOWN", message: "Something went wrong", details: "Details", hint: "Hint" };
      const result = formatSupabaseError(error);
      expect(result.message).toBe("Something went wrong");
      expect(result.code).toBe("UNKNOWN");
      expect(result.details).toBe("Details");
      expect(result.hint).toBe("Hint");
    });
  });

  describe("isConnectionError", () => {
    it("should return false for null/undefined", () => {
      expect(isConnectionError(null)).toBe(false);
      expect(isConnectionError(undefined)).toBe(false);
    });

    it("should detect fetch errors", () => {
      const error = { message: "Failed to fetch data" };
      expect(isConnectionError(error)).toBe(true);
    });

    it("should detect network errors", () => {
      const error = { message: "Network error occurred" };
      expect(isConnectionError(error)).toBe(true);
    });

    it("should detect connection errors", () => {
      const error = { message: "Connection timeout" };
      expect(isConnectionError(error)).toBe(true);
    });

    it("should detect NETWORK_ERROR code", () => {
      const error = { code: "NETWORK_ERROR" };
      expect(isConnectionError(error)).toBe(true);
    });

    it("should return false for non-connection errors", () => {
      const error = { code: "PGRST116", message: "Not found" };
      expect(isConnectionError(error)).toBe(false);
    });
  });

  describe("getUserFriendlyError", () => {
    it("should return connection error message for connection errors", () => {
      const error = { message: "Failed to fetch" };
      const result = getUserFriendlyError(error);
      expect(result).toContain("Unable to connect");
    });

    it("should return formatted message for other errors", () => {
      const error = { code: "PGRST116", message: "Not found" };
      const result = getUserFriendlyError(error);
      expect(result).toBe("Resource not found");
    });

    it("should return default message for unknown errors", () => {
      const error = {};
      const result = getUserFriendlyError(error);
      expect(result).toBe("An unexpected error occurred");
    });
  });

  describe("isSupabaseConfigured", () => {
    const originalEnv = process.env;

    beforeEach(() => {
      jest.resetModules();
      process.env = { ...originalEnv };
    });

    afterAll(() => {
      process.env = originalEnv;
    });

    it("should return true when both URL and key are set", () => {
      process.env.NEXT_PUBLIC_SUPABASE_URL = "https://test.supabase.co";
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = "test-key";
      expect(isSupabaseConfigured()).toBe(true);
    });

    it("should return false when URL is missing", () => {
      delete process.env.NEXT_PUBLIC_SUPABASE_URL;
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = "test-key";
      expect(isSupabaseConfigured()).toBe(false);
    });

    it("should return false when key is missing", () => {
      process.env.NEXT_PUBLIC_SUPABASE_URL = "https://test.supabase.co";
      delete process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
      expect(isSupabaseConfigured()).toBe(false);
    });

    it("should return false when URL is empty", () => {
      process.env.NEXT_PUBLIC_SUPABASE_URL = "";
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = "test-key";
      expect(isSupabaseConfigured()).toBe(false);
    });

    it("should return false when key is empty", () => {
      process.env.NEXT_PUBLIC_SUPABASE_URL = "https://test.supabase.co";
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = "";
      expect(isSupabaseConfigured()).toBe(false);
    });
  });

  describe("retryWithBackoff", () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    it("should return result on first successful attempt", async () => {
      const fn = jest.fn().mockResolvedValue("success");
      const result = await retryWithBackoff(fn, 3, 100);
      expect(result).toBe("success");
      expect(fn).toHaveBeenCalledTimes(1);
    });

    it("should retry on connection errors and succeed", async () => {
      const fn = jest.fn()
        .mockRejectedValueOnce({ message: "Failed to fetch" })
        .mockResolvedValueOnce("success");
      
      const promise = retryWithBackoff(fn, 3, 100);
      
      // Fast-forward timers to skip delay
      await jest.advanceTimersByTimeAsync(100);
      
      const result = await promise;
      expect(result).toBe("success");
      expect(fn).toHaveBeenCalledTimes(2);
    });

    it("should retry up to maxRetries times", async () => {
      const connectionError = { message: "Connection timeout" };
      const fn = jest.fn().mockRejectedValue(connectionError);
      
      const promise = retryWithBackoff(fn, 3, 100);
      
      // Fast-forward through all retries
      await jest.advanceTimersByTimeAsync(100); // First retry
      await jest.advanceTimersByTimeAsync(200); // Second retry
      await jest.advanceTimersByTimeAsync(400); // Third retry
      
      await expect(promise).rejects.toEqual(connectionError);
      expect(fn).toHaveBeenCalledTimes(4); // Initial + 3 retries
    });

    it("should not retry on non-connection errors", async () => {
      const businessError = { code: "23505", message: "Duplicate entry" };
      const fn = jest.fn().mockRejectedValue(businessError);
      
      await expect(retryWithBackoff(fn, 3, 100)).rejects.toEqual(businessError);
      expect(fn).toHaveBeenCalledTimes(1); // No retries for non-connection errors
    });

    it("should use exponential backoff", async () => {
      const fn = jest.fn()
        .mockRejectedValueOnce({ message: "Network error" })
        .mockRejectedValueOnce({ message: "Network error" })
        .mockResolvedValueOnce("success");
      
      const promise = retryWithBackoff(fn, 3, 100);
      
      // First retry after 100ms
      await jest.advanceTimersByTimeAsync(100);
      expect(fn).toHaveBeenCalledTimes(2);
      
      // Second retry after 200ms (exponential)
      await jest.advanceTimersByTimeAsync(200);
      expect(fn).toHaveBeenCalledTimes(3);
      
      const result = await promise;
      expect(result).toBe("success");
    });
  });
});


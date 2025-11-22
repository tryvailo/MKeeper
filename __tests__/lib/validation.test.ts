/**
 * Tests for validation schemas
 */

import {
  preferencesSchema,
  familyMemberSchema,
  shareableLinkSchema,
  activityLogSchema,
  commentSchema,
  validateData,
} from "@/lib/validation";

describe("validation", () => {
  describe("preferencesSchema", () => {
    it("should validate valid preferences", () => {
      const valid = {
        age: 65,
        location: "London",
        funeral_type: "traditional",
        budget_range: "2000-3500",
      };
      const result = validateData(preferencesSchema, valid);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.age).toBe(65);
      }
    });

    it("should reject invalid age", () => {
      const invalid = { age: 150 };
      const result = validateData(preferencesSchema, invalid);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.errors.length).toBeGreaterThan(0);
      }
    });

    it("should reject invalid funeral_type", () => {
      const invalid = { funeral_type: "invalid" };
      const result = validateData(preferencesSchema, invalid);
      expect(result.success).toBe(false);
    });

    it("should allow all optional fields", () => {
      const empty = {};
      const result = validateData(preferencesSchema, empty);
      expect(result.success).toBe(true);
    });
  });

  describe("familyMemberSchema", () => {
    it("should validate valid family member", () => {
      const valid = {
        name: "John Doe",
        email: "john@example.com",
        relationship: "child",
        access_level: "view_and_comment",
      };
      const result = validateData(familyMemberSchema, valid);
      expect(result.success).toBe(true);
    });

    it("should reject invalid email", () => {
      const invalid = {
        name: "John Doe",
        email: "not-an-email",
        relationship: "child",
        access_level: "view",
      };
      const result = validateData(familyMemberSchema, invalid);
      expect(result.success).toBe(false);
    });

    it("should reject empty name", () => {
      const invalid = {
        name: "",
        email: "john@example.com",
        relationship: "child",
        access_level: "view",
      };
      const result = validateData(familyMemberSchema, invalid);
      expect(result.success).toBe(false);
    });

    it("should reject invalid relationship", () => {
      const invalid = {
        name: "John Doe",
        email: "john@example.com",
        relationship: "invalid",
        access_level: "view",
      };
      const result = validateData(familyMemberSchema, invalid);
      expect(result.success).toBe(false);
    });

    it("should accept partner relationship", () => {
      const valid = {
        name: "John Doe",
        email: "john@example.com",
        relationship: "partner",
        access_level: "view",
      };
      const result = validateData(familyMemberSchema, valid);
      expect(result.success).toBe(true);
    });

    it("should accept solicitor relationship", () => {
      const valid = {
        name: "John Doe",
        email: "john@example.com",
        relationship: "solicitor",
        access_level: "executor",
      };
      const result = validateData(familyMemberSchema, valid);
      expect(result.success).toBe(true);
    });
  });

  describe("shareableLinkSchema", () => {
    it("should validate valid shareable link", () => {
      const valid = {
        preferencesId: "123e4567-e89b-12d3-a456-426614174000",
        expirationDays: 30,
      };
      const result = validateData(shareableLinkSchema, valid);
      expect(result.success).toBe(true);
    });

    it("should reject invalid UUID", () => {
      const invalid = {
        preferencesId: "not-a-uuid",
        expirationDays: 30,
      };
      const result = validateData(shareableLinkSchema, invalid);
      expect(result.success).toBe(false);
    });

    it("should reject expirationDays > 365", () => {
      const invalid = {
        expirationDays: 400,
      };
      const result = validateData(shareableLinkSchema, invalid);
      expect(result.success).toBe(false);
    });

    it("should allow empty object", () => {
      const empty = {};
      const result = validateData(shareableLinkSchema, empty);
      expect(result.success).toBe(true);
    });
  });

  describe("activityLogSchema", () => {
    it("should validate valid activity log", () => {
      const valid = {
        action: "created_preferences",
        details: "User created preferences",
      };
      const result = validateData(activityLogSchema, valid);
      expect(result.success).toBe(true);
    });

    it("should reject empty action", () => {
      const invalid = {
        action: "",
        details: "Some details",
      };
      const result = validateData(activityLogSchema, invalid);
      expect(result.success).toBe(false);
    });

    it("should allow null details", () => {
      const valid = {
        action: "test_action",
        details: null,
      };
      const result = validateData(activityLogSchema, valid);
      expect(result.success).toBe(true);
    });
  });

  describe("commentSchema", () => {
    it("should validate valid comment", () => {
      const valid = {
        content: "This is a comment",
        familyMemberId: "123e4567-e89b-12d3-a456-426614174000",
      };
      const result = validateData(commentSchema, valid);
      expect(result.success).toBe(true);
    });

    it("should reject empty content", () => {
      const invalid = {
        content: "",
      };
      const result = validateData(commentSchema, invalid);
      expect(result.success).toBe(false);
    });

    it("should reject content > 2000 chars", () => {
      const invalid = {
        content: "a".repeat(2001),
      };
      const result = validateData(commentSchema, invalid);
      expect(result.success).toBe(false);
    });
  });

  describe("validateData", () => {
    it("should return success with valid data", () => {
      const schema = preferencesSchema;
      const data = { age: 65 };
      const result = validateData(schema, data);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toBeDefined();
      }
    });

    it("should return errors with invalid data", () => {
      const schema = preferencesSchema;
      const data = { age: 150 };
      const result = validateData(schema, data);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.errors).toBeInstanceOf(Array);
        expect(result.errors.length).toBeGreaterThan(0);
      }
    });
  });
});


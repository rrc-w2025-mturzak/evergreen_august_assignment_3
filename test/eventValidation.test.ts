import Joi from 'joi';
import { eventSchemas } from 'src/api/v1/validation/eventValidation';

describe('eventSchemas.create.body', () => {
  const schema: Joi.ObjectSchema = eventSchemas.create.body;

  it('accepts a minimal valid object', () => {
    // Arrange
    const valid = {
      name: 'Valid Event',
      date: new Date(Date.now() + 10000).toISOString(),
      capacity: 10,
    };

    // Act
    const { error, value } = schema.validate(valid);

    // Assert
    expect(error).toBeUndefined();
    // Joi may coerce ISO strings to Date objects, compare fields individually
    expect(value).toMatchObject({
      name: valid.name,
      capacity: valid.capacity,
    });
    expect(new Date(value.date).toISOString()).toBe(valid.date);
  });

  it('strips unknown fields when validating with stripUnknown', () => {
    // Arrange
    const payload = {
      name: 'Another Event',
      date: new Date(Date.now() + 100000).toISOString(),
      capacity: 20,
      unrelated: 'remove',
    };

    // Act
    const { error, value } = schema.validate(payload, { stripUnknown: true });

    // Assert
    expect(error).toBeUndefined();
    expect((value as any).unrelated).toBeUndefined();
  });

  it('rejects missing required fields', () => {
    // Arrange
    const bad = { name: 'short' };

    // Act
    const { error } = schema.validate(bad);

    // Assert
    expect(error).toBeDefined();
    expect(error?.details[0].message).toContain('required');
  });

  it('rejects capacity less than minimum', () => {
    // Arrange
    const bad = {
      name: 'Tiny',
      date: new Date(Date.now() + 10000).toISOString(),
      capacity: 2,
    };

    // Act
    const { error } = schema.validate(bad);

    // Assert
    expect(error).toBeDefined();
    expect(error?.details[0].message).toContain('must be greater than or equal to 5');
  });
});

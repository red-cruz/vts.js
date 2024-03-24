import { faker } from '@faker-js/faker';
import createMockVts, { createMockForm } from '../helpers';

describe('Field handling', () => {
  it('should include all fields except those with the data-vts-ignored attribute', () => {
    const fields = {
      firstName: {
        value: faker.person.firstName(),
        type: 'text',
      },
      lastName: {
        value: faker.person.lastName(),
        type: 'text',
      },
      email: {
        value: faker.internet.email(),
        type: 'email',
      },
      ignoredField: {
        value: faker.word.sample(),
        type: 'text',
        'data-vts-ignored': 'true',
      },
    };

    const form = createMockForm(fields);
    const vts = createMockVts(form);

    const fieldNames = [...vts.fields].map((field) => field.name);

    expect(fieldNames).toContain('firstName');
    expect(fieldNames).toContain('lastName');
    expect(fieldNames).toContain('email');
    expect(fieldNames).not.toContain('ignoredField');
  });

  it('should ignore fields with the data-vts-ignored attribute', () => {
    const form = createMockForm({
      field1: { type: 'text' },
      field2: { type: 'number', 'data-vts-ignored': 'true' },
      field3: { type: 'email', 'data-vts-ignored': 'true' },
    });
    const vtsWithIgnoredField = createMockVts(form);

    expect(vtsWithIgnoredField.fields.length).toBe(1);
    expect(vtsWithIgnoredField.fields[0].name).toBe('field1');
  });
});

import { faker } from '@faker-js/faker';
import createMockVts, { createMockForm, createVtsFields, generateMockFields } from '../helpers';

describe('Field handling', () => {
  afterEach(() => {
    document.getElementsByTagName('html')[0].innerHTML = '';
  });

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

    expect(vtsWithIgnoredField.fields).toHaveLength(1);
    expect(vtsWithIgnoredField.fields[0].name).toBe('field1');
  });

  it('should include fields outside and inside the form', () => {
    createVtsFields({
      outsideField: {
        value: faker.word.sample(),
        type: 'text',
        form: 'test-form',
      },
    }).forEach((field) => document.body.appendChild(field));

    const form = createMockForm(
      {
        insideField1: { type: 'text' },
        insideField2: { type: 'email' },
      },
      { id: 'test-form' },
    );
    const vts = createMockVts(form);

    const fieldNames = [...vts.fields].map((field) => field.name);

    expect(fieldNames.length).toBe(3);
    expect(fieldNames).toContain('insideField1');
    expect(fieldNames).toContain('insideField2');
    expect(fieldNames).toContain('outsideField');
  });

  it('should create the specified number of fields', () => {
    const numberOfFields = 50; // Specify the number of fields to create

    const form = createMockForm(generateMockFields(numberOfFields, 20));
    const vts = createMockVts(form);

    expect(vts.fields).toHaveLength(30);
  });
});

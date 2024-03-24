import Vts from '../../src/vts';
import { faker } from '@faker-js/faker';

describe('Vts initialization', () => {
  it('should create a new instance of Vts with a form selector', () => {
    const id = faker.word.sample({ strategy: 'shortest' });
    const form = document.createElement('form');
    form.id = id;
    document.body.appendChild(form);

    const vts = new Vts(id);

    expect(vts).toBeInstanceOf(Vts);
    expect(form.vts).toBe(vts);

    document.body.removeChild(form);
  });

  it('should create Vts instance using HTMLFormElement', () => {
    const vts = new Vts(document.createElement('form'));
    expect(vts.form.vts).toBeInstanceOf(Vts);
  });

  it('should have vts class', () => {
    const vts = new Vts(document.createElement('form'));
    const hasVtsClass = vts.form.classList.contains('vts');
    expect(hasVtsClass).toBe(true);
  });

  it('should not create a new instance if one already exists', () => {
    const form = document.createElement('form');
    const existingVts = new Vts(form);

    const consoleSpy = jest.spyOn(console, 'warn').mockImplementation();
    const newVts = new Vts(form);

    expect(existingVts).toBe(newVts.form.vts);
    expect(consoleSpy).toHaveBeenCalledWith('Vts instance already exists: ', existingVts);

    consoleSpy.mockRestore();
  });

  // it('should create a new instance of Vts with configuration', () => {
  //   const config = {
  //     rules: {
  //       name: {
  //         required: true,
  //       },
  //     },
  //   };

  //   const vts = createMockVts(undefined, config);

  //   expect(vts.rules.get('name')).toEqual({ required: true });
  // });

  // it('should create a Map object for rules after initialization', () => {
  //   expect(vts.rules).toBeInstanceOf(Map);
  // });
});

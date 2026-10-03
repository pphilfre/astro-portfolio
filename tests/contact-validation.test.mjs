import { test } from 'node:test';
import assert from 'node:assert/strict';
import { validateContact } from '../src/lib/contact-validation.ts';
const good = {
  name: 'Freddie',
  email: 'test@example.com',
  message: 'A message about work experience.',
  captchaToken: 'test-token',
};
test('accepts and trims valid contact data', () => {
  assert.deepEqual(
    validateContact({
      ...good,
      name: '  Freddie  ',
      email: ' test@example.com ',
      message: '  ' + good.message + '  ',
    }),
    good,
  );
});
test('rejects non-object JSON and non-string values without throwing', () => {
  for (const value of [
    null,
    [],
    'test',
    0,
    { ...good, name: {} },
    { ...good, email: 42 },
    { ...good, message: [] },
    { ...good, captchaToken: true },
  ])
    assert.equal(validateContact(value), null);
});
test('rejects whitespace, malformed emails and header line breaks', () => {
  for (const value of [
    { ...good, name: ' ' },
    { ...good, email: 'a@b' },
    { ...good, email: 'a\n@b.com' },
    { ...good, name: 'Freddie\r\nBcc: other@example.com' },
    { ...good, captchaToken: ' ' },
  ])
    assert.equal(validateContact(value), null);
});
test('enforces documented size limits and message minimum', () => {
  for (const value of [
    { ...good, name: 'x'.repeat(101) },
    { ...good, email: 'x'.repeat(250) + '@a.com' },
    { ...good, message: 'short' },
    { ...good, message: 'x'.repeat(5001) },
    { ...good, captchaToken: 'x'.repeat(2049) },
  ])
    assert.equal(validateContact(value), null);
  assert.ok(
    validateContact({
      ...good,
      name: 'x'.repeat(100),
      message: 'x'.repeat(5000),
      captchaToken: 'x'.repeat(2048),
    }),
  );
});
test('preserves message text for plain-text delivery', () => {
  const message = '<img src=x onerror=alert(1)> is text, not email HTML.';
  assert.equal(validateContact({ ...good, message }).message, message);
});

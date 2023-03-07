let temp;

describe('sample test', () => {
  beforeEach(() => {
    temp = 1;
  });

  afterEach(() => {
    temp = 0;
  });

  test('temp is 1', () => {
    expect(temp).toBe(1);
  });
});

test('temp is 0', () => {
  expect(temp).toBe(0);
});

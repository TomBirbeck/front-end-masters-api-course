import * as user from '../user';

describe('user handler', () => {
  test('should create a new user', async () => {
    const req = { body: { username: 'Dave', password: 'Hi5"!' } };
    const res = {
      json({ token }) {
        expect(token).toBeTruthy();
      },
    };
    await user.createNewUser(req, res, () => {});
  });
});

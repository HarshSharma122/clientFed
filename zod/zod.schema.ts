import zod from 'zod'


export const signupzod = zod.object({
  username: zod.string().min(4),
  email: zod.email(),
  password: zod.string().min(7),
});
export const signinzod = zod.object({
  email: zod.email(),
  password: zod.string().min(7),
});

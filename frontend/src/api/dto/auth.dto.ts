export class LoginResEntity {
  data: {
    token: string | undefined;
    userId: string | undefined;
  } = {
    token: undefined,
    userId: undefined,
  };
}

export class RegisterResEntity {
  id: string | undefined;

  name: string | undefined;

  email: string | undefined;
}

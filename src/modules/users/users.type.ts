export type User = {
  name: string;
  email: string;
  password: string;
  is_active?: boolean;
  age: number;
};

export type atleastusers = User & Record<string, unknown>;

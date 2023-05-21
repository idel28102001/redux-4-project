import { useForm } from '@/hooks/useForm.ts';
import { signInAction, signUpAction } from '@/store/reducers/auth/extraReducers.ts';
import { FormSignInProps, FormSignUpProps } from '@/store/reducers/auth';

export const useSignUp = () => useForm<typeof signUpAction, FormSignUpProps>(signUpAction);
export const useSignIn = () => useForm<typeof signInAction, FormSignInProps>(signInAction);

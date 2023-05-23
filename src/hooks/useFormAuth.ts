import { useForm } from '@/hooks/useForm.ts';
import { putEditUserAction, signInAction, signUpAction } from '@/store/reducers/auth/extraReducers.ts';
import { FormEditUserProps, FormSignInProps, FormSignUpProps } from '@/store/reducers/auth';

export const useSignUp = () => useForm<typeof signUpAction, FormSignUpProps>(signUpAction);
export const useSignIn = () => useForm<typeof signInAction, FormSignInProps>(signInAction);
export const useEditUser = () => useForm<typeof putEditUserAction, FormEditUserProps>(putEditUserAction);

import { bindActionCreators } from '@reduxjs/toolkit';
import { actionsAuth } from '@/store/reducers/auth';
import { useAppDispatch } from '@/hooks/useStoreHooks.ts';
import { useEffect } from 'react';

export function useClearForm() {
  const { clearForm } = bindActionCreators(actionsAuth, useAppDispatch());
  useEffect(() => {
    return () => {
      clearForm();
    };
  }, []);
}

/* eslint-disable @typescript-eslint/no-restricted-imports */
import { useDispatch } from 'react-redux';

import type { AppDispatch } from 'src/store';

type DispatchFunc = () => AppDispatch;
export const useAppDispatch: DispatchFunc = useDispatch;

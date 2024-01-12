export type GenderType = 'male' | 'female';

export interface PsyUserInfoProps {
  name: string;
  gender: GenderType;
  grade: string;
  email: string;
  startDtm: number | null;
}

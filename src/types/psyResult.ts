export interface ScoreDataProps {
  key: string;
  score: string;
  jobValue: string;
}

export interface JobDataEduProps {
  key: number;
  edu: string;
  jobs: string;
}

export interface JobDataMajorProps {
  key: number;
  major: string;
  jobs: string;
}

export interface PsyResultProps {
  loading: boolean;
  score_data: ScoreDataProps[];
  jobdata_edu: JobDataEduProps[];
  jobdata_major: JobDataMajorProps[];
  no1: string;
  no2: string;
  bestTwo: string[];
  worstTwo: string[];
  error: string;
}

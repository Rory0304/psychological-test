export interface PaginationDataProps {
    count: number;
    offset: number;
}

export interface QuestionDataProps {
    answer01: string;
    answer02: string;
    answer03: string;
    answer04: string;
    answer05: null;
    answer06: null;
    answer07: null;
    answer08: null;
    answer09: null;
    answer10: null;
    answerScore01: string;
    answerScore02: string;
    answerScore03: null;
    answerScore04: null;
    answerScore05: null;
    answerScore06: null;
    answerScore07: null;
    answerScore08: null;
    answerScore09: null;
    answerScore10: null;
    qitemNo: number;
    question: string;
    tip1Desc: null;
    tip1Score: null;
    tip2Desc: null;
    tip2Score: null;
    tip3Desc: null;
    tip3Score: null;
}

export interface PsyQuestionProps {
    loading: boolean;
    qestrnSeq: string;
    trgetSe: string;
    question_data: QuestionDataProps[];
    error: string;
    pagination_data: PaginationDataProps;
}

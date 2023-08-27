export interface PsyAnswerSheetProps {
    qestrnSeq: string;
    trgetSe: string;
    answer_sheet: {
        qitemNo: number;
        answer: string;
    }[];
}

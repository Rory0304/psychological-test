export interface PsyAnswerSheetItemType {
    qitemNo: number;
    answer: string;
}
export interface PsyAnswerSheetType {
    qestrnSeq: string;
    trgetSe: string;
    answer_sheet: PsyAnswerSheetItemType[];
}

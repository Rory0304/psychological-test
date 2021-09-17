import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { handleNextPage, handlePrevPage } from "../../reducers/qaReducer";
import {
    PrevButton,
    NextButton,
    NextButtonLabel
} from "../../components/Button";

function Pagination({ count, questionDataLength }) {
    const dispatch = useDispatch();
    const { offset, limit } = useSelector(
        state => state.qaData.pagination_data
    );
    const status =
        count < questionDataLength && (count === offset || count % 5 !== 0);

    return (
        <div className="flex items-end justify-between text-center">
            <PrevButton
                onClick={() => dispatch(handlePrevPage())}
                status={offset === 0}
            >
                이전
            </PrevButton>
            <div className="inline-block w-6/12 text-center">
                {offset !==
                questionDataLength - (questionDataLength % limit) ? (
                    <>
                        <NextButtonLabel htmlFor="nextButton" status={status}>
                            모든 문항에 응답해야 합니다.
                        </NextButtonLabel>
                        <NextButton
                            id="nextButton"
                            disabled={status}
                            onClick={() => dispatch(handleNextPage())}
                        >
                            다음
                        </NextButton>
                    </>
                ) : (
                    <Link to="/result-view">
                        <NextButton
                            id="nextButton"
                            disabled={count < questionDataLength}
                        >
                            검사 완료
                        </NextButton>
                    </Link>
                )}
            </div>
        </div>
    );
}

export default Pagination;

function ProgressBar({ progress }) {
    return (
        <div className="relative pt-1">
            <div className="flex h-4 mb-4 overflow-hidden text-xs rounded bg-gray-darker">
                <div
                    style={{ width: `${progress}%` }}
                    className="flex flex-col justify-center text-center text-white duration-300 shadow-none ease bg-yellow whitespace-nowrap transition-width"
                ></div>
            </div>
        </div>
    );
}

export default ProgressBar;

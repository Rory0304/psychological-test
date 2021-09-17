function RadioInput({ name, value, label, onChange, checked }) {
    return (
        <label className="cursor-pointer">
            <input
                type="radio"
                name={name}
                value={value}
                label={label}
                aria-label={label}
                className="w-4 h-4 cursor-pointer form-radio"
                required
                onChange={onChange}
                checked={checked}
            />
            <span className="ml-2">{label}</span>
        </label>
    );
}

export default RadioInput;

interface IValidator {
    setIsValid: (isValid: boolean) => void,
    value: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    type?: string,
    name?: string,
    placeholder?: string,
    id?: string,
    className?: string,
    disabled?: boolean,
}

export default IValidator;
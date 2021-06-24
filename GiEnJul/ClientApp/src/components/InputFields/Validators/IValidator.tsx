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
    min?: number,
    max?: number,
}

export default IValidator;
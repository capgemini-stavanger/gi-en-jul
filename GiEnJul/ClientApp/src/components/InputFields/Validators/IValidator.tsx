interface IValidator {
    setIsValid: (isValid: boolean) => void,
    value: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    type?: string,
    name?: string,
    placeholder?: string,
}

export default IValidator;
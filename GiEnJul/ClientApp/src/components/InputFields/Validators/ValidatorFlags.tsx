enum Validator {
    NotNull = 1,
    PhoneNumber = 1 << 1,
    Email = 1 << 2,
}

export default Validator;

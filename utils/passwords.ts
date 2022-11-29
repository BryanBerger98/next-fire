const generatePassword = (passwordLength: number): string => {
    const passwordCharset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#&-_/$*!?=.+^';
    let generatedPassword = '';
    for (let i = 0, n = passwordCharset.length; i < passwordLength; ++i) {
        generatedPassword += passwordCharset.charAt(Math.floor(Math.random() * n));
    }
    return generatedPassword;
};

export { generatePassword };

const translateMessage = (message) =>{
    const messages = {
        'invalid_credentials': 'Usuario y/o clave incorrectos'
    };

    return messages[message] || message;
};

export default translateMessage;
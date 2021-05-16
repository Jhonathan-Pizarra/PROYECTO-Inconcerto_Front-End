const translateMessage = (message) =>{
    const messages = {
        //Login
        'invalid_credentials': 'Usuario y/o clave incorrectos',
        'The given data was invalid.': 'Los datos proporcionados no son correctos.',
        'not_registered': 'No existe una cuenta con el correo proporcionado',
        'already_registered': 'Ya existe una cuenta con el correo proporcionado',
        //Festivales
        'The name has already been taken.': 'Ese nombre ya existe',

    };

    return messages[message] || message;
};

export default translateMessage;
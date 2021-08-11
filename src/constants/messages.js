const translateMessage = (message) =>{

    const messages = {
        //Login
        'invalid_credentials': 'Usuario y/o clave incorrectos',
        'not_registered': 'No existe una cuenta con el correo proporcionado',
        'already_registered': 'Ya existe una cuenta con el correo proporcionado',
        'token_absent': "Inicia sesión para continuar",
        //Modulos
        'The name has already been taken.': 'Ese nombre ya existe',
        'The given data was invalid.': 'Cédula o E-mail ya existen.',
        'undefined': "No hay datos.",
        'The image must be an image.': 'No se ha cargado una imagen.',
        'The image has invalid image dimensions.': 'La imagen no tiene dimensiones permitirdas (min 600x600)',
        //'[object Object]': 'No podrá eliminarse si está vinculado',
        //'[object XMLHttpRequest]': 'La solicitud no se completó,
        'El campo name es obligatorio.': 'El nombre es necesario',
        'The name must be a string.' : 'No escribiste ningún nombre',
        'The description must be a string.' : 'No diste ninguna descripción',

    };

    return messages[message] || message;
};

export default translateMessage;
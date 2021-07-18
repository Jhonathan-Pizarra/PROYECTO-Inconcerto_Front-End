import {useRouter} from "next/router";

const translateMessage = (message) =>{

    const messages = {
        //Login
        'invalid_credentials': 'Usuario y/o clave incorrectos',
        'The given data was invalid.': 'Los datos proporcionados no son válidos.',
        'not_registered': 'No existe una cuenta con el correo proporcionado',
        'already_registered': 'Ya existe una cuenta con el correo proporcionado',
        'token_absent': "Inicia sesión para continuar",
        //Modulos
        'The name has already been taken.': 'Ese nombre ya existe',
        'undefined': "No hay datos.",
        'The image must be an image.': 'La imagen no se ha cargado...',
        'The image has invalid image dimensions.': 'La imagen no tiene dimensiones permitirdas (min 600x600)',
        '[object Object]': 'No podrá eliminarse si está vinculado',

    };

    return messages[message] || message;
};

export default translateMessage;
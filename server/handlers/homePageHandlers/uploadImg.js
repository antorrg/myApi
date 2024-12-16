import { uploadImageToFirebase } from "../../utils/uploadService.js";
import eh from '../../utils/errors/index.js'
import throwError from "../../utils/errors/formatError.js";


export const uploadImg = eh.catchAsync(async (req, res) => {
    const file = req.file;
    console.log(req.file)
    if(!file){throwError('Not found', 404)}
    const imageUrl = await uploadImageToFirebase(file)
    const response = {  success: true,
                        message: 'Imagen subida exitosamente',
                        data: {url: imageUrl}
                      }
    console.log('response: ', response)
    res.status(200).json(response)
  })
import * as ImagePicker from "expo-image-picker";
import CONSTS from "../core/CONSTS";

export const uploadImage = async (formData) => {
    return await new Promise(async (resolve) => {
        try {
            await fetch(`${CONSTS.BACKEND_URL}/UploadPhoto`, {
                method: 'post',
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                body: formData
            })

            resolve("ok")
        } catch (e) {
            console.log(e)
            resolve("not ok")
        }

    });
}


export const pickImage = async () => {
    return await new Promise(async function (resolve) {
        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 0.5,
                base64: true,
            });

            if (!result.cancelled) {
                const formData = new FormData();
                const name = Date.now()
                formData.append("image", result.base64);
                formData.append("name", name);
                resolve({ formData: formData, name: "images/" + name + ".jpg" })
            }

            resolve(null, null)
        } catch (e) {
            console.log(e)
            resolve("not ok")
        }
    })
};


// export const uploadImage = async (formData) => {
//     return await new Promise(async (resolve) => {
//         const result = await fetch(`${CONSTS.BACKEND_URL}/UploadPhoto`, {
//             method: 'post',
//             headers: {
//                 'Content-Type': 'multipart/form-data',
//             },
//             body: formData
//         })

//         console.log(result)
//         resolve(result)
//     });

// }
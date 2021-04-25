import React from "react";
import { useForm } from "react-hook-form";
import { Festival } from "@/lib/festivals";
import { mutate } from "swr";

const FestivalForm = () => {
    const { register, handleSubmit } = useForm();

    // const fileInputRef = useRef();

    const onSubmit = async (data) => {
        console.log("data", data.image[0]);
        const newFestival = {
            name: "New Festival" + Math.random(),
            description: "Description"+ Math.random(),
            // category_id: 1,
            image: data.image[0],
        };

        const formData = new FormData();
        formData.append("name", newFestival.name);
        formData.append("description", newFestival.description);
        // formData.append("category_id", newFestival.category_id);
        formData.append("image", newFestival.image);

        try {
            await Festival.create(formData);
            mutate("/festivals");
            // console.log("file", fileInputRef.current.files[0]);
        } catch (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                // alert(error.response.message);
                console.error(error.response);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.error(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.error("Error", error.message);
            }
            console.error(error.config);
        }
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <label>
                Upload file:
                <input
                    name="image"
                    type="file"
                    // ref={register}
                    {...register('image')}
                />
            </label>
            <br />
            <button type="submit">Submit</button>
        </form>
    );
};

export default FestivalForm;
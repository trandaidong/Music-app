// upload preview image
const uploadImage = document.querySelector("[upload-image]");
if (uploadImage) {
    const uploadPreviewInput = uploadImage.querySelector("[upload-image-input]");
    const uploadImagePreview = uploadImage.querySelector("[upload-image-preview]");
    uploadPreviewInput.addEventListener("change", (e) => { // e.target luôn luôn là cái ô input

        const file = e.target.files[0];
        if (file) {
            uploadImagePreview.src = URL.createObjectURL(file);// tạo đường dẫn ảnh tạm
        }
    })
}
// end upload preview image

// upload preview audio
const uploadAudio = document.querySelector("[upload-audio]");
if (uploadAudio) {
    const uploadPreviewInput = uploadAudio.querySelector("[upload-audio-input]");
    const uploadAudioPreview = uploadAudio.querySelector("[upload-audio-preview]");
    const source =uploadAudioPreview.querySelector("source");

    uploadPreviewInput.addEventListener("change", (e) => { // e.target luôn luôn là cái ô input

        const file = e.target.files[0];
        if (file) {
            source.src = URL.createObjectURL(file);// tạo đường dẫn ảnh tạm
            uploadAudioPreview.load();
        }
    })
}
// end upload preview audio
// $(document).ready(function() {
//   tinymce.init({
//     selector: "textarea.textarea-mce",
//     plugins:"image"
//   });
// });

// cấu hình để có thể lưu ảnh mce lên cloudinary: Bài 57: phút 35

const listTextareaMCE = document.querySelectorAll("[textarea-mce]");
if (listTextareaMCE.length > 0) {
  listTextareaMCE.forEach(textarea => {
    const id = textarea.id;
    $(document).ready(function () {
      tinymce.init({
        selector: `#${id}`,
        plugins: "image code",
        image_title: true,
        images_upload_url: '/admin/uploads', // POST
        automaic_uploads: true,
        file_picker_types: "image"
      })
    })
  })

}
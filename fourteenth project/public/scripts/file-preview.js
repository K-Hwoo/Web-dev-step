const fileElement = document.getElementById("image");
const previewImageElement = document.getElementById("image-preview");

function showPreview() {
  const files = fileElement.files;

  if (!files || files.length === 0) {
    previewImageElement.style.display = "none";
    return;
  }

  const pickedFile = files[0];

  previewImageElement.src = URL.createObjectURL(pickedFile);
  previewImageElement.style.display = "block";
}

fileElement.addEventListener("change", showPreview);

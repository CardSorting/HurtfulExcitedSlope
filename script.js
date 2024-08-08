async function renameFiles() {
    const fileInput = document.getElementById('fileInput');
    const files = fileInput.files;
    const baseName = "Queens Card Anime Girl Cosplay Full Art Holo Custom Card Artist Trading Card";
    const result = document.getElementById('result');
    result.innerHTML = '';

    if (files.length === 0) {
        result.innerHTML = "Please select one or more image files.";
        return;
    }

    const zip = new JSZip();

    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const extension = file.name.split('.').pop();
        const newName = `${baseName} ${i + 1}.${extension}`;

        // Add file to zip
        zip.file(newName, file);

        result.innerHTML += `${file.name} has been renamed to: ${newName}<br>`;
    }

    result.innerHTML += "Creating zip file...<br>";

    // Generate zip file
    const zipBlob = await zip.generateAsync({type: "blob"});

    // Create download link for zip file
    const downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(zipBlob);
    downloadLink.download = "renamed_images.zip";
    downloadLink.textContent = "Download Renamed Images (ZIP)";
    result.appendChild(downloadLink);
}
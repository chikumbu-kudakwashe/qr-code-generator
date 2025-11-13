document.getElementById("form").addEventListener("submit", (e) => {
    e.preventDefault();

    const data = document.getElementById("data").value;
    const image = document.getElementById("image").files[0];
    const width = document.getElementById("width").value;
    const height = document.getElementById("height").value;
    const dots_style = document.getElementById("dots-style").value;
    const dot_color = document.getElementById("dots-color").value;
    const corners_style = document.getElementById("corners-style").value;
    const corner_color = document.getElementById("corner-color").value;
    const corners_dot = document.getElementById("corners-dot").value;
    const corner_dot_color = document.getElementById("corner-dot-color").value;
    const bg_color = document.getElementById("background-color").value;
    const format = document.getElementById("format").value;

    const qrCode = new QRCodeStyling({
        width: width,
        height: height,
        type: "svg",
        data: data,
        image: image ? URL.createObjectURL(image) : null,
        dotsOptions: {
            color: dot_color,
            type: dots_style
        },
        backgroundOptions: {
            color: bg_color
        },
        imageOptions: {
            crossOrigin: "anonymous",
            margin: 10
        },
        cornersSquareOptions: {
            color: corner_color,
            type: corners_style
        },
        cornersDotOptions: {
            color: corner_dot_color,
            type: corners_dot
        }
    });

    // Append QR to the canvas
    const canvas = document.getElementById("canvas");
    canvas.innerHTML = "";
    qrCode.append(canvas);

    // Hide form, show QR section
    document.getElementById("form").style.display = "none";
    document.getElementById("qr-section").style.display = "block";

    // Reset form after success
    document.getElementById("form").reset();

    // DOWNLOAD BUTTON
    document.getElementById("download-btn").onclick = () => {
        qrCode.download({
            name: "qr-code",
            extension: format
        });
    };

    // CLOSE BUTTON — return to form
    document.getElementById("close-btn").onclick = () => {
        document.getElementById("qr-section").style.display = "none";
        document.getElementById("form").style.display = "block";
    };
});

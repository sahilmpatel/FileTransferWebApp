import os
import qrcode
import io
from flask import Flask, render_template, request, flash, redirect, send_file, jsonify
from werkzeug.utils import secure_filename
from tkinter import filedialog

app = Flask(__name__)
app.secret_key = b'_5#y2L"F4Q8z\n\xec]/'


@app.route('/qrcode/<path:url>')
def generate_qrcode(url):
    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_L,
        box_size=5,
        border=4,
    )
    qr.add_data(url)
    qr.make(fit=True)

    img = qr.make_image(fill_color='black', back_color='white')

    # Create an in-memory buffer to store the image
    buffer = io.BytesIO()
    img.save(buffer)

    # Move the buffer's position to the beginning to send it correctly
    buffer.seek(0)

    return send_file(buffer, mimetype='image/png')


@app.route('/')
def index():
    return redirect('/upload')


@app.route('/upload', methods=['GET', 'POST'])
def upload():
    try:
        if request.method == 'POST':
            files = request.files.getlist('files[]')
            files = [file for file in files if file.filename]
            if not files:
                print("\n no files:\n")
                return jsonify({'error': 'No files were uploaded.'}), 400

            folder = filedialog.askdirectory(title="Select a Folder to save Files")
            for file in files:
                print(f"\n file.filename:::{file.filename} \n")
                filename = secure_filename(file.filename)
                file.save(os.path.join(folder, filename))
            return jsonify({'message': 'Files uploaded successfully!'}), 200

        return render_template('index.html')
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/filelist')
def filelist():
    file_paths = filedialog.askopenfilenames(title="Select a Folder to share Files")
    files_list = [(os.path.basename(file_path), file_path) for file_path in file_paths]
    return render_template('file_list.html', files_list=files_list)


@app.route('/filelist/<path:name>')
def download_file(name):
    return send_file(name, as_attachment=True)


if __name__ == '__main__':
    app.run(host="0.0.0.0", port=8000, debug=True)

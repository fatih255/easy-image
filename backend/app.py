from flask import Flask,request,jsonify,flash,redirect,url_for
import os
from werkzeug.utils import secure_filename
from functions import removeBg,combineImages

UPLOAD_FOLDER = 'static'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def upload_file(file):
    if 'file' not in request.files:
            flash('No file part')
            return redirect(request.url)
    if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
            

@app.route("/combine-images")
def combine():
    if request.method == 'POST':
        print(request.files)
        result=combineImages(images=['person-1.jpg','person-2.jpg'],backgroundImage='bg.jpg',backgroundImagePadding=500,mode="sketch")
        return jsonify (result)
    if request.method == 'POST':
        return "<p>Hello, World!</p>"
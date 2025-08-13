from flask import Flask
from flask_cors import CORS
from routes.faculty_routes import faculty_bp
from routes.student_routes import student_bp

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})  # For testing, allow all

app.register_blueprint(faculty_bp, url_prefix="/faculty")
app.register_blueprint(student_bp, url_prefix="/student")

@app.route("/")
def home():
    return "Hello World!"
    
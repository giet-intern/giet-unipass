from flask import Flask
from flask_cors import CORS
from routes.faculty_routes import faculty_bp
from routes.student_routes import student_bp
import os

app = Flask(__name__)
CORS(app)

app.register_blueprint(faculty_bp, url_prefix="/faculty")
app.register_blueprint(student_bp, url_prefix="/student")

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8080))
    debug = os.environ.get("FLASK_DEBUG", "False").lower() == "true"
    app.run(host="0.0.0.0", port=port, debug=debug)

from flask import Blueprint, jsonify, send_file, request, after_this_request
from bson import json_util
import json
from services.student_service import get_student, process_receipt_pdf
from services.hallticket_service import generate_hallticket_pdf
import os

student_bp = Blueprint("student", __name__)


@student_bp.route("/searchStudent/<pin>", methods=["GET"])
def search_student(pin):
    student = get_student(pin)
    if not student:
        return jsonify({"error": "Student not found"}), 404
    return json.loads(json_util.dumps(student))


@student_bp.route("/generateHallticket/<pin>", methods=["GET"])
def generate_hallticket(pin):
    student = get_student(pin)
    if student["due"] == 0:
        pdf_buffer = generate_hallticket_pdf(pin)
    else:
        return jsonify({"error": "Fee due or student not found"}), 400
    return send_file(
        pdf_buffer,
        as_attachment=True,
        download_name=f"hallticket_{pin}.pdf",
        mimetype="application/pdf",
    )


@student_bp.route("/uploadReceipt/<pin>", methods=["POST"])
def upload_receipt(pin):
    if "file" not in request.files:
        return jsonify({"success": False, "message": "No file part in the request"}), 400

    file = request.files["file"]

    if file.filename == "":
        return jsonify({"success": False, "message": "No selected file"}), 400

    if not file.filename.lower().endswith(".pdf"):
        return jsonify({"success": False, "message": "Only PDF files allowed"}), 400

    try:
        result = process_receipt_pdf(file, pin)
    except Exception as e:
        print(f"Exception during receipt processing: {e}")
        return jsonify({"success": False, "message": "Internal server error"}), 500

    if result["success"]:
        return jsonify(result), 200
    else:
        return jsonify(result), 400

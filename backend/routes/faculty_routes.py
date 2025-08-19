from flask import Blueprint, request, jsonify, send_file
from services.hallticket_service import generate_hallticket_pdf
from utils.mongo_utils import find_student_by_pin
# from services.faculty_service import process_fee_excel

faculty_bp = Blueprint("faculty", __name__)

# @faculty_bp.route("/uploadSheet", methods=["POST"])
# def upload_sheet():
#     file = request.files["file"]
#     path = f"./{file.filename}"
#     file.save(path)
#     result = process_fee_excel(path)
#     print("Updated count:", result["updated"])

#     return jsonify({
#         "message": "Data updated",
#         "updated_count": result["updated"],
#         "not_found_pins": result["not_found"]
#     })

@faculty_bp.route("/generateHallticket/<pin>", methods=["GET"])
def generate_hallticket(pin):
    student = find_student_by_pin(pin)
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
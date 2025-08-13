from flask import Blueprint, request, jsonify
from services.faculty_service import process_fee_excel

faculty_bp = Blueprint("faculty", __name__)

@faculty_bp.route("/uploadSheet", methods=["POST"])
def upload_sheet():
    file = request.files["file"]
    path = f"./{file.filename}"
    file.save(path)
    result = process_fee_excel(path)
    print("Updated count:", result["updated"])

    return jsonify({
        "message": "Data updated",
        "updated_count": result["updated"],
        "not_found_pins": result["not_found"]
    })


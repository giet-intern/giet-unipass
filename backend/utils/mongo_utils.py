from config.database import students_collection

def find_student_by_pin(pin):
    return students_collection.find_one({"pin": pin})

def update_student_fee(pin, due):
    students_collection.update_one({"pin": pin}, {"$set": {"due": due}})

def update_student_receipt(pin, receipt_url):
    students_collection.update_one({"pin": pin}, {"$set": {"receipt_url": receipt_url}})

def update_student_hallticket(pin, pdf_path=None, hallticket_id=None):
    update_data = {}
    if pdf_path:
        update_data["hallticket_path"] = pdf_path
    if hallticket_id:
        update_data["hallticket_id"] = hallticket_id
    if update_data:
        students_collection.update_one({"pin": pin}, {"$set": update_data})

def update_student_due(pin, due):
    result = students_collection.update_one({"pin": pin}, {"$set": {"due": due}})
    return result.modified_count

def update_student_receipts(user_pin, receipt_no):
    # Append receipt_no to student's "receipts" list
    students_collection.update_one(
        {"pin": user_pin},
        {"$push": {"receipts": receipt_no}}
    )

import fitz
from datetime import datetime
from io import BytesIO
from utils.mongo_utils import (
    find_student_by_pin,
    update_student_due,
    update_student_receipt,
    update_student_fee,
    update_student_receipts
)

DATE_FORMAT = "%d-%b-%Y"
MIN_DATE = datetime.strptime("10-Aug-2025", DATE_FORMAT)


def get_student(pin):
    return find_student_by_pin(pin)


def verify_and_update_fee(pin, fee):
    update_student_fee(pin, fee)


def add_receipt(pin, url):
    update_student_receipt(pin, url)


def process_receipt_pdf(file_storage, user_pin):
    # Read file bytes from uploaded FileStorage object
    pdf_bytes = file_storage.read()

    # Open PDF from bytes (in-memory)
    doc = fitz.open(stream=pdf_bytes, filetype="pdf")
    text = "\n".join(page.get_text() for page in doc)
    doc.close()

    print("Extracted text from PDF:")
    print(text)

    lines = text.splitlines()
    roll_no = None
    amount_paid = None
    payment_date = None
    receipt_no = None

    for i, line in enumerate(lines):
        line_lower = line.lower()

        # Extract Receipt Number
        if "receipt number" in line_lower:
            parts = line.split(":", 1)
            if len(parts) > 1 and parts[1].strip():
                receipt_no = parts[1].strip()

        # Extract Roll No
        if "roll no" in line_lower:
            parts = line.split(":", 1)
            if len(parts) > 1 and parts[1].strip():
                roll_no = parts[1].strip()
            elif i + 1 < len(lines):
                roll_no = lines[i + 1].strip()

        # Extract Amount Paid or Amount
        if "amount paid" in line_lower or ("amount" in line_lower and "paid" not in line_lower):
            try:
                amount_str = line.split(":", 1)[-1].replace(",", "").strip()
                amount_paid = float(amount_str)
            except Exception:
                pass

        # Extract Date
        if "date" in line_lower:
            parts = line.split(":", 1)
            if len(parts) > 1 and parts[1].strip():
                date_str = parts[1].strip()
                try:
                    payment_date = datetime.strptime(date_str, DATE_FORMAT)
                except Exception as e:
                    print(f"Date parsing error: {e}")

    print(f"Parsed receipt_no: '{receipt_no}'")
    print(f"Parsed roll_no: '{roll_no}'")
    print(f"Parsed amount_paid: {amount_paid}")
    print(f"Parsed payment_date: {payment_date}")

    # Validate extracted data
    if not receipt_no or not roll_no or amount_paid is None or payment_date is None:
        return {
            "success": False,
            "message": "Could not read Receipt No, Roll No, Amount Paid or Date from receipt"
        }

    # Check date condition
    if payment_date < MIN_DATE:
        return {
            "success": False,
            "message": "Date is older than current updated date"
        }

    student = find_student_by_pin(user_pin)
    if not student:
        return {
            "success": False,
            "message": "Student not found"
        }

    # Check for duplicate receipt number
    receipts = student.get("receipts", [])
    if receipt_no in receipts:
        return {
            "success": False,
            "message": f"Receipt {receipt_no} already processed"
        }

    due = student.get("due", 0)
    if amount_paid < 7500 and due >= 7500:
        update_student_due(user_pin, due - amount_paid)
        update_student_receipts(user_pin, receipt_no)  # add receipt to list
        return {
            "success": False,
            "message": "Due updated, search again for updated due"
        }
    if due < 7500 and amount_paid < due:
        update_student_due(user_pin, due - amount_paid)
        update_student_receipts(user_pin, receipt_no)  # add receipt to list
        return {
            "success": False,
            "message": "Due updated, search again for updated due"
        }
        
    # Check PIN match
    if roll_no.strip().lower() != user_pin.strip().lower():
        return {
            "success": False,
            "message": "PIN in receipt does not match your PIN"
        }

    # Clear dues and add receipt number
    update_student_due(user_pin, 0)
    update_student_receipts(user_pin, receipt_no)

    return {
        "success": True,
        "message": f"Fee verified and due cleared with receipt {receipt_no}"
    }

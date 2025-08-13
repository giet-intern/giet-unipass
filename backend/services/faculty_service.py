import pandas as pd
from utils.mongo_utils import find_student_by_pin, update_student_due

def process_fee_excel(file_path):
    updated_count = 0
    not_found = []
    dues_map = {}

    xl = pd.ExcelFile(file_path)

    sheet2_name = xl.sheet_names[1]
    df2 = pd.read_excel(file_path, sheet_name=sheet2_name, header=2)
    df2.columns = df2.columns.str.strip().str.lower()

    for _, row in df2.iterrows():
        pin = str(row.get("roll no", "")).strip().upper()
        if not pin or pin.lower() == "nan":
            continue
        try:
            due1 = float(row.get("iii yr i sem due", 0) or 0)
            due2 = float(row.get("upto ii yr due", 0) or 0)
            total_due = due1 + due2
        except ValueError:
            total_due = 0
        dues_map[pin] = dues_map.get(pin, 0) + total_due

    sheet3_name = xl.sheet_names[2]
    df3 = pd.read_excel(file_path, sheet_name=sheet3_name, header=2)
    df3.columns = df3.columns.str.strip().str.lower()

    for _, row in df3.iterrows():
        pin = str(row.get("roll no", "")).strip().upper()
        if not pin or pin.lower() == "nan":
            continue
        try:
            due1 = float(row.get("iv yr i sem due", 0) or 0)
            due2 = float(row.get("upto iii yr due", 0) or 0)
            total_due = due1 + due2
        except ValueError:
            total_due = 0
        dues_map[pin] = dues_map.get(pin, 0) + total_due

    for pin, total_due in dues_map.items():
        student = find_student_by_pin(pin)
        if student:
            update_student_due(pin, total_due)
            updated_count += 1
        else:
            not_found.append(pin)

    return {"updated": updated_count, "not_found": not_found}

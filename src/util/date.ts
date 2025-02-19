import { DateTime } from "luxon"
import { ValidationError } from "#/error";

export function validateCheck(year: number, month?: number, day?: number): void {

    if (month == null) {
        if (DateTime.fromObject({ year }).isValid === false) throw new ValidationError
    }

    if (day == null) {
        if (DateTime.fromObject({ year, month }).isValid === false) throw new ValidationError
    }

    if (DateTime.fromObject({ year, month, day }).isValid === false) throw new ValidationError
}

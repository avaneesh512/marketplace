export class Validations {
	constructor() { }

	checkEmpty(value) {
		if (value === '' || !value) {
			return true;
		} else if (value && value.trim() === '') {
			return true;
		}
		return false;
	}

	checkEmail(value) {
		//var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        var reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		if (reg.test(value)) {
			return false;
		}
		return true;
    }
    
    checkPhone(value) {
		let emptycheck = this.checkEmpty(value);

		if (emptycheck) {
			return true;
		}

		if (value.length) {
			var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

			if (phoneno.test(value)) {
				return false;
			} else {
				return true;
			}
		}
		return false;
    }
    checkPassword(value) {
        let emptycheck = this.checkEmpty(value);
        if(emptycheck) {
            return true;
        }
        if(value.length) {
            let password = value.trim();
            if(password.length > 5) {
                return false
            }else {
                return true
            }
        }
	}
	checkFileEmpty(file) {				  
		if(file.type == "image/jpeg" || file.type == "image/png" || file.type == "image/gif" || file.type == "image/webp") {
			return false;
		}
		return true;
	}

	checkDropDownEmpty(value) {
		debugger;
		if (value === '' || !value) {
			return true;
		} else if (value && value.trim() === '') {
			return true;
		} else if (value.includes('select')) {
			return true;
		}
		return false;
	}

    checkError(errordetails) {
		if (errordetails === '') return false;
		return Object.keys(errordetails).every((key) => !errordetails[key]) ? true : false;
	}

}

import re 

regex_email = '^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$'
regex_password = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!#%*?&]{8,20}$"

def validate_email(email):
    pat = re.compile(regex_email)
    mat = re.search(pat, email)
    if mat:
        return True
    else:
        return False

def validate_password(password):
    pat = re.compile(regex_password)
    mat = re.search(pat, password)
    if mat:
        return True
    else:
        return False
def validate_login(email, password):  
    if (validate_email(email) and validate_password(password)):
        return True
    return False

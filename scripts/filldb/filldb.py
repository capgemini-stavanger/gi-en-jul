import random
import time
import os
import sys
import uuid
import string
import datetime

from numpy import full

TIME_UNIX = int(time.time())
TIME_TIMESTAMP = datetime.datetime.utcfromtimestamp(
    TIME_UNIX).strftime('%Y-%m-%dT%H:%M:%S.000Z')

TABLE_HEADER_PERSON = ["Age", "Months", "Gender", "Wishes", "NoWish"]
TABLE_HEADER_GIVER = [
    "MaxReceivers", "Location", "EventName", "FullName", "Email", "PhoneNumber", "RegistrationDate",
    "IsSuggestedMatch", "HasConfirmedMatch"]

# UNUSED TABLE HEADERS, CREATED UPON INSERTION
'''
"MatchedRecipient", "MatchedFamilyId",
"IsSuggestedMatch", "HasConfirmedMatch", "SuggestedMatchAt", "RemindedAt",
"CancelFeedback", "CancelDate", "CancelFamilyId",
"Comment"
'''

TABLE_HEADER_RECIPIENT = [
    "Dessert", "Dinner", "Note", "EventName", "Location", "PersonCount", "FamilyId",
    "ContactFullName", "ContactEmail", "ContactPhoneNumber",
    "Institution", "ReferenceId",
    "IsSuggestedMatch","HasConfirmedMatch",]

# UNUSED TABLE HEADERS, CREATED UPON INSERTION
'''
"Institution", "ReferenceId",
"MatchedGiver", 
"IsSuggestedMatch","HasConfirmedMatch",
"Comment"
'''

PHONE_NUMBER_RANGES = ((40_00_00_00, 49_99_99_99), (90_00_00_00, 99_99_99_99))
EMAIL_DOMAIN = ("gmail", "outlook", "live", "lyse", "hotmail")
EMAIL_ENDING = ("com", "no")

DINNERS = ("Pinnekjott", "Ribbe")
DESSERTS = ("Riskrem", "Sjokoladepudding")

FAMILY_SIZE_GIVER_OPTIONS = (2, 5, 100)

GENDER_TYPES = (1, 2, 9)
GENDER_TYPES_WEIGHTS = (48, 48, 4)

INSTITUTIONS = ("NAV", "barnevarnet", "kommunen")
LOCATION_EVENTS = [("Nittedal", "Jul21"),
                   ("Sandnes", "Jul21"),
                   ("Stavanger", "Jul21"),
                   ]

CHANCE_TWO_NAMES = 0.1
CHANCE_AGE_WISH = 0.3
CHANCE_MALE = 0.5
CHANCE_OTHER_FOOD = 0.1
CHANCE_PHONE_NUMBER_COUNTRY_CODE = 0.2
CHANCE_NOTE = 0.2
CHANCE_REFID = 0.2

ENTRIES_COUNT_GIVER = 120
ENTRIES_COUNT_RECIPIENT = 100

MAX_AGE = 130

FOLDER_PATH = f"{os.path.abspath(os.getcwd())}"

FOLDER_PATH_DATA = f"{FOLDER_PATH}/data"
FILE_PATH_NAMES_MALE = f"{FOLDER_PATH_DATA}/names_male.txt"
FILE_PATH_NAMES_FEMALE = f"{FOLDER_PATH_DATA}/names_female.txt"
FILE_PATH_LASTNAMES = f"{FOLDER_PATH_DATA}/lastnames.txt"
FILE_PATH_WISHES = f"{FOLDER_PATH_DATA}/wishes.txt"
FILE_PATH_WORDS = f"{FOLDER_PATH_DATA}/words.txt"

FOLDER_PATH_OUTER_DB = f"{FOLDER_PATH}/db_tables"
FOLDER_PATH_DB = f"{FOLDER_PATH_OUTER_DB}/{TIME_UNIX}"
FILE_PATH_PERSON = f"{FOLDER_PATH_DB}/person.csv"
FILE_PATH_RECIPIENT = f"{FOLDER_PATH_DB}/recipient.csv"
FILE_PATH_GIVER = f"{FOLDER_PATH_DB}/giver.csv"


# ----- HANDLE ARGUMENTS ----- #

def handle_arg_locevents(arg: str):
    global LOCATION_EVENTS
    LOCATION_EVENTS = []
    for eventloc in arg.split(" "):
        eventloc_list = eventloc.split("=")
        if len(eventloc_list) != 2:
            raise SyntaxError(f"Invalid locevent argument: {eventloc}")
        LOCATION_EVENTS.append(tuple(eventloc_list))


def handle_arg_rcount(arg: str):
    global ENTRIES_COUNT_RECIPIENT
    try:
        ENTRIES_COUNT_RECIPIENT = int(arg)
    except ValueError:
        raise SyntaxError(f"Invalid rcount argument: {arg}")


def handle_arg_gcount(arg: str):
    global ENTRIES_COUNT_GIVER
    try:
        ENTRIES_COUNT_GIVER = int(arg)
    except ValueError:
        raise SyntaxError(f"Invalid gcount argument: {arg}")


def handle_args():
    valid_args = (("locevents", handle_arg_locevents),
                  ("rcount", handle_arg_rcount), ("gcount", handle_arg_gcount))
    for arg in sys.argv:
        for valarg, valarg_func in valid_args:
            valarg = f"-{valarg}?"
            if arg.startswith(valarg):
                valarg_func(arg[len(valarg):])


# ----- COMMON FUNCTIONS ----- #

def get_random_lines_list_from_file(filepath: str, k: int = 1, min_word_len=0):
    lines = set()
    with open(filepath, "r") as f:
        for line in f:
            word = line.strip()
            if len(word) < min_word_len:
                continue
            lines.add(word)
    return random.choices(tuple(lines), k=k)


def get_sentence(max_words: int, min_word_len=0):
    size = (random.randint(1, max_words) *
            random.randint(1, max_words)) // max_words
    return " ".join(get_random_lines_list_from_file(FILE_PATH_WORDS, size, min_word_len))


def get_age():
    return random.randint(0, MAX_AGE)


def get_family_size_recipient():
    size = abs(((random.randint(1, 8) * random.randint(1, 8)) // 5))
    return size if size else 1


def get_family_size_giver():
    return random.choice(FAMILY_SIZE_GIVER_OPTIONS)


def get_phone_number():
    pn_range = random.choice(PHONE_NUMBER_RANGES)
    return f"{'+47' * (random.random() < CHANCE_PHONE_NUMBER_COUNTRY_CODE)}{random.randint(pn_range[0], pn_range[1])}"


def get_email(name: str):
    return f"{name.split()[0]}{random.randint(1, 999)}@{random.choice(EMAIL_DOMAIN)}.{random.choice(EMAIL_ENDING)}"


def get_name(gender: int):
    firstname_count = (random.random() < CHANCE_TWO_NAMES) + 1
    lastname_count = (random.random() < CHANCE_TWO_NAMES) + 1
    is_male_name = gender == 1 or (
        gender != 2 and random.random() < CHANCE_MALE)
    firstname_file = FILE_PATH_NAMES_MALE if is_male_name else FILE_PATH_NAMES_FEMALE
    firstname = " ".join(get_random_lines_list_from_file(
        firstname_file, firstname_count))
    lastname = " ".join(get_random_lines_list_from_file(
        FILE_PATH_LASTNAMES, lastname_count))
    return f"{firstname} {lastname}"


def get_gender():
    return random.choices(GENDER_TYPES, weights=GENDER_TYPES_WEIGHTS)[0]


def get_food(food_list):
    return get_sentence(1, min_word_len=4) if random.random() < CHANCE_OTHER_FOOD else random.choice(food_list)


def get_dinner():
    return get_food(DINNERS)


def get_dessert():
    return get_food(DESSERTS)


def get_uuid():
    return str(uuid.uuid4())


def get_event_location_str(event_name, location):
    return f"{event_name}_{location}"


def get_institution():
    return random.choice(INSTITUTIONS)


def get_refid():
    if random.random() > CHANCE_REFID:
        return ""
    refid = ""
    for i in range(3):
        refid += random.choice(string.ascii_letters)
    for i in range(2):
        refid += str(random.randint(0, 9))
    return refid


def get_note():
    return "Halal" if random.random() < CHANCE_NOTE else ""


def get_wish():
    return "" if random.random() < CHANCE_AGE_WISH else get_random_lines_list_from_file(FILE_PATH_WISHES)[0]


# ----- CREATE TABLES ----- #

def create_table(filename: str, header: str):
    full_header = ["PartitionKey", "RowKey", "Timestamp"]
    for col in header:
        full_header.append(col)
        full_header.append(f"{col}@type")
    with open(filename, "w", encoding="utf8") as f:
        f.write(f'{",".join(full_header)}\n')


def create_table_person():
    create_table(FILE_PATH_PERSON, TABLE_HEADER_PERSON)


def create_table_recipient():
    create_table(FILE_PATH_RECIPIENT, TABLE_HEADER_RECIPIENT)


def create_table_giver():
    create_table(FILE_PATH_GIVER, TABLE_HEADER_GIVER)


def add_table_row(filepath, partition_key: str, row_key: str, row: list):
    final = [partition_key, row_key, TIME_TIMESTAMP]
    for entity in row:
        if entity == "" or entity is None:
            final.extend(("", ""))
        elif isinstance(entity, bool):
            final.extend((str(entity).lower(), "Edm.Boolean"))
        elif isinstance(entity, int):
            final.extend((entity, "Edm.Int32"))
        elif isinstance(entity, str):
            entity.replace('"', "")
            final.extend((entity, "Edm.String"))
        else:
            raise NotImplementedError(
                f"Type of {entity} ({type(entity)}) is not implemented yet.")

    def to_csv_entry(x): return '"' + str(x) + '"'
    with open(filepath, "a") as f:
        f.write(f'{",".join(map(to_csv_entry, final))}\n')


def add_table_entry_person(recipient_id: str):
    partition_key = recipient_id
    row_key = get_uuid()
    age = get_age()
    months = 1
    gender = get_gender()
    wishes = "['Alderstilpasset gaveonske']"
    noWish = True
    add_table_row(FILE_PATH_PERSON, partition_key, row_key,
                  [age, months, gender, wishes, noWish])


family_id_int = 0


def add_table_entry_recipient_and_persons(location: str, event_name: str):
    global family_id_int
    family_id_int += 1

    event_name = event_name.capitalize()
    location = location.capitalize()
    family_id = str(family_id_int)
    partition_key = get_event_location_str(event_name, location)
    row_key = get_uuid()
    contact_full_name = get_name(get_gender())
    contact_email = get_email(contact_full_name)
    contact_phone_number = get_phone_number()
    dessert = get_dessert()
    dinner = get_dinner()
    institution = get_institution()
    note = get_note()
    personCount = get_family_size_recipient()
    reference_id = get_refid()
    has_confirmed_match = False
    is_suggested_match = False
    add_table_row(FILE_PATH_RECIPIENT, partition_key, row_key,
        [dessert, dinner, note, event_name, location, personCount, family_id,
        contact_full_name, contact_email, contact_phone_number, institution, reference_id, is_suggested_match, has_confirmed_match])

    for p in range(personCount):
        add_table_entry_person(row_key)


def add_table_entry_giver(location: str, event_name: str):
    event_name = event_name.capitalize()
    location = location.capitalize()
    partition_key = get_event_location_str(event_name, location)
    row_key = get_uuid()
    max_reciviers = get_family_size_giver()
    full_name = get_name(get_gender())
    phone_number = get_phone_number()
    email = get_email(full_name)
    is_suggested_match = False
    has_confirmed_match = False
    registation_date = TIME_TIMESTAMP
    add_table_row(FILE_PATH_GIVER, partition_key, row_key,
        [max_reciviers, location, event_name, full_name, email, phone_number, registation_date, is_suggested_match, has_confirmed_match])

# ----- PROJECT STRUCTURE ----- #

def create_folders():
    if not os.path.exists(FOLDER_PATH_OUTER_DB):
        os.mkdir(FOLDER_PATH_OUTER_DB)
    if not os.path.exists(FOLDER_PATH_OUTER_DB):
        os.mkdir(FOLDER_PATH_OUTER_DB)
    os.mkdir(FOLDER_PATH_DB)


# ----- ENTRY ----- #

def create_db():
    create_folders()

    create_table_recipient()
    create_table_person()
    create_table_giver()

    for location, event_name in LOCATION_EVENTS:
        for i in range(ENTRIES_COUNT_RECIPIENT):
            add_table_entry_recipient_and_persons(location, event_name)
        for i in range(ENTRIES_COUNT_GIVER):
            add_table_entry_giver(location, event_name)


if __name__ == "__main__":
    handle_args()
    create_db()

import datetime

def get_current_time():
    return datetime.datetime.utcnow()

def calculate_time_difference(start_time):
    end_time = get_current_time()
    return (end_time - start_time).total_seconds()

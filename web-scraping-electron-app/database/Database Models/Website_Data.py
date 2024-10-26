import enum
import os

from sqlalchemy import *

"""
@author Natel Whitaker
Python program to create and initialize database with tables, followed by filling the tables with contents to represent future usage with scraped data.
"""


class StatusEnum(enum.Enum):
    """
    enum for the status of the websites added to website data
    """
    online = 1
    offline = 2
    error = 3

if __name__ == '__main__':
    databaseCreated = os.path.isfile('NLPDatabase.db')
    if databaseCreated:
        print('Database found.')
    else:
        print('Database not found, creating and initializing database now.')

    # connecting to the database
    engine = create_engine('sqlite:///NLPDatabase.db', echo=True)
    meta = MetaData()

    # creating the proper tables in the database
    Website_Data = Table(
        'Website_Data', meta,
        Column('website_id', Integer, primary_key=True),
        Column('url', VARCHAR(100)),
        Column('name', VARCHAR(100)),
        Column('status', Enum(StatusEnum)),
    )

    meta.create_all(engine)
    conn = engine.connect()


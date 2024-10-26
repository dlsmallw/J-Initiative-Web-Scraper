import os
from sys import maxsize

from sqlalchemy import *

"""
@author Natel Whitaker
Python program to create and initialize database with tables, followed by filling the tables with contents to represent future usage with scraped data.
"""


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
    Scraped_Data = Table(
        'Scraped_Data', meta,
        Column('data_id', Integer, primary_key=True),
        Column('page_id', Integer, ForeignKey('Web_Pages.page_id')),
        Column('data', VARCHAR(maxsize)),
    )

    meta.create_all(engine)
    conn = engine.connect()

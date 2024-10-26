import os
from datetime import datetime
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
    Web_Pages = Table(
        'Web_Pages', meta,
        Column('page_id', Integer, primary_key=True),
        Column('website_id', Integer, ForeignKey('Website_Data.website_id')),
        Column('title', VARCHAR(100)),
        Column('content', VARCHAR(maxsize)),
        Column('url', VARCHAR(100)),
        Column('last_scraped', DATETIME),
    )

    meta.create_all(engine)
    conn = engine.connect()

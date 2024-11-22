import enum
import os
from datetime import datetime
from sys import maxsize

from sqlalchemy import *

"""
@author Natel Whitaker, Jackson Woodside
Python program to create and initialize database with tables, followed by filling the tables with contents to represent future usage with scraped data.
"""


class StatusEnum(enum.Enum):
    """
    enum for the status of the websites added to website data
    """
    online = 1
    offline = 2
    error = 3

def query_database_table(tableName):
    """
    returns a select query to whichever table is specified
    args:
    tableName - the name of the table to query, can only be one of the three tables defined below
    """
    if tableName != "website_data" and tableName != "web_pages" and tableName != "scraped_data":
        return

    result = select(tableName)
    return result

def insert_website_data(site_url, site_name, site_status):
    """
    returns an executable sql statement to insert entries into the website data table
    args:
    site_url - link to the site
    site_name - name of the site
    site_status - site status (online, offline, error)
    """
    return Website_Data.insert().values(url=site_url, name=site_name, status=site_status)


def insert_web_pages(page_website_id, page_title, page_content, page_url, page_last_scraped):
    """
       returns an executable sql statement to insert entries into the web pages table
       args:
       page_website_id - foreign key that links the web page to the site it's from
       page_title - page title
       page_content - content of page
       page_url - the url of the page
       page_last_scraped - date and time when the page was last web scraped
       """
    return Web_Pages.insert().values(website_id=page_website_id, title=page_title, content=page_content, url=page_url,
                                     last_scraped=page_last_scraped)


def insert_scraped_data(scraped_page_id, scraped_data):
    """
       returns an executable sql statement to insert entries into the scraped data table
       args:
       scraped_page_id - foreign key that links the data to the page it's from
       scraped_data - scraped data from the page
       """
    return Scraped_Data.insert().values(page_id=scraped_page_id, data=scraped_data)


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

    Web_Pages = Table(
        'Web_Pages', meta,
        Column('page_id', Integer, primary_key=True),
        Column('website_id', Integer, ForeignKey('Website_Data.website_id')),
        Column('title', VARCHAR(100)),
        Column('content', VARCHAR(maxsize)),
        Column('url', VARCHAR(100)),
        Column('last_scraped', DATETIME),
    )

    Scraped_Data = Table(
        'Scraped_Data', meta,
        Column('data_id', Integer, primary_key=True),
        Column('page_id', Integer, ForeignKey('Web_Pages.page_id')),
        Column('data', VARCHAR(maxsize)),
    )

    meta.create_all(engine)
    conn = engine.connect()

    # example usage of adding entries to the database
    conn.execute(insert_website_data('example url', 'Example website', StatusEnum.online))
    conn.execute(insert_web_pages(1, 'example title', 'example content', 'example url', datetime.now()))
    conn.execute(insert_scraped_data(1, 'example data'))

    #example querying of database tables
    conn.execute(query_database_table('website_data'))
    conn.execute(query_database_table('web_pages'))
    conn.execute(query_database_table('scraped_data'))

    conn.commit()

from bs4 import BeautifulSoup

with open('webscrape.html', 'r') as html_file:
    content = html_file.read()
    #print(content)

    soup = BeautifulSoup(content, 'lxml')
    #print(soup.prettify())

    tags = soup.find_all('h1') #/findall
    #print(tags)

    #for tag in tags:
        #print(tag.text)

with open('google.html', 'r') as html_file2:
    content = html_file2.read()

    soup2 = BeautifulSoup(content, 'lxml')

    tags2 = soup2.find_all('div', class_='FPdoLc lJ9FBc')

    for tag in tags2:
        tag_text = tag.text
        print(tag_text.split()[0:3])

        print(f'{tag_text} is the text version, {tag} is the html version')

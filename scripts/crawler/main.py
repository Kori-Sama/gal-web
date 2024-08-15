import requests
from bs4 import BeautifulSoup
import http.cookiejar as cookielib
import os
from work import Work


BASE_URL = r'https://bangumi.tv'
BASE_GAL_URL = r'https://bangumi.tv/game/tag/galgame'


session = requests.session()
session.cookies = cookielib.LWPCookieJar(filename="cookies.txt")

headers = requests.utils.default_headers()

headers.update(
    {'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36', }
)


def is_login() -> bool:
    LOGIN_URL = r'https://bangumi.tv/login'

    data = session.get(LOGIN_URL, headers=headers,
                       allow_redirects=False)
    data.encoding = 'utf-8'
    if data.status_code == 200:
        print("have not login")
        return False

    # can be 302 redirect means have login
    if data.status_code == 302:
        print("have login")
        return True


def job():
    try:
        f = open('data.csv', 'x', encoding='utf-8')
    except Exception:
        os.remove('data.csv')
        f = open('data.csv', 'x', encoding='utf-8')

    is_page_end = False

    current_url = BASE_GAL_URL
    while not is_page_end:
        print(f'-- current url: {current_url} --')

        data = session.get(current_url, headers=headers)
        data.encoding = 'utf-8'
        # print("data", data.text)
        soup = BeautifulSoup(data.text, 'html.parser')
        items = soup.find_all('ul', attrs={
            'id': 'browserItemList'
        })[0]

        for item in items.find_all('li', attrs={'class': 'item'}):
            # get title
            title_tag = item.find_all('a', attrs={
                'class': 'l'
            })[0]

            title = title_tag.text
            # get link url
            link_url = BASE_URL+title_tag['href']

            # get image url
            cover_tag = item.find_all('img', attrs={
                'class': 'cover'
            })

            if len(cover_tag) == 0:
                cover_url = None
            else:
                cover_url = 'https:'+cover_tag[0]['src']
                if cover_url.endswith('no_icon_subject.png'):
                    cover_url = None

            work = Work(title, cover_url, link_url)
            print(work)
            f.write(work.to_csv()+'\n')

        # check if have next page
        current_url = None
        for btn in soup.find_all('a', attrs={
            'class': 'p'
        }):
            if btn.text == '››':
                current_url = BASE_GAL_URL+btn['href']
                break

        if current_url is None:
            is_page_end = True

        print(f'-- one page end --')
        pass

    f.close()


if __name__ == "__main__":
    session.cookies.load()
    if not is_login():
        print("please login first")
        exit(1)

    job()

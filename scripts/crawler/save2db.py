import psycopg2
from tqdm import tqdm
from work import Work


def insert_work(work: Work):
    cursor.execute("INSERT INTO works (title, cover_image, link_url) VALUES (%s, %s, %s)",
                   (work.title, work.cover_image, work.link_url))
    conn.commit()


def read_csv():
    # need data.csv file 
    with open('data.csv', 'r', encoding='utf-8') as f:
        rows = f.readlines()
        for row in tqdm(rows, desc="Inserting records"):
            idx = row.find('http')
            title = row[:idx-1]
            idx2 = row[idx:].find(',')
            cover_image = row[idx:idx+idx2]
            link_url = row[idx+idx2+1:]

            work = Work(title, cover_image, link_url)
            insert_work(work)


if __name__ == '__main__':
    # Connect to the database.Modify the connection parameters according to your environment
    conn = psycopg2.connect(database="postgres", host="127.0.0.1",
                            user="postgres",
                            password="zaqxsw",
                            port="5432")

    cursor = conn.cursor()
    read_csv()
    conn.close()

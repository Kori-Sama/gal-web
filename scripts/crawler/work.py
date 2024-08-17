
class Work():
    def __init__(self, title: str, cover_image: str | None, link_url: str):
        self.title = title
        self.cover_image = cover_image
        self.link_url = link_url

    def __str__(self) -> str:
        return f'{self.title},{self.cover_image},{self.link_url}'

    def to_csv(self) -> str:
        return f'"{self.title}","{self.cover_image}","{self.link_url}"'

import { Bad, Ok } from "@/lib/response";

export async function GET(req: Request) {
  const qq = new URL(req.url).searchParams.get("qq");
  if (!qq) return Bad("QQ number is required");

  const data = await fetch(`https://api.qjqq.cn/api/qqinfo?qq=${qq}`).then(
    (res) => res.json()
  );

  if (data.code !== 200) return Bad("QQ number not found");

  return Ok({
    username: data.name,
    avatarUrl: data.imgurl,
  });
}

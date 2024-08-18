import { Bad, Ok } from "@/lib/response";
import { fetchQqInfo } from "@/lib/services";

/**
 * @summary 前端直接请求有跨域问题, 所以放在后端请求, 作为一个API中转
 */
export async function GET(req: Request) {
  const qq = new URL(req.url).searchParams.get("qq");
  if (!qq) return Bad("QQ number is required");

  const data = await fetchQqInfo(qq);
  if (!data) return Bad("QQ number not found");

  return Ok(data);
}

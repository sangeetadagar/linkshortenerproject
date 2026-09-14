import { getLinkByShortCode } from '@/data/links';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ shortcode: string }> },
) {
  const { shortcode } = await params;

  if (!/^[a-zA-Z0-9-]{3,32}$/.test(shortcode)) {
    return new Response('Short link not found.', { status: 404 });
  }

  const link = await getLinkByShortCode(shortcode);

  if (!link) {
    return new Response('Short link not found.', { status: 404 });
  }

  return Response.redirect(link.url, 307);
}

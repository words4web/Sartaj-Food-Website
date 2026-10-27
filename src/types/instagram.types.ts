export interface InstagramMediaItem {
  id: string;
  type: "post" | "reel";
  permalink: string;
  embedUrl: string;
  shortcode: string;
}

export interface InstagramStats {
  handle: string;
  profileUrl: string;
  avatarUrl: string;
  name: string;
}

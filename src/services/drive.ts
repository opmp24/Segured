const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY || ''
const GALLERY_FOLDER_ID = '1YglcilvObqlV2G7lJwWJLlMFuRYLrXGH'
const DOCUMENTS_FOLDER_ID = '1nPjNv26V6m1qYe4p3zKWHd7RCNdD02Mc'
const MAPS_FOLDER_ID = '1I0vMnMlOsV09PZBVblkYRcqsACjHEX0I'
const YOUTUBE_CHANNEL_ID = 'UCVwlW3kCGE0DTtX95_I7GtA'
const LATEST_VIDEO_ID = 'AVsAEZqGNd4'
const EMAIL_FILE_ID = '1r6z58VtGHailNVO58rTRo4mukVVgh3_3OpELWG53SIE'
const PHONE_FILE_ID = '1OLMMqvLatldw_bwnM2goj8o9fajUOhl8_sQorTWbOjQ'

function isDev() {
  return window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
}

function apiUrl(path: string) {
  const base = isDev() ? '/google-proxy' : 'https://www.googleapis.com'
  return `${base}${path}&key=${API_KEY}`
}

export interface DriveFile {
  id: string
  name: string
  mimeType: string
  thumbnailLink?: string
}

export interface YouTubeVideo {
  videoId: string
  title: string
  thumb: string
}

export async function listFolderFiles(folderId: string): Promise<DriveFile[]> {
  const q = encodeURIComponent(`'${folderId}' in parents and trashed = false`)
  const url = apiUrl(
    `/drive/v3/files?q=${q}&orderBy=createdTime desc&pageSize=100&fields=files(id,name,mimeType,thumbnailLink)&supportsAllDrives=true&includeItemsFromAllDrives=true`,
  )
  const resp = await fetch(url)
  const json = await resp.json()
  if (!resp.ok) {
    throw new Error(json.error?.message || `Error ${resp.status}`)
  }
  return json.files || []
}

export async function fetchYouTubeVideos(): Promise<YouTubeVideo[]> {
  const url = apiUrl(
    `/youtube/v3/search?part=snippet&channelId=${YOUTUBE_CHANNEL_ID}&maxResults=12&order=date&type=video`,
  )
  const resp = await fetch(url)
  const data = await resp.json()
  if (!resp.ok) {
    throw new Error(data.error?.message || `Error ${resp.status}`)
  }
  if (!data.items || data.items.length === 0) return []
  return data.items.map(
    (item: {
      id: { videoId: string }
      snippet: {
        title: string
        thumbnails: { medium?: { url: string }; default?: { url: string } }
      }
    }) => ({
      videoId: item.id.videoId,
      title: item.snippet.title,
      thumb: item.snippet.thumbnails.medium?.url || item.snippet.thumbnails.default?.url,
    }),
  )
}

export function thumbnailUrl(link: string | undefined, size = 800): string {
  if (!link) return ''
  return link.replace(/=s\d+/, `=s${size}`)
}

export function driveFileUrl(id: string) {
  return `https://drive.google.com/uc?export=view&id=${id}`
}

export function getGalleryFolderId() {
  return GALLERY_FOLDER_ID
}

export function getDocumentsFolderId() {
  return DOCUMENTS_FOLDER_ID
}

export function getLatestVideoId() {
  return LATEST_VIDEO_ID as string | undefined
}

export async function fetchEmail(): Promise<string | null> {
  return fetchDriveFileText(EMAIL_FILE_ID)
}

export async function fetchPhone(): Promise<string | null> {
  return fetchDriveFileText(PHONE_FILE_ID)
}

export async function fetchSucursalesTxt(): Promise<string | null> {
  const q = encodeURIComponent(
    `name = 'sucursales.txt' and '${MAPS_FOLDER_ID}' in parents and mimeType = 'text/plain' and trashed = false`,
  )
  const searchUrl = apiUrl(`/drive/v3/files?q=${q}&fields=files(id)`)
  const searchResp = await fetch(searchUrl)
  const searchData = await searchResp.json()
  if (!searchResp.ok || !searchData.files || searchData.files.length === 0) return null

  const fileId = searchData.files[0].id
  const contentUrl = apiUrl(`/drive/v3/files/${fileId}?alt=media`)
  const contentResp = await fetch(contentUrl)
  if (!contentResp.ok) return null
  const text = await contentResp.text()
  return text.trim() || null
}

export async function fetchDriveFileText(fileId: string): Promise<string | null> {
  try {
    const url = apiUrl(`/drive/v3/files/${fileId}/export?mimeType=text/plain`)
    const resp = await fetch(url)
    if (resp.ok) return (await resp.text()).trim()
  } catch {
    /* ignore */
  }
  try {
    const url = apiUrl(`/drive/v3/files/${fileId}?alt=media`)
    const resp = await fetch(url)
    if (resp.ok) return (await resp.text()).trim()
  } catch {
    /* ignore */
  }
  return null
}

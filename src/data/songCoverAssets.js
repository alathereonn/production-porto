const songCoverModules = import.meta.glob('../images/songs/*', {
  eager: true,
  import: 'default',
  query: '?url',
})

const songCoverAssets = Object.fromEntries(
  Object.entries(songCoverModules).map(([path, url]) => {
    const fileName = path.split('/').pop().toLowerCase()
    return [fileName, url]
  }),
)

export const resolveSongCoverAsset = (path) => {
  const fileName = path.replaceAll('\\', '/').split('/').pop().toLowerCase()
  return songCoverAssets[fileName] ?? path
}

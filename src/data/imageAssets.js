const imageModules = import.meta.glob('../images/*', {
  eager: true,
  import: 'default',
  query: '?url',
})

const imageAssets = Object.fromEntries(
  Object.entries(imageModules).map(([path, url]) => {
    const fileName = path.split('/').pop().toLowerCase()
    return [fileName, url]
  }),
)

export const resolveImageAsset = (path) => {
  const fileName = path.replaceAll('\\', '/').split('/').pop().toLowerCase()
  return imageAssets[fileName] ?? path
}

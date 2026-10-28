// spell-checker: disable-next-line
export const FILE_NAME = 'shukujitsu.csv' as const

/**
 * Nitro plugin for downloading a CSV of public holidays
 */
export default defineNitroPlugin(async () => {
  const storage = useStorage('assets:server')
  const catalogUrl = 'https://data.e-gov.go.jp/data/api/action/package_show?id=cao_20190522_0002'

  try {
    const exists = await storage.hasItem(FILE_NAME)

    if (exists) {
      console.log('--- [Holidays Init] Holidays CSV already exists. Use local data. ---')
      return
    }

    const catalog = await fetchCatalog(catalogUrl)
    const csvUrl = catalog.find((r) => r.state === 'active' && r.format === 'CSV')?.url

    if (!csvUrl) {
      throw new Error('CSV resource not found in catalog')
    }

    const buffer = await downloadCsv(csvUrl)

    await storage.setItemRaw(FILE_NAME, buffer)
    console.log('--- [Holidays Init] Holidays CSV successfully saved! ---')
  } catch (error) {
    console.error('--- [Holidays Init] An error occurred while initializing holiday data: ---', error)
  }

  async function fetchCatalog(url: string): Promise<{ state: string; format: string; url: string }[]> {
    console.log(`--- [Holidays Init] Get catalog information: ${url} ---`)
    const response = await fetch(url)

    if (!response.ok) {
      throw new Error(`Catalog get failed (Status: ${response.status})`)
    }

    const catalog = await response.json()
    return catalog.result.resources
  }

  async function downloadCsv(csvUrl: string): Promise<Buffer<ArrayBuffer>> {
    console.log(`--- [Holidays Init] Download holidays CSV: ${csvUrl} ---`)
    const response = await fetch(csvUrl)

    if (!response.ok) {
      throw new Error(`Download failed (Status: ${response.status})`)
    }

    const arrayBuffer = await response.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    return buffer
  }
})

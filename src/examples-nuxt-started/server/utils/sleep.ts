/**
 * sleep server function.
 *
 * @param miliseconds
 */
export async function sleep(miliseconds: number): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, miliseconds))
}
